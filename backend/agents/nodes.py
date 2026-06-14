"""
Agent node implementations ? all powered by Groq LLM (Llama 3.1) with RAG context.
"""
import os
import math
import logging
from langchain_core.messages import AIMessage
from langchain_groq import ChatGroq
from pydantic import BaseModel, Field
from .state import MaintenanceState
from rag.knowledge_base import retrieve_context

logger = logging.getLogger("AgentNodes")

# Best Groq model for structured output tasks
GROQ_MODEL = "llama-3.3-70b-versatile"


def _get_llm(temperature: float = 0.1):
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY not set")
    return ChatGroq(model=GROQ_MODEL, groq_api_key=api_key, temperature=temperature)


def _append_trace(state: MaintenanceState, entry: dict):
    traces = list(state.get("agent_traces", []))
    traces.append(entry)
    return traces


class SupervisorDecision(BaseModel):
    next_agent: str = Field(description="Must be one of: Diagnostic, KnowledgeRetrieval")
    reasoning: str = Field(description="Brief reason for routing decision")


class DiagnosisOutput(BaseModel):
    diagnosis: str = Field(description="Clear diagnosis of the equipment condition")
    severity: str = Field(description="One of: Normal, Warning, Critical, Emergency")
    anomalies_detected: list[str] = Field(description="List of detected anomalies in sensor readings")
    confidence: float = Field(description="Confidence score 0.0-1.0")


class RootCauseOutput(BaseModel):
    root_cause: str = Field(description="Most probable root cause of the identified fault")
    contributing_factors: list[str] = Field(description="Other contributing factors")
    evidence: str = Field(description="Evidence from sensor data and documentation")


class PredictiveOutput(BaseModel):
    predicted_rul_days: float = Field(description="Estimated remaining useful life in days")
    failure_probability: float = Field(description="Probability of failure within 7 days, 0.0-1.0")
    degradation_rate: str = Field(description="stable, gradual, accelerating, or rapid")
    rul_reasoning: str = Field(description="Explanation of how RUL was estimated")


class RiskOutput(BaseModel):
    level: str = Field(description="Low, Medium, High, or Critical")
    financial_impact_estimate: str = Field(description="Estimated financial impact if failure occurs")
    safety_risk: str = Field(description="Safety risk assessment")
    urgency_hours: int = Field(description="Hours within which maintenance action must be taken")
    bottleneck_priority: str = Field(description="Yes, No, or Partial")


class MaintenancePlanOutput(BaseModel):
    immediate_actions: list[str] = Field(description="Actions within next 4 hours")
    short_term_actions: list[str] = Field(description="Actions within next 1-7 days")
    long_term_recommendations: list[str] = Field(description="Actions for next maintenance window")
    spare_parts_needed: list[str] = Field(description="Spare parts required with quantities")
    procurement_advisory: str = Field(description="Procurement advice based on lead times")
    estimated_repair_duration: str = Field(description="Estimated repair time")


def _detect_anomalies(sensor_data: dict) -> dict:
    param_specs = {
        "temperature":   {"mean": 65.0, "std": 8.0,  "warn": 80.0,  "critical": 90.0,  "unit": "C",    "low_bad": False},
        "vibration":     {"mean": 2.0,  "std": 0.8,  "warn": 4.5,   "critical": 7.0,   "unit": "mm/s", "low_bad": False},
        "pressure":      {"mean": 105.0,"std": 5.0,  "warn": 90.0,  "critical": 85.0,  "unit": "bar",  "low_bad": True},
        "motor_current": {"mean": 97.0, "std": 5.0,  "warn": 110.0, "critical": 115.0, "unit": "%FLA", "low_bad": False},
        "oil_temp":      {"mean": 52.0, "std": 8.0,  "warn": 65.0,  "critical": 75.0,  "unit": "C",    "low_bad": False},
    }
    anomalies = {}
    for param, value in sensor_data.items():
        if param not in param_specs or not isinstance(value, (int, float)):
            continue
        spec = param_specs[param]
        z_score = abs(value - spec["mean"]) / spec["std"]
        low_bad = spec.get("low_bad", False)
        is_warn = (value < spec["warn"]) if low_bad else (value > spec["warn"])
        is_crit = (value < spec["critical"]) if low_bad else (value > spec["critical"])
        if is_crit: status = "CRITICAL"
        elif is_warn: status = "WARNING"
        elif z_score > 2.0: status = "ELEVATED"
        else: continue
        anomalies[param] = {
            "value": value, "unit": spec["unit"], "status": status,
            "z_score": round(z_score, 2),
            "normal_range": f"{spec['mean'] - spec['std']:.1f}-{spec['mean'] + spec['std']:.1f} {spec['unit']}"
        }
    return anomalies


