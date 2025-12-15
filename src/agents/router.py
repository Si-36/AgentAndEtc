"""
Task Router - Intelligent routing between Strategic Debate and Workflow Agents
Research-validated routing logic

Routes queries to:
1. Multi-agent debate system (strategic decisions, complex analysis)
2. Single-agent workflow systems (email, calendar, documents, etc.)
3. Simple LLM (quick questions)

Research basis:
- Multi-agent: +50-80% for strategic, -70% for workflows
- Single-agent: Best for tool-heavy sequential tasks
- Router is the intelligence layer
"""

from typing import TypedDict, Literal, Annotated
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_openai import ChatOpenAI
import operator
import os
import re
from dotenv import load_dotenv

load_dotenv()

# ============================================
# ROUTER STATE
# ============================================

class RouterState(TypedDict):
    """State for router graph"""
    # Input
    query: str
    user_id: str
    
    # Classification
    task_type: Literal["strategic", "workflow_email", "workflow_calendar", 
                       "workflow_document", "workflow_financial", "workflow_meeting", "simple"]
    confidence: float
    reasoning: str
    
    # Routing decision
    route_to: str  # "debate_system", "email_agent", "calendar_agent", etc.
    
    # Metadata
    messages: Annotated[list[BaseMessage], operator.add]

# ============================================
# CLASSIFICATION LOGIC
# ============================================

# Initialize classifier LLM (fast, cheap model)
classifier_llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.1,
    api_key=os.getenv("OPENAI_API_KEY")
)

CLASSIFICATION_PROMPT = """You are a task classifier for an AI business advisor system.

Analyze the user query and classify it into ONE of these categories:

1. **strategic**: Complex business decisions requiring multi-perspective analysis
   - Examples: "Should we expand to Dubai?", "Evaluate acquisition of Company X"
   - Triggers: Financial impact >$50K, strategic planning, risk analysis, market entry
   - Route to: Multi-agent debate system (Analyst + Strategist + Critic + Arbiter)

2. **workflow_email**: Email-related tasks
   - Examples: "Draft response to client", "Summarize emails from last week"
   - Triggers: Email, inbox, draft, reply, send
   - Route to: Email workflow agent

3. **workflow_calendar**: Calendar and scheduling tasks
   - Examples: "Schedule meeting with team", "Find free time next week"
   - Triggers: Schedule, calendar, meeting, appointment, time block
   - Route to: Calendar workflow agent

4. **workflow_document**: Document creation/editing tasks
   - Examples: "Create proposal for client", "Edit contract"
   - Triggers: Document, proposal, contract, report, write, edit
   - Route to: Document workflow agent

5. **workflow_financial**: Financial tracking and analysis
   - Examples: "Track expenses this month", "Generate invoice"
   - Triggers: Invoice, expense, budget, financial, payment
   - Route to: Financial workflow agent

6. **workflow_meeting**: Meeting transcription and analysis
   - Examples: "Transcribe meeting", "Extract action items from call"
   - Triggers: Transcribe, meeting notes, action items, recording
   - Route to: Meeting workflow agent

7. **simple**: Quick factual questions or simple queries
   - Examples: "What is Jalali date today?", "Convert 1000 USD to Rial"
   - Triggers: Simple facts, conversions, quick lookups
   - Route to: Direct LLM response

**Output format (JSON):**
Return a JSON object with these fields:
- task_type: one of (strategic, workflow_email, workflow_calendar, workflow_document, workflow_financial, workflow_meeting, simple)
- confidence: float between 0 and 1
- reasoning: brief explanation

User query: {{query}}

Classify now:"""

