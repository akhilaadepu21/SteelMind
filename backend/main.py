from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File, HTTPException, Response
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio, json, math, random, time, logging, os
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv

load_dotenv()

# ── Gemini — semantic intent classification ───────────────────────────────────
try:
    from google import genai as _genai
    from google.genai import types as _genai_types
    _GENAI_AVAILABLE = True
except ImportError:
    _genai = None
    _genai_types = None
    _GENAI_AVAILABLE = False

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

# Few-shot prompt: 14 intents × 20 examples each
_CLASSIFICATION_PROMPT = """
You are an intent classifier for SteelGuardian AI, an industrial predictive maintenance assistant.

Classify the user question into EXACTLY ONE of these 14 intents, then choose the most specific sub_intent.

INTENT DEFINITIONS:
asset_status       — Current health, condition, status, risk level, failure probability, or sensor readings of ONE specific equipment
sensor_analysis    — Which sensor is most abnormal, specific sensor readings, deviations, sensor values, parameter comparisons
degradation_analysis — Which component or subsystem is degrading fastest, wear rate, what part is closest to failure
root_cause         — Why a fault is happening, what caused it, underlying failure mechanism, reason for alert
failure_driver     — Which specific parameter or factor is driving the risk, what contributes most to failure probability
rul                — How long before failure, remaining useful life, days remaining, time to failure, lifespan
maintenance        — What maintenance actions to take, repair steps, SOP, LOTO, safety precautions, tools, procedures
spare_parts        — What parts or components are needed, procurement, ordering priority, bill of materials
financial_impact   — Cost of failure, loss exposure, ROI, downtime cost per hour, financial risk, savings
fleet_analysis     — Questions spanning MULTIPLE assets, plant-wide overview, fleet prioritization, enterprise risk
asset_comparison   — Directly comparing TWO or more NAMED assets (e.g. Pump-12 vs Pump-08)
evidence_analysis  — Sensor data, evidence, proof, supporting data behind the AI prediction
executive_decision — Executive/management brief, strategic summary, TL;DR, C-suite overview
operational_decision — Immediate operational action: should I shut down, escalate, run/stop, page team, right now

EXAMPLES (20 per intent):

asset_status:
1. What is the current condition of Pump-12?
2. How healthy is Conveyor-B right now?
3. What is the overall health score of Rolling-Mill?
4. What is the status of Pump-08?
5. Is Conveyor-A in good condition?
6. Show me the current health of Pump-23
7. What is the equipment condition for Rolling-Mill?
8. How is Pump-12 performing right now?
9. What is the failure probability for Pump-08?
10. What is the risk level of Conveyor-B?
11. Show me the live sensor readings for Pump-12
12. What are the current sensor values for Pump-23?
13. What is the health index of Rolling-Mill?
14. Is Pump-12 operating normally?
15. What is the current state of Conveyor-A?
16. How critical is Pump-08 right now?
17. What is the health percentage of Pump-23?
18. Show me all sensor readings for Conveyor-B
19. What is the operating condition of Rolling-Mill?
20. Is there anything wrong with Pump-12?

sensor_analysis:
1. Which sensor has the highest deviation on Pump-12?
2. What is the vibration reading on Pump-08?
3. Which parameter is most abnormal on Conveyor-B?
4. Show me the worst sensor on Rolling-Mill
5. What is the bearing temperature on Pump-23?
6. Which measurement is most concerning on Pump-12?
7. What sensor is triggering the alert on Conveyor-A?
8. Show me all sensor deviations for Pump-08
9. Which reading exceeds the normal limit on Rolling-Mill?
10. What is the pressure reading on Pump-12?
11. Which parameter is out of range on Pump-23?
12. What is the torque reading on Conveyor-B?
13. Which sensor is critical on Pump-08?
14. What is the RPM deviation on Rolling-Mill?
15. Show me the motor current reading for Conveyor-A
16. Which metric is most elevated on Pump-12?
17. What sensor value is causing concern on Pump-23?
18. Show every sensor reading for Rolling-Mill
19. What parameter has the largest deviation on Pump-08?
20. Which sensor reading is at risk on Conveyor-B?

degradation_analysis:
1. Which component is degrading fastest on Pump-12?
2. What part is closest to failure on Pump-08?
3. Which subsystem is showing the most wear on Conveyor-B?
4. What is degrading most quickly on Rolling-Mill?
5. Which assembly is weakest on Pump-23?
6. What component is most at risk on Conveyor-A?
7. How fast is the bearing assembly degrading on Pump-12?
8. Which mechanical part has the highest wear rate on Pump-08?
9. What is the degradation rate for Conveyor-B?
10. Which element is deteriorating fastest on Rolling-Mill?
11. What part will fail first on Pump-23?
12. How quickly is the motor assembly wearing on Conveyor-A?
13. Which component needs replacement soonest on Pump-12?
14. What subsystem is deteriorating on Pump-08?
15. Which part is showing accelerated wear on Conveyor-B?
16. What is wearing out fastest on Rolling-Mill?
17. Which assembly is closest to breakdown on Pump-23?
18. What is the wear rate of the drive system on Pump-12?
19. Which component has the most degradation on Pump-23?
20. What part is deteriorating on Rolling-Mill?

root_cause:
1. Why is Pump-12 flagged as critical?
2. What caused the fault on Pump-08?
3. Why is Conveyor-B at risk of failure?
4. What is the root cause of the Rolling-Mill fault?
5. Why is Pump-23 showing high risk?
6. What is causing the vibration on Pump-12?
7. Why did Conveyor-A trigger an alert?
8. What is the reason for Pump-08 high failure probability?
9. Why is Rolling-Mill degrading?
10. What caused the bearing fault on Pump-12?
11. Why is Pump-23 in critical condition?
12. What is the underlying cause of Conveyor-B problem?
13. Why will Pump-12 fail?
14. What is wrong with Rolling-Mill?
15. Why is the alarm triggered on Pump-08?
16. What fault is causing the issue on Conveyor-A?
17. What is the source of failure risk on Pump-23?
18. Why is the equipment degrading on Conveyor-B?
19. What is the primary failure mechanism on Rolling-Mill?
20. What is causing the risk on Pump-12?

failure_driver:
1. What is the main risk driver for Pump-12?
2. Which parameter is driving the failure risk on Pump-08?
3. What factor is contributing most to Conveyor-B risk?
4. What is the primary failure contributor on Rolling-Mill?
5. Which metric is causing the high risk on Pump-23?
6. What is the biggest risk factor for Pump-12?
7. What parameter contributes most to failure on Conveyor-A?
8. What is the key risk indicator for Pump-08?
9. What drives the failure probability on Rolling-Mill?
10. Which factor has the highest contribution to Pump-23 risk?
11. What is the top contributor to failure on Pump-12?
12. What is the main failure driver on Conveyor-B?
13. Which variable is the strongest predictor of failure for Pump-08?
14. What is the dominant risk factor on Rolling-Mill?
15. What factor is most responsible for Conveyor-A risk level?
16. What parameter is the chief failure driver on Pump-23?
17. What is contributing most to the failure risk on Pump-12?
18. Which indicator is driving the risk score on Pump-08?
19. What causes the most risk on Conveyor-B?
20. List all risk drivers for Rolling-Mill

rul:
1. How many days does Pump-12 have before failure?
2. What is the remaining useful life of Pump-08?
3. How long will Conveyor-B last?
4. When will Rolling-Mill fail?
5. What is the RUL for Pump-23?
6. How much time is left before Pump-12 breaks down?
7. How long until Conveyor-A needs replacement?
8. What is the estimated life remaining for Pump-08?
9. How many days until Rolling-Mill failure?
10. What is the remaining life of Pump-23?
11. How quickly is Pump-12 approaching failure?
12. How long before Conveyor-B reaches end of life?
13. What is the time to failure for Rolling-Mill?
14. How fast is Pump-08 degrading?
15. What is the lifespan remaining for Pump-23?
16. How many days left for Conveyor-A?
17. What is the failure date for Pump-12?
18. How much longer will Rolling-Mill run?
19. What is the time remaining before Pump-23 fails?
20. What is the wear rate and remaining life for Pump-08?

maintenance:
1. What should I do to fix Pump-12?
2. What maintenance actions are needed for Pump-08?
3. How do I repair Conveyor-B?
4. What is the corrective action for Rolling-Mill?
5. How do I address the fault on Pump-23?
6. What steps should I take for Pump-12?
7. What is the maintenance procedure for Conveyor-A?
8. How do I service Pump-08?
9. What are the recommended actions for Rolling-Mill?
10. What should I do right now for Pump-12?
11. What is the SOP for repairing Pump-23?
12. How do I prevent the failure on Conveyor-B?
13. What is the maintenance plan for Rolling-Mill?
14. What intervention is required for Pump-08?
15. Walk me through the repair procedure for Conveyor-A
16. What are the step-by-step instructions for Pump-12?
17. What long-term actions should I plan for Pump-23?
18. What safety precautions do I need for working on Pump-08?
19. How do I perform the overhaul on Rolling-Mill?
20. What LOTO procedures apply to Conveyor-B?

spare_parts:
1. What parts do I need for Pump-12?
2. What spare parts are required for Pump-08?
3. What components should I order for Conveyor-B?
4. What is the bill of materials for Rolling-Mill repair?
5. What inventory do I need for Pump-23?
6. Which parts need to be ordered for Conveyor-A?
7. What spares are required for Pump-12?
8. What should I procure for Pump-08?
9. What components are needed for Conveyor-B?
10. What parts are required for the Rolling-Mill repair?
11. When should I order parts for Pump-23?
12. What is the procurement priority for Conveyor-A spares?
13. How urgent is the parts order for Pump-12?
14. What lead time do I need for Pump-08 parts?
15. List all spare parts required for Conveyor-B
16. What is the parts list for Rolling-Mill?
17. Which components need to be stocked for Pump-23?
18. What spare parts should I have on hand for Conveyor-A?
19. What is the procurement recommendation for Pump-12?
20. What parts should I order immediately for Pump-08?

financial_impact:
1. What is the financial impact of Pump-12 failure?
2. How much will it cost if Pump-08 breaks down?
3. What is the potential loss from Conveyor-B failure?
4. What is the ROI of maintaining Rolling-Mill now?
5. What is the downtime cost per hour for Pump-23?
6. How much revenue will we lose if Pump-12 fails?
7. What is the financial exposure for Conveyor-A?
8. What is the business impact of Pump-08 failure?
9. How much does downtime cost for Rolling-Mill?
10. What is the cost of failure for Pump-23?
11. Is it worth repairing Conveyor-B now?
12. What are the cost savings from early maintenance on Pump-12?
13. What is the return on investment for servicing Pump-08?
14. What is the production loss per hour for Rolling-Mill?
15. What is the expected savings from fixing Pump-23?
16. What is the financial risk for Conveyor-A?
17. How much money do we save by acting now on Pump-12?
18. What is the cost exposure for Pump-08 downtime?
19. Calculate the ROI for Rolling-Mill maintenance
20. What is the total financial impact of Pump-23 failure?

fleet_analysis:
1. Which machine needs attention first across the plant?
2. What is the enterprise risk overview?
3. Rank all assets by risk score
4. Which equipment should I prioritize for maintenance?
5. What is the overall plant health status?
6. Which assets are in critical condition?
7. Show me the fleet-wide risk summary
8. What is the most urgent equipment in the plant?
9. Which pumps and conveyors are at highest risk?
10. Show me all critical and warning assets
11. What is the plant-wide financial exposure?
12. Which assets have RUL below 30 days?
13. Show me healthy assets across the fleet
14. What is the enterprise risk index?
15. Which machine should I maintain first?
16. Show all warning-level assets in the plant
17. What is the total risk exposure across all equipment?
18. Rank all machines by remaining useful life
19. Which assets require immediate attention?
20. What is the overall fleet health status?

asset_comparison:
1. Compare Pump-12 vs Pump-08
2. Which is worse, Conveyor-A or Conveyor-B?
3. Pump-12 vs Rolling-Mill — which needs attention first?
4. Compare the risk between Pump-23 and Pump-08
5. Which pump is in worse condition?
6. Pump-12 and Conveyor-B — which has higher risk?
7. Compare the RUL of Pump-08 and Rolling-Mill
8. Which conveyor is healthier, A or B?
9. Compare failure probability between Pump-12 and Pump-23
10. Pump-08 vs Pump-23 — which is more critical?
11. Compare the financial exposure of Pump-12 and Rolling-Mill
12. Which is more likely to fail — Conveyor-A or Pump-08?
13. Compare the degradation rate of Pump-12 vs Pump-23
14. Rolling-Mill vs Conveyor-B — which is safer?
15. Compare health scores for Pump-08 and Pump-12
16. Which asset has higher ROI — Pump-23 or Conveyor-A?
17. Pump-12 and Pump-08 side by side comparison
18. Which machine is in better condition — Rolling-Mill or Conveyor-B?
19. Compare the risk timeline of Pump-12 and Pump-23
20. Is Pump-08 or Pump-12 more critical right now?

evidence_analysis:
1. What data supports the Pump-12 failure prediction?
2. Show me the sensor evidence for Pump-08 fault
3. What evidence indicates Conveyor-B will fail?
4. Prove to me why Rolling-Mill is at risk
5. What sensor readings back the Pump-23 diagnosis?
6. Show me the evidence behind the Pump-12 prediction
7. What data is the AI using to flag Pump-08?
8. What proof shows Conveyor-A is degrading?
9. Show me the supporting data for Rolling-Mill risk
10. What sensor data confirms the Pump-23 failure risk?
11. Which sensor readings back up the Pump-12 diagnosis?
12. What evidence supports the risk assessment for Pump-08?
13. Show me the data behind the Conveyor-B alert
14. What is the sensor evidence for Rolling-Mill condition?
15. What data points support the Pump-23 prognosis?
16. Show all evidence for Pump-12 failure prediction
17. What readings confirm the fault on Pump-08?
18. What sensor data is triggering the Conveyor-B alert?
19. Show the evidence trail for Rolling-Mill diagnosis
20. What data does the AI use to predict Pump-12 failure?

executive_decision:
1. Give me an executive summary for Pump-12
2. Brief me on Rolling-Mill status
3. What is the overall situation at the plant?
4. Give me a quick overview of Pump-08
5. Summarize the key risks for the plant
6. What do I need to know about Conveyor-B as a manager?
7. Give me the key findings for Pump-23
8. What is the strategic recommendation for Rolling-Mill?
9. Give me a one-line summary of Pump-12 status
10. What should leadership know about Pump-08?
11. Executive briefing on fleet status please
12. What are the top priorities from a management perspective?
13. Give me the TL;DR for Pump-23
14. Brief the board on the current equipment risk
15. What is the headline risk for the plant?
16. Summarize all critical issues for management
17. What is the strategic decision needed for Rolling-Mill?
18. Give me a C-suite summary of current asset status
19. What is the bottom line on Pump-12?
20. Quick overview of all high-risk assets for the director

operational_decision:
1. What should I do immediately about Pump-12?
2. What is the operational action for Pump-08?
3. Should I shut down Conveyor-B now?
4. What is the priority action for Rolling-Mill?
5. Do I need to stop Pump-23?
6. What decision should I make for Pump-12 right now?
7. Should I continue running Conveyor-A?
8. What operational call should I make on Pump-08?
9. Can I keep Rolling-Mill running?
10. What is my next operational step for Pump-23?
11. Do I need to escalate the Pump-12 situation?
12. What should the operator do about Conveyor-B?
13. Is it safe to continue operating Rolling-Mill?
14. What operational recommendation do you have for Pump-08?
15. Should I issue a maintenance work order for Pump-23?
16. What is the urgency of the Pump-12 situation?
17. Should Conveyor-A be taken offline?
18. What operational guidance do you have for Rolling-Mill?
19. Do I need to page the maintenance team for Pump-12?
20. What should shift management do about Pump-08?

SUB-INTENT OPTIONS per intent (choose the most specific one):
asset_status:        health_score | failure_probability | sensor_status | risk_level | overall_condition
sensor_analysis:     worst_sensor | all_sensors | sensor_deviation | full_sensor
degradation_analysis: worst_component | degradation_rate | full_degradation
root_cause:          primary_cause | failure_drivers | evidence | full_rca
failure_driver:      primary_driver | all_drivers | full_driver
rul:                 rul_number | degradation_rate | full_rul
maintenance:         immediate_actions | short_term | long_term | procedure_steps | safety_requirements | tools_required | full_plan
spare_parts:         parts_list | procurement_priority | full_parts
financial_impact:    loss_exposure | roi | downtime_cost | full_financial
fleet_analysis:      fleet_ranking | fleet_risk | fleet_financial | fleet_filter | full_fleet
asset_comparison:    full_comparison
evidence_analysis:   full_evidence
executive_decision:  full_executive
operational_decision: immediate_decision | full_operational

Respond with ONLY valid JSON (no markdown, no explanation):
{{"intent": "<intent>", "sub_intent": "<sub_intent>", "confidence": <0.0-1.0>}}

Question: {query}
Equipment in context: {equipment_id}
""".strip()