def _estimate_rul_statistical(sensor_data: dict, anomalies: dict) -> dict:
    temp = sensor_data.get("temperature", 65.0)
    vibration = sensor_data.get("vibration", 2.0)
    temp_factor = math.pow(2, max(0, (temp - 65.0) / 10.0))
    vib_factor = max(1.0, (vibration / 2.0) ** 1.5)
    rul_days = round(max(0.5, min(90.0 / (temp_factor * vib_factor), 180.0)), 1)
    n_crit = sum(1 for a in anomalies.values() if a["status"] == "CRITICAL")
    n_warn = sum(1 for a in anomalies.values() if a["status"] == "WARNING")
    if rul_days < 3: prob = 0.95
    elif rul_days < 7: prob = 0.80
    elif rul_days < 15: prob = 0.55
    elif rul_days < 30: prob = 0.25
    else: prob = max(0.03, 0.25 * (30 / rul_days))
    prob = round(min(0.99, prob + 0.15 * n_crit + 0.07 * n_warn), 3)
    if rul_days < 5: rate = "rapid"
    elif rul_days < 15: rate = "accelerating"
    elif rul_days < 45: rate = "gradual"
    else: rate = "stable"
    return {"rul_days": rul_days, "failure_probability": prob, "degradation_rate": rate,
            "temp_factor": round(temp_factor, 2), "vib_factor": round(vib_factor, 2)}


def supervisor_agent(state: MaintenanceState):
    traces = _append_trace(state, {"agent": "Supervisor", "action": "Analyzing request and routing"})
    user_message = state.get("messages", [])[-1].content if state.get("messages") else ""
    try:
        llm = _get_llm()
        prompt = f"""You are the Supervisor Agent for SteelMind AI ? a steel plant maintenance platform.
User Request: {user_message}
Sensor Data: {state.get('sensor_data', {})}
Equipment: {state.get('equipment_id', 'unknown')}
Route to 'Diagnostic' for sensor/failure/anomaly/RUL/prediction/breakdown queries.
Route to 'KnowledgeRetrieval' for procedure/SOP/manual/how-to/general information queries."""
        decision = llm.with_structured_output(SupervisorDecision).invoke(prompt)
        next_agent = decision.next_agent if decision.next_agent in ["Diagnostic", "KnowledgeRetrieval"] else "Diagnostic"
        traces.append({"agent": "Supervisor", "action": f"Routing to {next_agent}: {decision.reasoning}"})
        return {"next_agent": next_agent, "agent_traces": traces}
    except Exception as e:
        logger.error(f"Supervisor error: {e}")
        traces.append({"agent": "Supervisor", "action": "Defaulting to Diagnostic"})
        return {"next_agent": "Diagnostic", "agent_traces": traces}