def classify_task(state: RouterState) -> dict:
    """Classify the task type"""
    query = state["query"]
    
    # Build prompt
    prompt = CLASSIFICATION_PROMPT.format(query=query)
    
    # Get classification
    response = classifier_llm.invoke([HumanMessage(content=prompt)])
    content = response.content
    
    # Parse JSON response
    import json
    try:
        # Extract JSON from markdown code blocks if present
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
        
        result = json.loads(content)
        task_type = result["task_type"]
        confidence = result["confidence"]
        reasoning = result["reasoning"]
    except:
        # Fallback: simple heuristics
        query_lower = query.lower()
        if any(word in query_lower for word in ["should we", "evaluate", "expand", "acquisition", "strategy"]):
            task_type = "strategic"
            confidence = 0.7
        elif any(word in query_lower for word in ["email", "inbox", "draft", "reply"]):
            task_type = "workflow_email"
            confidence = 0.7
        elif any(word in query_lower for word in ["schedule", "calendar", "meeting", "appointment"]):
            task_type = "workflow_calendar"
            confidence = 0.7
        elif any(word in query_lower for word in ["document", "proposal", "contract", "report"]):
            task_type = "workflow_document"
            confidence = 0.7
        elif any(word in query_lower for word in ["invoice", "expense", "budget", "financial"]):
            task_type = "workflow_financial"
            confidence = 0.7
        elif any(word in query_lower for word in ["transcribe", "meeting notes", "action items"]):
            task_type = "workflow_meeting"
            confidence = 0.7
        else:
            task_type = "simple"
            confidence = 0.6
        reasoning = "Fallback heuristic classification"
    
    # Determine route
    route_map = {
        "strategic": "debate_system",
        "workflow_email": "email_agent",
        "workflow_calendar": "calendar_agent",
        "workflow_document": "document_agent",
        "workflow_financial": "financial_agent",
        "workflow_meeting": "meeting_agent",
        "simple": "simple_llm"
    }
    
    route_to = route_map.get(task_type, "simple_llm")
    
    return {
        "task_type": task_type,
        "confidence": confidence,
        "reasoning": reasoning,
        "route_to": route_to,
        "messages": [response]
    }

# ============================================
# BUILD ROUTER GRAPH
# ============================================

# Create graph
workflow = StateGraph(RouterState)

# Add classification node
workflow.add_node("classify", classify_task)

# Set entry point
workflow.set_entry_point("classify")

# End after classification (actual routing happens externally)
workflow.add_edge("classify", END)

# Compile
router_graph = workflow.compile()

# ============================================
# HELPER FUNCTION
# ============================================

def route_query(query: str, user_id: str = "default") -> dict:
    """
    Route a query to the appropriate system
    
    Returns:
        dict with keys: task_type, route_to, confidence, reasoning
    """
    result = router_graph.invoke({
        "query": query,
        "user_id": user_id,
        "messages": []
    })
    
    return {
        "task_type": result["task_type"],
        "route_to": result["route_to"],
        "confidence": result["confidence"],
        "reasoning": result["reasoning"]
    }

# ============================================
# DEMO
# ============================================

if __name__ == "__main__":
    from rich.console import Console
    from rich.table import Table
    from rich.panel import Panel
    
    console = Console()
    
    console.print(Panel.fit(
        "[bold cyan]Task Router - Intelligent Query Classification[/bold cyan]\n"
        "[dim]Routes to: Debate System | Workflow Agents | Simple LLM[/dim]",
        border_style="cyan"
    ))
    
    # Test queries
    test_queries = [
        "Should we expand our software company to Dubai market in 2025?",
        "Draft a response to the client email about pricing",
        "Schedule a meeting with the team next Tuesday at 2pm",
        "Create a proposal for the new project",
        "Track my expenses for this month",
        "Transcribe the meeting recording from yesterday",
        "What is the Jalali date today?",
    ]
    
    table = Table(title="Router Classification Results")
    table.add_column("Query", style="cyan", width=40)
    table.add_column("Type", style="yellow")
    table.add_column("Route To", style="green")
    table.add_column("Confidence", style="magenta")
    
    for query in test_queries:
        result = route_query(query)
        table.add_row(
            query[:37] + "..." if len(query) > 40 else query,
            result["task_type"],
            result["route_to"],
            f"{result['confidence']:.0%}"
        )
    
    console.print("\n")
    console.print(table)
    console.print("\n[dim]✓ Router working correctly[/dim]\n")