from prometheus_client import generate_latest

# Heavy imports are lazy-loaded inside functions to keep startup memory under 512MB (Render free tier)
app_graph = None
HumanMessage = None
AIMessage = None

def _get_agent_graph():
    global app_graph, HumanMessage, AIMessage
    if app_graph is None:
        from agents.workflow import app_graph as _g
        from langchain_core.messages import HumanMessage as _H, AIMessage as _A
        app_graph = _g
        HumanMessage = _H
        AIMessage = _A
    return app_graph

def _get_ml():
    from ml.predictor import predict_for_equipment, get_dataset_stats
    return predict_for_equipment, get_dataset_stats

def _get_rag():
    from rag.knowledge_base import add_document_text
    return add_document_text

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s %(message)s")
logger = logging.getLogger("SteelMindAPI")

app = FastAPI(title="SteelMind AI", description="Intelligent Maintenance Decision Platform", version="2.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# In-memory stores (production would use Redis/PostgreSQL)
sessions: Dict[str, Dict] = {}        # session_id -> {history, equipment_id}
feedback_store: List[Dict] = []       # feedback records
alert_log: List[Dict] = []            # real-time alerts

# Build RAG knowledge base + train AI4I model on startup
@app.on_event("startup")
async def startup_event():
    # Both RAG and ML model load lazily on first request to stay within free-tier 512MB RAM
    logger.info("SteelMind API ready — models will load on first request.")


# ??? REQUEST / RESPONSE MODELS ?????????????????????????????????????????????????

class AgentRequest(BaseModel):
    equipment_id: str
    message: str
    sensor_data: Dict[str, Any] = {}
    session_id: Optional[str] = None   # for multi-turn conversation

class FeedbackRequest(BaseModel):
    session_id: str
    equipment_id: str
    feedback_type: str                 # "confirm", "modify", "reject"
    original_diagnosis: str
    corrected_diagnosis: Optional[str] = None
    engineer_notes: str = ""
    recommendation_rating: int = 3    # 1-5

class AlertThreshold(BaseModel):
    equipment_id: str
    parameter: str
    value: float
    threshold: float
    status: str


# ??? CORE AGENT ENDPOINT ???????????????????????????????????????????????????????

@app.post("/api/agent/invoke")
async def invoke_agent(req: AgentRequest):
    logger.info(f"Agent invoke: {req.equipment_id} | session={req.session_id}")

    # Session management for multi-turn conversation
    session_id = req.session_id or f"sess_{int(time.time()*1000)}"
    session = sessions.setdefault(session_id, {"history": [], "equipment_id": req.equipment_id})

    # Build message history for context
    _graph = _get_agent_graph()
    history_messages = []
    for turn in session["history"][-6:]:  # last 6 turns for context
        history_messages.append(HumanMessage(content=turn["user"]))
        history_messages.append(AIMessage(content=turn["assistant"]))
    history_messages.append(HumanMessage(content=req.message))

    state = {
        "messages": history_messages,
        "equipment_id": req.equipment_id,
        "sensor_data": req.sensor_data,
        "agent_traces": [],
        "anomalies": {},
        "contributing_factors": [],
        "retrieved_context": "",
    }

    try:
        result = _graph.invoke(state)

        # Save turn to session history
        final_msg = result.get("messages", [])[-1].content if result.get("messages") else ""
        session["history"].append({"user": req.message, "assistant": final_msg})

        # Check for critical risk and log alert
        risk = result.get("risk_assessment", {})
        if risk.get("level") in ["Critical", "High"]:
            alert_log.append({
                "timestamp": time.time(),
                "equipment_id": req.equipment_id,
                "risk_level": risk.get("level"),
                "diagnosis": result.get("diagnosis", ""),
                "urgency_hours": risk.get("urgency_hours"),
                "session_id": session_id
            })

        return {
            "session_id": session_id,
            "equipment_id": result.get("equipment_id"),
            "diagnosis": result.get("diagnosis"),
            "severity": result.get("severity", "Unknown"),
            "anomalies": result.get("anomalies", {}),
            "root_cause": result.get("root_cause"),
            "contributing_factors": result.get("contributing_factors", []),
            "root_cause_evidence": result.get("root_cause_evidence", ""),
            "predicted_rul_days": result.get("predicted_rul_days"),
            "failure_probability": result.get("failure_probability"),
            "degradation_rate": result.get("degradation_rate", ""),
            "rul_reasoning": result.get("rul_reasoning", ""),
            "risk_assessment": result.get("risk_assessment"),
            "recommended_actions": result.get("recommended_actions"),
            "spare_parts_needed": result.get("spare_parts_needed", []),
            "procurement_advisory": result.get("procurement_advisory", ""),
            "estimated_repair_duration": result.get("estimated_repair_duration", ""),
            "maintenance_report": result.get("maintenance_report", ""),
            "traces": result.get("agent_traces"),
            "final_message": final_msg,
        }
    except Exception as e:
        logger.error(f"Agent workflow error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Agent workflow failed: {str(e)}")


# ??? FEEDBACK LOOP ?????????????????????????????????????????????????????????????

@app.post("/api/feedback")
async def submit_feedback(req: FeedbackRequest):
    """Capture engineer feedback for continuous improvement."""
    record = {
        "timestamp": time.time(),
        "session_id": req.session_id,
        "equipment_id": req.equipment_id,
        "feedback_type": req.feedback_type,
        "original_diagnosis": req.original_diagnosis,
        "corrected_diagnosis": req.corrected_diagnosis,
        "engineer_notes": req.engineer_notes,
        "recommendation_rating": req.recommendation_rating,
    }
    feedback_store.append(record)
    logger.info(f"Feedback received: {req.feedback_type} for {req.equipment_id} (rating: {req.recommendation_rating}/5)")
    return {"status": "accepted", "feedback_id": len(feedback_store), "message": "Feedback recorded. Thank you for improving SteelMind AI."}


@app.get("/api/feedback/summary")
async def feedback_summary():
    if not feedback_store:
        return {"total": 0, "avg_rating": 0, "breakdown": {}}
    breakdown = {}
    for f in feedback_store:
        t = f["feedback_type"]
        breakdown[t] = breakdown.get(t, 0) + 1
    avg_rating = sum(f["recommendation_rating"] for f in feedback_store) / len(feedback_store)
    return {"total": len(feedback_store), "avg_rating": round(avg_rating, 2), "breakdown": breakdown, "recent": feedback_store[-5:]}


# ??? DOCUMENT UPLOAD ????????????????????????????????????????????????????????????

@app.post("/api/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload a new document (TXT or PDF) to the live knowledge base."""
    if not file.filename.endswith((".txt", ".pdf", ".md")):
        raise HTTPException(status_code=400, detail="Only .txt, .pdf, and .md files are supported.")
    content = await file.read()
    try:
        text = content.decode("utf-8", errors="replace")
    except Exception:
        raise HTTPException(status_code=400, detail="Failed to decode file content.")
    add_document_text = _get_rag()
    success = add_document_text(text, metadata={"source_file": file.filename, "upload_time": time.time()})
    if success:
        return {"status": "indexed", "filename": file.filename, "characters": len(text), "message": "Document added to knowledge base."}
    else:
        return {"status": "partial", "filename": file.filename, "message": "Saved to disk but vector indexing unavailable. Keyword fallback active."}


# ??? ALERT ENDPOINTS ????????????????????????????????????????????????????????????

@app.get("/api/alerts")
async def get_alerts(limit: int = 20):
    """Get recent high/critical alerts triggered during agent invocations."""
    recent = sorted(alert_log, key=lambda x: x["timestamp"], reverse=True)[:limit]
    for a in recent:
        a["timestamp_human"] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(a["timestamp"]))
    return {"alerts": recent, "total": len(alert_log)}


@app.delete("/api/alerts/{index}")
async def dismiss_alert(index: int):
    if 0 <= index < len(alert_log):
        alert_log.pop(index)
        return {"status": "dismissed"}
    raise HTTPException(status_code=404, detail="Alert not found")


# ??? SESSION MANAGEMENT ?????????????????????????????????????????????????????????

@app.get("/api/sessions/{session_id}")
async def get_session(session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    return sessions[session_id]


@app.delete("/api/sessions/{session_id}")
async def clear_session(session_id: str):
    sessions.pop(session_id, None)
    return {"status": "cleared"}


# ??? ANOMALY SCAN ENDPOINT ??????????????????????????????????????????????????????

@app.post("/api/anomaly/scan")
async def anomaly_scan(sensor_data: Dict[str, Any]):
    """Standalone anomaly detection without running the full agent pipeline."""
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
        z = abs(value - spec["mean"]) / spec["std"]
        low_bad = spec.get("low_bad", False)
        is_warn = (value < spec["warn"]) if low_bad else (value > spec["warn"])
        is_crit = (value < spec["critical"]) if low_bad else (value > spec["critical"])
        if is_crit: status = "CRITICAL"
        elif is_warn: status = "WARNING"
        elif z > 2.0: status = "ELEVATED"
        else: continue
        anomalies[param] = {"value": value, "unit": spec["unit"], "status": status, "z_score": round(z,2)}
    overall = "CRITICAL" if any(a["status"]=="CRITICAL" for a in anomalies.values()) else \
              "WARNING" if any(a["status"]=="WARNING" for a in anomalies.values()) else \
              "ELEVATED" if anomalies else "NORMAL"
    return {"overall_status": overall, "anomalies": anomalies, "anomaly_count": len(anomalies)}


# ── ML PREDICT ENDPOINTS ───────────────────────────────────────────────────────

class MLPredictRequest(BaseModel):
    equipment_id: str
    sensor_data: Dict[str, Any] = {}

@app.post("/api/ml/predict")
async def ml_predict(req: MLPredictRequest):
    """Run AI4I model prediction for an equipment with current sensor readings."""
    predict_for_equipment, _ = _get_ml()
    result = predict_for_equipment(req.equipment_id, req.sensor_data)
    return result

@app.get("/api/ml/predict/{equipment_id}")
async def ml_predict_get(equipment_id: str):
    """GET version — returns prediction for equipment using static profile."""
    predict_for_equipment, _ = _get_ml()
    result = predict_for_equipment(equipment_id)
    return result

@app.get("/api/ml/dataset/stats")
async def dataset_stats():
    """Return AI4I dataset statistics and model status."""
    _, get_dataset_stats = _get_ml()
    return get_dataset_stats()


# ── SEMANTIC INTENT CLASSIFICATION (Gemini) ────────────────────────────────────

class ClassifyIntentRequest(BaseModel):
    query: str
    equipment_id: str = "unknown"

class ClassifyIntentResponse(BaseModel):
    intent: str
    sub_intent: str
    confidence: float
    source: str  # "gemini" or "fallback"
    error: Optional[str] = None

@app.post("/api/classify-intent", response_model=ClassifyIntentResponse)
async def classify_intent(req: ClassifyIntentRequest):
    """Classify query intent using Gemini semantic classification."""
    if not _GENAI_AVAILABLE:
        return ClassifyIntentResponse(
            intent="unknown", sub_intent="full", confidence=0.0,
            source="fallback", error="google-genai not installed"
        )
    if not GEMINI_API_KEY:
        return ClassifyIntentResponse(
            intent="unknown", sub_intent="full", confidence=0.0,
            source="fallback", error="GEMINI_API_KEY not set"
        )
    try:
        client = _genai.Client(api_key=GEMINI_API_KEY)
        prompt = _CLASSIFICATION_PROMPT.format(
            query=req.query.strip(),
            equipment_id=req.equipment_id or "unknown"
        )
        resp = await asyncio.to_thread(
            lambda: client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
                config=_genai_types.GenerateContentConfig(
                    temperature=0.0,
                    max_output_tokens=128,
                    response_mime_type="application/json",
                )
            )
        )
        raw = resp.text.strip()
        # Strip markdown fences if present
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
            raw = raw.strip()
        data = json.loads(raw)
        return ClassifyIntentResponse(
            intent=data.get("intent", "unknown"),
            sub_intent=data.get("sub_intent", "full"),
            confidence=float(data.get("confidence", 0.85)),
            source="gemini"
        )
    except Exception as e:
        logger.warning(f"Gemini classification failed: {e}")
        return ClassifyIntentResponse(
            intent="unknown", sub_intent="full", confidence=0.0,
            source="fallback", error=str(e)
        )


# ── STANDARD ENDPOINTS ─────────────────────────────────────────────────────────

@app.get("/api")
async def root():
    return {"service": "SteelMind AI", "version": "2.0.0", "status": "operational"}

@app.get("/health")
async def health():
    return {"status": "healthy", "sessions_active": len(sessions), "alerts_pending": len(alert_log), "feedback_collected": len(feedback_store)}

@app.get("/metrics")
async def metrics():
    return Response(content=generate_latest(), media_type="text/plain; version=0.0.4")


# ??? WEBSOCKET SENSOR STREAM ????????????????????????????????????????????????????

class ConnectionManager:
    def __init__(self):
        self.connections: list[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.connections.append(ws)

    def disconnect(self, ws: WebSocket):
        self.connections.remove(ws)

    async def broadcast(self, msg: str):
        dead = []
        for ws in self.connections:
            try:
                await ws.send_text(msg)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.connections.remove(ws)

manager = ConnectionManager()

# Simulates realistic correlated sensor degradation for Pump-12
_sim_state = {"temp": 65.0, "vib": 2.0, "trend": "stable", "hours": 0}

def _next_sensor_reading():
    """Generates correlated, physically realistic sensor readings with occasional degradation events."""
    global _sim_state
    _sim_state["hours"] += 1 / 3600.0  # 1-second ticks

    # Slow drift upward (bearing degradation simulation)
    drift = 0.002 if _sim_state["trend"] == "degrading" else 0.0
    noise_temp = random.gauss(0, 0.4)
    noise_vib = random.gauss(0, 0.05)

    _sim_state["temp"] = min(95.0, max(55.0, _sim_state["temp"] + drift + noise_temp))
    _sim_state["vib"] = min(8.0, max(0.5, _sim_state["vib"] + drift * 0.3 + noise_vib))

    # Random degradation event every ~5 minutes
    if random.random() < 0.003:
        _sim_state["trend"] = "degrading" if _sim_state["trend"] == "stable" else "stable"
        if _sim_state["trend"] == "stable":
            _sim_state["temp"] = max(55.0, _sim_state["temp"] - 8.0)
            _sim_state["vib"] = max(0.5, _sim_state["vib"] - 1.0)

    temp = round(_sim_state["temp"], 2)
    vib = round(_sim_state["vib"], 3)
    pressure = round(random.gauss(105.0, 2.0), 1)
    oil_temp = round(temp * 0.75 + random.gauss(0, 1.5), 1)  # correlated with main temp

    if temp > 90 or vib > 7.0: status = "critical"
    elif temp > 80 or vib > 4.5: status = "warning"
    else: status = "normal"

    return {"equipment_id": "Pump-12", "temperature": temp, "vibration": vib, "pressure": pressure,
            "oil_temp": oil_temp, "status": status, "trend": _sim_state["trend"], "timestamp": time.time()}


# ── Per-machine sensor simulation ──────────────────────────────────────────────
MACHINE_SENSOR_BASES: Dict[str, Dict] = {
    "Pump-12":     {"temp": 75.0, "vib": 3.5, "pres": 105.0, "temp_min": 55.0, "temp_max": 95.0,  "vib_min": 0.5, "vib_max": 8.0, "pres_base": 105.0, "pres_noise": 2.0,  "trend": "degrading"},
    "Pump-08":     {"temp": 62.0, "vib": 1.8, "pres": 98.0,  "temp_min": 45.0, "temp_max": 80.0,  "vib_min": 0.3, "vib_max": 5.0, "pres_base": 98.0,  "pres_noise": 1.5,  "trend": "stable"},
    "Pump-23":     {"temp": 68.0, "vib": 4.2, "pres": 185.0, "temp_min": 50.0, "temp_max": 88.0,  "vib_min": 0.5, "vib_max": 9.0, "pres_base": 185.0, "pres_noise": 3.0,  "trend": "degrading"},
    "Conveyor-B":  {"temp": 52.0, "vib": 2.8, "pres": 52.0,  "temp_min": 30.0, "temp_max": 70.0,  "vib_min": 0.2, "vib_max": 6.0, "pres_base": 52.0,  "pres_noise": 1.0,  "trend": "degrading"},
    "Rolling-Mill":{"temp": 510.0,"vib": 0.5, "pres": 155.0, "temp_min":400.0, "temp_max":620.0,  "vib_min": 0.2, "vib_max": 1.5, "pres_base": 155.0, "pres_noise": 5.0,  "trend": "stable"},
    "Conveyor-A":  {"temp": 38.0, "vib": 1.2, "pres": 48.0,  "temp_min": 28.0, "temp_max": 60.0,  "vib_min": 0.1, "vib_max": 4.0, "pres_base": 48.0,  "pres_noise": 0.8,  "trend": "stable"},
}
_machine_states: Dict[str, Dict] = {}

def _get_machine_sim(equipment_id: str) -> Dict:
    if equipment_id not in _machine_states:
        base = MACHINE_SENSOR_BASES.get(equipment_id, MACHINE_SENSOR_BASES["Pump-12"])
        _machine_states[equipment_id] = {"temp": base["temp"], "vib": base["vib"], "trend": base["trend"]}
    return _machine_states[equipment_id]

def _next_machine_reading(equipment_id: str) -> dict:
    base = MACHINE_SENSOR_BASES.get(equipment_id, MACHINE_SENSOR_BASES["Pump-12"])
    state = _get_machine_sim(equipment_id)
    drift = 0.003 if state["trend"] == "degrading" else 0.0
    temp_range = base["temp_max"] - base["temp_min"]
    state["temp"] = min(base["temp_max"], max(base["temp_min"],
        state["temp"] + drift * temp_range / 30 + random.gauss(0, temp_range * 0.004)))
    state["vib"] = min(base["vib_max"], max(base["vib_min"],
        state["vib"] + drift * 0.3 + random.gauss(0, 0.05)))
    if random.random() < 0.003:
        state["trend"] = "degrading" if state["trend"] == "stable" else "stable"
        if state["trend"] == "stable":
            state["temp"] = max(base["temp_min"], state["temp"] - temp_range * 0.08)
            state["vib"]  = max(base["vib_min"], state["vib"] - 1.0)
    temp = round(state["temp"], 2)
    vib  = round(state["vib"], 3)
    pres = round(random.gauss(base["pres_base"], base["pres_noise"]), 1)
    warn_t = base["temp_min"] + temp_range * 0.75
    crit_t = base["temp_min"] + temp_range * 0.90
    warn_v = base["vib_min"] + (base["vib_max"] - base["vib_min"]) * 0.55
    crit_v = base["vib_min"] + (base["vib_max"] - base["vib_min"]) * 0.82
    if temp > crit_t or vib > crit_v:   status = "critical"
    elif temp > warn_t or vib > warn_v:  status = "warning"
    else:                                status = "normal"
    return {"equipment_id": equipment_id, "temperature": temp, "vibration": vib,
            "pressure": pres, "status": status, "trend": state["trend"], "timestamp": time.time()}

@app.websocket("/ws/sensors/{equipment_id}")
async def websocket_machine_endpoint(websocket: WebSocket, equipment_id: str):
    """Per-machine live sensor stream — used by the Monitor page machine selector."""
    await websocket.accept()
    try:
        while True:
            data = _next_machine_reading(equipment_id)
            await websocket.send_text(json.dumps(data))
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        pass


@app.websocket("/ws/sensors")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = _next_sensor_reading()
            await manager.broadcast(json.dumps(data))
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        manager.disconnect(websocket)


# Serve built Next.js frontend ? must be LAST (catches all unmatched routes)
import os as _os
_frontend_out = _os.path.join(_os.path.dirname(__file__), "..", "frontend", "out")
if _os.path.isdir(_frontend_out):
    app.mount("/", StaticFiles(directory=_frontend_out, html=True), name="frontend")
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