def diagnostic_agent(state: MaintenanceState):
    sensor_data = state.get("sensor_data", {})
    equipment_id = state.get("equipment_id", "unknown")
    user_message = state.get("messages", [])[-1].content if state.get("messages") else ""
    anomalies = _detect_anomalies(sensor_data)
    anomaly_summary = "\n".join(
        f"  - {k}: {v['value']} {v['unit']} [{v['status']}] (Z={v['z_score']}, normal: {v['normal_range']})"
        for k, v in anomalies.items()
    ) or "  No anomalies detected."
    context = retrieve_context(f"diagnosis failure symptoms {' '.join(anomalies.keys())} steel plant equipment")
    traces = _append_trace(state, {"agent": "Diagnostic", "action": "Statistical anomaly detection + LLM diagnosis",
        "anomalies": list(anomalies.keys()), "readings": sensor_data})
    try:
        llm = _get_llm(0.05)
        prompt = f"""You are the Diagnostic Agent for a steel plant maintenance AI system.
Equipment: {equipment_id} | Engineer Query: {user_message}
Sensor Readings: {sensor_data}
Statistical Anomaly Analysis:
{anomaly_summary}
Relevant Documentation and Historical Records:
{context}
Provide a specific diagnosis, severity (Normal/Warning/Critical/Emergency), list of anomalies, and confidence score 0.0-1.0."""
        result = llm.with_structured_output(DiagnosisOutput).invoke(prompt)
        traces.append({"agent": "Diagnostic", "action": f"{result.severity}: {result.diagnosis[:80]}", "confidence": result.confidence})
        return {"diagnosis": result.diagnosis, "severity": result.severity, "anomalies": anomalies, "agent_traces": traces}
    except Exception as e:
        logger.error(f"Diagnostic error: {e}")
        if anomalies:
            crit = [k for k, v in anomalies.items() if v["status"] == "CRITICAL"]
            diag = f"CRITICAL anomalies in {', '.join(crit)}." if crit else f"WARNING in {', '.join(anomalies.keys())}."
            sev = "Critical" if crit else "Warning"
        else:
            diag, sev = "Equipment operating within normal parameters.", "Normal"
        return {"diagnosis": diag, "severity": sev, "anomalies": anomalies, "agent_traces": traces}


def root_cause_agent(state: MaintenanceState):
    context = retrieve_context(f"root cause {state.get('diagnosis','')} {state.get('equipment_id','')} failure modes historical")
    traces = _append_trace(state, {"agent": "RootCause", "action": "Root cause analysis via knowledge base + LLM"})
    try:
        llm = _get_llm(0.05)
        prompt = f"""You are the Root Cause Analysis Agent for a steel plant.
Equipment: {state.get('equipment_id','')}
Diagnosis: {state.get('diagnosis','')}
Sensor Data: {state.get('sensor_data',{})}
Anomalies: {state.get('anomalies',{})}
Knowledge Base (failure records, manuals, SOPs):
{context}
Identify the single most probable root cause, up to 3 contributing factors, and cite specific evidence from data and documentation."""
        result = llm.with_structured_output(RootCauseOutput).invoke(prompt)
        traces.append({"agent": "RootCause", "action": f"Root cause: {result.root_cause[:80]}", "factors": result.contributing_factors})
        return {"root_cause": result.root_cause, "contributing_factors": result.contributing_factors,
                "root_cause_evidence": result.evidence, "agent_traces": traces}
    except Exception as e:
        logger.error(f"RootCause error: {e}")
        a = state.get("anomalies", {})
        rc = "Lubrication/cooling failure" if "temperature" in str(a) else "Mechanical wear/misalignment" if "vibration" in str(a) else "Manual inspection required."
        return {"root_cause": rc, "contributing_factors": [], "agent_traces": traces}


def knowledge_retrieval_agent(state: MaintenanceState):
    query = " ".join(filter(None, [
        state.get("messages", [{}])[-1].content if state.get("messages") else "",
        state.get("diagnosis", ""), state.get("root_cause", ""),
        state.get("equipment_id", ""), "SOP procedure maintenance"
    ]))
    context = retrieve_context(query)
    traces = _append_trace(state, {"agent": "KnowledgeRetrieval", "action": "Retrieved SOPs, manuals, historical records"})
    return {"retrieved_context": context, "agent_traces": traces}


