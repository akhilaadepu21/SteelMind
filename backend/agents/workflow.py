from langgraph.graph import StateGraph, END
from .state import MaintenanceState
from .nodes import (
    supervisor_agent,
    diagnostic_agent,
    root_cause_agent,
    knowledge_retrieval_agent,
    predictive_maintenance_agent,
    risk_assessment_agent,
    maintenance_planning_agent,
    human_approval_node,
    executive_intelligence_agent
)

def build_workflow():
    workflow = StateGraph(MaintenanceState)
    
    # Add nodes
    workflow.add_node("Supervisor", supervisor_agent)
    workflow.add_node("Diagnostic", diagnostic_agent)
    workflow.add_node("RootCause", root_cause_agent)
    workflow.add_node("KnowledgeRetrieval", knowledge_retrieval_agent)
    workflow.add_node("PredictiveMaintenance", predictive_maintenance_agent)
    workflow.add_node("RiskAssessment", risk_assessment_agent)
    workflow.add_node("MaintenancePlanning", maintenance_planning_agent)
    workflow.add_node("HumanApproval", human_approval_node)
    workflow.add_node("ExecutiveIntelligence", executive_intelligence_agent)

    # Add conditional edge from Supervisor
    def route_supervisor(state: MaintenanceState):
        return state.get("next_agent", "Diagnostic")
        
    workflow.add_conditional_edges(
        "Supervisor",
        route_supervisor,
        {
            "Diagnostic": "Diagnostic",
            "KnowledgeRetrieval": "KnowledgeRetrieval"
        }
    )
    
    workflow.add_edge("Diagnostic", "RootCause")
    workflow.add_edge("RootCause", "KnowledgeRetrieval")
    workflow.add_edge("KnowledgeRetrieval", "PredictiveMaintenance")
    workflow.add_edge("PredictiveMaintenance", "RiskAssessment")
    workflow.add_edge("RiskAssessment", "MaintenancePlanning")
    workflow.add_edge("MaintenancePlanning", "HumanApproval")
    workflow.add_edge("HumanApproval", "ExecutiveIntelligence")
    workflow.add_edge("ExecutiveIntelligence", END)
    
    workflow.set_entry_point("Supervisor")
    
    return workflow.compile()

app_graph = build_workflow()
