from typing import TypedDict, Annotated, List, Dict, Any, Optional
from langgraph.graph.message import add_messages
from langchain_core.messages import BaseMessage

class MaintenanceState(TypedDict):
    messages: Annotated[List[BaseMessage], add_messages]
    equipment_id: str
    sensor_data: Dict[str, Any]
    # Diagnosis
    diagnosis: str
    severity: str
    anomalies: Dict[str, Any]
    # Root cause
    root_cause: str
    contributing_factors: List[str]
    root_cause_evidence: str
    # Prediction
    predicted_rul_days: float
    failure_probability: float
    degradation_rate: str
    rul_reasoning: str
    # Risk & planning
    risk_assessment: Dict[str, Any]
    recommended_actions: List[Dict[str, Any]]
    spare_parts_needed: List[str]
    procurement_advisory: str
    estimated_repair_duration: str
    work_order_generated: bool
    # Knowledge
    retrieved_context: str
    maintenance_report: str
    # Meta
    next_agent: str
    agent_traces: List[Dict[str, Any]]