def predictive_maintenance_agent(state: MaintenanceState):
    sensor_data = state.get("sensor_data", {})
    anomalies = state.get("anomalies", {})
    stats = _estimate_rul_statistical(sensor_data, anomalies)
    context = state.get("retrieved_context", "")
    traces = _append_trace(state, {"agent": "PredictiveMaintenance",
        "action": "Arrhenius degradation model + Groq LLM refinement",
        "stat_rul": stats["rul_days"], "temp_factor": stats["temp_factor"], "vib_factor": stats["vib_factor"]})
    try:
        llm = _get_llm(0.1)
        prompt = f"""You are the Predictive Maintenance Agent for a steel plant.
Equipment: {state.get('equipment_id','')} | Diagnosis: {state.get('diagnosis','')}
Sensor Data: {sensor_data} | Anomalies: {anomalies}
Statistical Model (Arrhenius + vibration degradation):
- Estimated RUL: {stats['rul_days']} days
- Failure Probability (7-day): {stats['failure_probability']}
- Degradation Rate: {stats['degradation_rate']}
- Temperature Factor: {stats['temp_factor']}x | Vibration Factor: {stats['vib_factor']}x
Historical Context:
{context[:1500] if context else 'Not available'}
Refine the RUL using historical failure patterns from documentation. Provide your final estimate with reasoning."""
        result = llm.with_structured_output(PredictiveOutput).invoke(prompt)
        traces.append({"agent": "PredictiveMaintenance",
            "action": f"RUL={result.predicted_rul_days}d Prob={result.failure_probability:.1%} Rate={result.degradation_rate}"})
        return {"predicted_rul_days": result.predicted_rul_days, "failure_probability": result.failure_probability,
                "degradation_rate": result.degradation_rate, "rul_reasoning": result.rul_reasoning, "agent_traces": traces}
    except Exception as e:
        logger.error(f"Predictive error: {e}")
        return {"predicted_rul_days": stats["rul_days"], "failure_probability": stats["failure_probability"],
                "degradation_rate": stats["degradation_rate"], "rul_reasoning": "Arrhenius model", "agent_traces": traces}


def risk_assessment_agent(state: MaintenanceState):
    context = state.get("retrieved_context", "")
    traces = _append_trace(state, {"agent": "RiskAssessment", "action": "Multi-factor risk classification"})
    try:
        llm = _get_llm(0.05)
        prompt = f"""You are the Risk Assessment Agent for a steel plant.
Equipment: {state.get('equipment_id','')} | Diagnosis: {state.get('diagnosis','')}
RUL: {state.get('predicted_rul_days','?')}d | Failure Prob: {state.get('failure_probability',0):.1%}
Degradation Rate: {state.get('degradation_rate','?')}
Spare Parts and Criticality Context:
{context[:1200] if context else 'Standard criticality matrix.'}
Assess: risk level (Low/Medium/High/Critical), financial impact in Rs crore, safety risk, urgency in hours, bottleneck (Yes/No/Partial)."""
        result = llm.with_structured_output(RiskOutput).invoke(prompt)
        risk = {"level": result.level, "financial_impact": result.financial_impact_estimate,
                "safety_risk": result.safety_risk, "urgency_hours": result.urgency_hours, "bottleneck": result.bottleneck_priority}
        traces.append({"agent": "RiskAssessment",
            "action": f"Risk={result.level} Urgency={result.urgency_hours}h Bottleneck={result.bottleneck_priority}"})
        return {"risk_assessment": risk, "agent_traces": traces}
    except Exception as e:
        logger.error(f"Risk error: {e}")
        p, r = state.get("failure_probability", 0), state.get("predicted_rul_days", 90)
        if p > 0.8 or r < 5: level, urgency = "Critical", 4
        elif p > 0.55 or r < 15: level, urgency = "High", 24
        elif p > 0.3 or r < 30: level, urgency = "Medium", 72
        else: level, urgency = "Low", 168
        return {"risk_assessment": {"level": level, "financial_impact": "Rs 1-5 crore estimated",
            "safety_risk": "Moderate" if level in ["High","Critical"] else "Low",
            "urgency_hours": urgency, "bottleneck": "Unknown"}, "agent_traces": traces}


def maintenance_planning_agent(state: MaintenanceState):
    context = state.get("retrieved_context", "")
    risk = state.get("risk_assessment", {})
    traces = _append_trace(state, {"agent": "MaintenancePlanning", "action": "Generating prioritized maintenance plan"})
    try:
        llm = _get_llm(0.2)
        prompt = f"""You are the Maintenance Planning Agent for a steel plant.
Equipment: {state.get('equipment_id','')} | Diagnosis: {state.get('diagnosis','')}
Root Cause: {state.get('root_cause','')} | Contributing Factors: {state.get('contributing_factors',[])}
Risk: {risk.get('level','?')} | Urgency: {risk.get('urgency_hours','?')}h | RUL: {state.get('predicted_rul_days','?')}d
SOPs, Manuals and Spare Parts Information:
{context[:2000] if context else 'Use standard steel plant maintenance practices.'}
Generate: immediate actions (4h), short-term (1-7 days), long-term, spare parts with quantities and part numbers, procurement advisory, repair duration."""
        result = llm.with_structured_output(MaintenancePlanOutput).invoke(prompt)
        actions = ([{"priority": "Immediate", "action": a} for a in result.immediate_actions] +
                   [{"priority": "Short-term", "action": a} for a in result.short_term_actions] +
                   [{"priority": "Long-term", "action": a} for a in result.long_term_recommendations])
        traces.append({"agent": "MaintenancePlanning",
            "action": f"{len(result.immediate_actions)} immediate, {len(result.short_term_actions)} short-term actions",
            "spares": result.spare_parts_needed})
        return {"recommended_actions": actions, "spare_parts_needed": result.spare_parts_needed,
                "procurement_advisory": result.procurement_advisory,
                "estimated_repair_duration": result.estimated_repair_duration,
                "work_order_generated": True, "agent_traces": traces}
    except Exception as e:
        logger.error(f"Planning error: {e}")
        return {"recommended_actions": [
                    {"priority": "Immediate", "action": "Perform visual inspection and record all readings"},
                    {"priority": "Short-term", "action": "Schedule detailed inspection within 24 hours"}],
                "spare_parts_needed": ["Refer to equipment manual"], "procurement_advisory": "Review inventory.",
                "estimated_repair_duration": "TBD", "work_order_generated": True, "agent_traces": traces}


def human_approval_node(state: MaintenanceState):
    traces = _append_trace(state, {"agent": "HumanApproval",
        "action": "Plan submitted for engineer approval", "status": "Pending in Approvals dashboard"})
    return {"agent_traces": traces}


def executive_intelligence_agent(state: MaintenanceState):
    risk = state.get("risk_assessment", {})
    actions = state.get("recommended_actions", [])
    spares = state.get("spare_parts_needed", [])
    imm = [a["action"] for a in actions if a.get("priority") == "Immediate"]
    sht = [a["action"] for a in actions if a.get("priority") == "Short-term"]
    lines = [
        f"## SteelMind Report - {state.get('equipment_id','?')}",
        f"Risk: {risk.get('level','?')} | Urgency: {risk.get('urgency_hours','?')}h | RUL: {state.get('predicted_rul_days','?')}d | Failure Prob: {state.get('failure_probability',0):.1%}",
        f"\n### Diagnosis\n{state.get('diagnosis','N/A')}",
        f"\n### Root Cause\n{state.get('root_cause','N/A')}",
        f"\n### Immediate Actions",
    ] + [f"- {a}" for a in (imm or ["Continue monitoring"])] + [
        f"\n### Short-Term Plan",
    ] + [f"- {a}" for a in (sht or ["Schedule inspection"])] + [
        f"\n### Spare Parts\n" + "\n".join(f"- {s}" for s in (spares or ["TBD"])),
        f"\n### Procurement\n{state.get('procurement_advisory','N/A')}",
        f"\nFinancial Impact: {risk.get('financial_impact','N/A')} | Safety: {risk.get('safety_risk','N/A')} | Bottleneck: {risk.get('bottleneck','N/A')}"
    ]
    report = "\n".join(lines)
    traces = _append_trace(state, {"agent": "ExecutiveIntelligence", "action": "Maintenance report generated"})
    return {"messages": [AIMessage(content=report)], "maintenance_report": report, "agent_traces": traces}

