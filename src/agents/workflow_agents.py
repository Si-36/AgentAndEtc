"""
Workflow Agents - Single-agent systems for tool-heavy sequential tasks
Based on OpenAI Swarm pattern

5 Workflow Agents:
1. Email Agent - Gmail integration, drafting, summarization
2. Calendar Agent - Google Calendar, scheduling, time management
3. Document Agent - Google Docs, proposals, contracts
4. Financial Agent - Expense tracking, invoicing, budgeting
5. Meeting Agent - Transcription, action items, summaries

Research basis:
- Single-agent best for sequential tool use
- Swarm pattern: lightweight, function-calling based
- Persian context integration
"""

from typing import TypedDict, Annotated, Literal
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, ToolMessage
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
import operator
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# ============================================
# SHARED STATE
# ============================================

class WorkflowState(TypedDict):
    """Shared state for all workflow agents"""
    # Input
    query: str
    user_id: str
    
    # Execution
    messages: Annotated[list[BaseMessage], operator.add]
    tool_calls: list[dict]
    
    # Output
    result: str
    status: Literal["success", "error", "pending"]
    
    # Metadata
    agent_type: str
    start_time: float
    end_time: float

# ============================================
# PERSIAN CONTEXT TOOLS
# ============================================

@tool
def get_jalali_date() -> str:
    """Get current Jalali (Persian) date"""
    from persiantools.jdatetime import JalaliDate
    today = JalaliDate.today()
    return f"{today.year}-{today.month:02d}-{today.day:02d}"

@tool
def get_persian_time_context() -> dict:
    """Get Persian business context (fiscal year, quarter, etc.)"""
    from persiantools.jdatetime import JalaliDate
    today = JalaliDate.today()
    
    # Fiscal year starts on Farvardin 1 (March 21)
    fiscal_year = f"FY{today.year}"
    
    # Quarter calculation
    quarter = (today.month - 1) // 3 + 1
    
    return {
        "jalali_date": f"{today.year}-{today.month:02d}-{today.day:02d}",
        "fiscal_year": fiscal_year,
        "quarter": f"Q{quarter}",
        "month_name": today.strftime("%B"),
        "is_weekend": today.weekday() == 4  # Friday in Iran
    }

# ============================================
# EMAIL AGENT TOOLS
# ============================================

@tool
def search_gmail(query: str, max_results: int = 10) -> list[dict]:
    """
    Search Gmail messages
    
    Args:
        query: Gmail search query (e.g., "from:client@example.com after:2024/01/01")
        max_results: Maximum number of results to return
    
    Returns:
        List of email summaries
    """
    # TODO: Implement actual Gmail API integration
    # For now, return mock data
    return [
        {
            "id": "msg_001",
            "from": "client@example.com",
            "subject": "Project Update Request",
            "snippet": "Hi, can you provide an update on the project timeline?",
            "date": "2024-12-14"
        }
    ]

@tool
def draft_email(to: str, subject: str, body: str, cc: str = None) -> dict:
    """
    Draft an email (saves to drafts, doesn't send)
    
    Args:
        to: Recipient email address
        subject: Email subject
        body: Email body (can include Persian text)
        cc: Optional CC recipients
    
    Returns:
        Draft email details
    """
    # TODO: Implement actual Gmail API integration
    return {
        "status": "draft_created",
        "draft_id": "draft_001",
        "to": to,
        "subject": subject,
        "preview": body[:100] + "..."
    }

@tool
def send_email(draft_id: str) -> dict:
    """
    Send a drafted email
    
    Args:
        draft_id: ID of the draft to send
    
    Returns:
        Send status
    """
    # TODO: Implement actual Gmail API integration
    return {
        "status": "sent",
        "message_id": "msg_sent_001",
        "sent_at": datetime.now().isoformat()
    }

# ============================================
# CALENDAR AGENT TOOLS
# ============================================

@tool
def search_calendar(start_date: str, end_date: str) -> list[dict]:
    """
    Search Google Calendar events
    
    Args:
        start_date: Start date (YYYY-MM-DD)
        end_date: End date (YYYY-MM-DD)
    
    Returns:
        List of calendar events
    """
    # TODO: Implement actual Google Calendar API integration
    return [
        {
            "id": "event_001",
            "summary": "Team Meeting",
            "start": "2024-12-15T14:00:00",
            "end": "2024-12-15T15:00:00",
            "attendees": ["team@example.com"]
        }
    ]

@tool
def create_calendar_event(summary: str, start_time: str, end_time: str, 
                         attendees: list[str] = None, description: str = None) -> dict:
    """
    Create a Google Calendar event
    
    Args:
        summary: Event title
        start_time: Start time (ISO format)
        end_time: End time (ISO format)
        attendees: List of attendee emails
        description: Event description
    
    Returns:
        Created event details
    """
    # TODO: Implement actual Google Calendar API integration
    return {
        "status": "created",
        "event_id": "event_new_001",
        "summary": summary,
        "start": start_time,
        "link": "https://calendar.google.com/event?eid=..."
    }

@tool
def find_free_time(duration_minutes: int, start_date: str, end_date: str) -> list[dict]:
    """
    Find free time slots in calendar

    Args:
        duration_minutes: Required duration in minutes
        start_date: Search start date (YYYY-MM-DD)
        end_date: Search end date (YYYY-MM-DD)

    Returns:
        List of available time slots
    """
    # TODO: Implement actual free/busy lookup
    return [
        {
            "start": "2024-12-15T10:00:00",
            "end": "2024-12-15T11:00:00",
            "duration_minutes": duration_minutes
        },
        {
            "start": "2024-12-15T15:00:00",
            "end": "2024-12-15T16:00:00",
            "duration_minutes": duration_minutes
        }
    ]

# ============================================
# DOCUMENT AGENT TOOLS
# ============================================

@tool
def create_google_doc(title: str, content: str) -> dict:
    """
    Create a new Google Doc

    Args:
        title: Document title
        content: Document content (supports Persian text)

    Returns:
        Created document details
    """
    # TODO: Implement actual Google Docs API integration
    return {
        "status": "created",
        "doc_id": "doc_001",
        "title": title,
        "url": "https://docs.google.com/document/d/...",
        "word_count": len(content.split())
    }

@tool
def search_google_docs(query: str) -> list[dict]:
    """
    Search Google Docs

    Args:
        query: Search query

    Returns:
        List of matching documents
    """
    # TODO: Implement actual Google Drive API integration
    return [
        {
            "id": "doc_001",
            "title": "Q3 Business Proposal",
            "modified": "2024-12-10",
            "url": "https://docs.google.com/document/d/..."
        }
    ]

@tool
def update_google_doc(doc_id: str, content: str, append: bool = False) -> dict:
    """
    Update a Google Doc

    Args:
        doc_id: Document ID
        content: New content
        append: If True, append to existing content; if False, replace

    Returns:
        Update status
    """
    # TODO: Implement actual Google Docs API integration
    return {
        "status": "updated",
        "doc_id": doc_id,
        "operation": "append" if append else "replace",
        "word_count": len(content.split())
    }

# ============================================
# FINANCIAL AGENT TOOLS
# ============================================

@tool
def track_expense(amount: float, category: str, description: str, date: str = None) -> dict:
    """
    Track an expense

    Args:
        amount: Expense amount (in Rial or USD)
        category: Expense category (e.g., "Travel", "Software", "Marketing")
        description: Expense description
        date: Date of expense (YYYY-MM-DD), defaults to today

    Returns:
        Tracked expense details
    """
    # TODO: Implement actual expense tracking (database or Google Sheets)
    if date is None:
        date = datetime.now().strftime("%Y-%m-%d")

    return {
        "status": "tracked",
        "expense_id": "exp_001",
        "amount": amount,
        "category": category,
        "date": date,
        "description": description
    }

@tool
def generate_invoice(client_name: str, items: list[dict], due_date: str) -> dict:
    """
    Generate an invoice

    Args:
        client_name: Client name
        items: List of invoice items [{"description": "...", "amount": 1000}]
        due_date: Payment due date (YYYY-MM-DD)

    Returns:
        Generated invoice details
    """
    # TODO: Implement actual invoice generation
    total = sum(item["amount"] for item in items)

    return {
        "status": "generated",
        "invoice_id": "inv_001",
        "client": client_name,
        "total": total,
        "due_date": due_date,
        "pdf_url": "https://example.com/invoices/inv_001.pdf"
    }

@tool
def get_budget_summary(start_date: str, end_date: str) -> dict:
    """
    Get budget summary for a date range

    Args:
        start_date: Start date (YYYY-MM-DD)
        end_date: End date (YYYY-MM-DD)

    Returns:
        Budget summary with expenses by category
    """
    # TODO: Implement actual budget tracking
    return {
        "period": f"{start_date} to {end_date}",
        "total_expenses": 15000000,  # Rial
        "by_category": {
            "Software": 5000000,
            "Marketing": 7000000,
            "Travel": 3000000
        },
        "budget_remaining": 10000000
    }

# ============================================
# MEETING AGENT TOOLS
# ============================================

@tool
def transcribe_audio(audio_url: str, language: str = "fa") -> dict:
    """
    Transcribe audio/video recording

    Args:
        audio_url: URL or path to audio file
        language: Language code ("fa" for Persian, "en" for English)

    Returns:
        Transcription result
    """
    # TODO: Implement actual transcription (Whisper API or similar)
    return {
        "status": "transcribed",
        "transcript": "This is a sample transcription of the meeting...",
        "language": language,
        "duration_seconds": 1800,
        "word_count": 500
    }

@tool
def extract_action_items(transcript: str) -> list[dict]:
    """
    Extract action items from meeting transcript

    Args:
        transcript: Meeting transcript text

    Returns:
        List of action items with assignees and deadlines
    """
    # TODO: Implement actual action item extraction using LLM
    return [
        {
            "action": "Follow up with client on proposal",
            "assignee": "Ali",
            "deadline": "2024-12-20",
            "priority": "high"
        },
        {
            "action": "Update project timeline",
            "assignee": "Sara",
            "deadline": "2024-12-18",
            "priority": "medium"
        }
    ]

@tool
def summarize_meeting(transcript: str) -> dict:
    """
    Generate meeting summary

    Args:
        transcript: Meeting transcript text

    Returns:
        Meeting summary with key points and decisions
    """
    # TODO: Implement actual summarization using LLM
    return {
        "summary": "Team discussed Q4 goals and project timeline. Decided to prioritize feature X.",
        "key_points": [
            "Q4 revenue target: $500K",
            "Feature X launch date: Jan 15",
            "Hiring 2 new developers"
        ],
        "decisions": [
            "Approved budget increase for marketing",
            "Postponed feature Y to Q1 2025"
        ],
        "attendees": ["Ali", "Sara", "Mohammad"]
    }

# ============================================
# AGENT IMPLEMENTATIONS
# ============================================

# Tool collections for each agent
EMAIL_TOOLS = [search_gmail, draft_email, send_email, get_jalali_date, get_persian_time_context]
CALENDAR_TOOLS = [search_calendar, create_calendar_event, find_free_time, get_jalali_date, get_persian_time_context]
DOCUMENT_TOOLS = [create_google_doc, search_google_docs, update_google_doc, get_jalali_date, get_persian_time_context]
FINANCIAL_TOOLS = [track_expense, generate_invoice, get_budget_summary, get_jalali_date, get_persian_time_context]
MEETING_TOOLS = [transcribe_audio, extract_action_items, summarize_meeting, get_jalali_date, get_persian_time_context]

def create_workflow_agent(agent_type: str, tools: list, system_prompt: str):
    """
    Create a workflow agent with tools

    Args:
        agent_type: Type of agent (email, calendar, etc.)
        tools: List of tools available to the agent
        system_prompt: System prompt for the agent

    Returns:
        Compiled LangGraph workflow
    """

    # Initialize LLM with tools
    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=0.3,
        api_key=os.getenv("OPENAI_API_KEY")
    ).bind_tools(tools)

    def agent_node(state: WorkflowState) -> dict:
        """Main agent reasoning node"""
        messages = state["messages"]

        # Add system prompt if first message
        if len(messages) == 0:
            messages = [
                HumanMessage(content=system_prompt),
                HumanMessage(content=state["query"])
            ]

        # Get response from LLM
        response = llm.invoke(messages)

        return {
            "messages": [response]
        }

    def tool_node(state: WorkflowState) -> dict:
        """Execute tools"""
        messages = state["messages"]
        last_message = messages[-1]

        tool_results = []

        # Execute tool calls
        if hasattr(last_message, "tool_calls") and last_message.tool_calls:
            for tool_call in last_message.tool_calls:
                tool_name = tool_call["name"]
                tool_args = tool_call["args"]

                # Find and execute tool
                tool_func = next((t for t in tools if t.name == tool_name), None)
                if tool_func:
                    try:
                        result = tool_func.invoke(tool_args)
                        tool_results.append(ToolMessage(
                            content=str(result),
                            tool_call_id=tool_call["id"]
                        ))
                    except Exception as e:
                        tool_results.append(ToolMessage(
                            content=f"Error: {str(e)}",
                            tool_call_id=tool_call["id"]
                        ))

        return {
            "messages": tool_results
        }

    def should_continue(state: WorkflowState) -> str:
        """Decide whether to continue or end"""
        messages = state["messages"]
        last_message = messages[-1]

        # If there are tool calls, continue to tool execution
        if hasattr(last_message, "tool_calls") and last_message.tool_calls:
            return "tools"

        # Otherwise, end
        return "end"

    # Build graph
    workflow = StateGraph(WorkflowState)

    # Add nodes
    workflow.add_node("agent", agent_node)
    workflow.add_node("tools", tool_node)

    # Set entry point
    workflow.set_entry_point("agent")

    # Add conditional edges
    workflow.add_conditional_edges(
        "agent",
        should_continue,
        {
            "tools": "tools",
            "end": END
        }
    )

    # After tools, go back to agent
    workflow.add_edge("tools", "agent")

    # Compile
    return workflow.compile()

# ============================================
# CREATE AGENTS
# ============================================

EMAIL_AGENT_PROMPT = """You are an Email Management Agent for a Persian business advisor system.

Your capabilities:
- Search Gmail messages
- Draft professional emails (Persian and English)
- Send emails
- Summarize email threads

Context awareness:
- Use Jalali dates when relevant
- Follow Persian business etiquette
- Be concise and professional

Always confirm before sending emails."""

CALENDAR_AGENT_PROMPT = """You are a Calendar Management Agent for a Persian business advisor system.

Your capabilities:
- Search calendar events
- Create new events
- Find free time slots
- Manage scheduling

Context awareness:
- Use Jalali dates when relevant
- Consider Iranian weekends (Friday)
- Respect business hours (9 AM - 6 PM Tehran time)

Always confirm event details before creating."""

DOCUMENT_AGENT_PROMPT = """You are a Document Management Agent for a Persian business advisor system.

Your capabilities:
- Create Google Docs
- Search documents
- Update existing documents
- Support Persian text

Context awareness:
- Use Jalali dates in documents
- Follow Persian business document formats
- Maintain professional tone

Always confirm before making changes."""

FINANCIAL_AGENT_PROMPT = """You are a Financial Management Agent for a Persian business advisor system.

Your capabilities:
- Track expenses
- Generate invoices
- Provide budget summaries
- Support Rial and USD

Context awareness:
- Use Jalali fiscal year (starts Farvardin 1)
- Consider Iranian tax regulations
- Format numbers with Persian separators when appropriate

Always confirm financial transactions."""

MEETING_AGENT_PROMPT = """You are a Meeting Management Agent for a Persian business advisor system.

Your capabilities:
- Transcribe audio/video recordings
- Extract action items
- Generate meeting summaries
- Support Persian and English

Context awareness:
- Use Jalali dates for deadlines
- Identify Persian names correctly
- Follow Iranian business meeting formats

Always provide structured output."""

# Create agent instances
email_agent = create_workflow_agent("email", EMAIL_TOOLS, EMAIL_AGENT_PROMPT)
calendar_agent = create_workflow_agent("calendar", CALENDAR_TOOLS, CALENDAR_AGENT_PROMPT)
document_agent = create_workflow_agent("document", DOCUMENT_TOOLS, DOCUMENT_AGENT_PROMPT)
financial_agent = create_workflow_agent("financial", FINANCIAL_TOOLS, FINANCIAL_AGENT_PROMPT)
meeting_agent = create_workflow_agent("meeting", MEETING_TOOLS, MEETING_AGENT_PROMPT)

# ============================================
# HELPER FUNCTION
# ============================================

def run_workflow_agent(agent_type: str, query: str, user_id: str = "default") -> dict:
    """
    Run a workflow agent

    Args:
        agent_type: Type of agent (email, calendar, document, financial, meeting)
        query: User query
        user_id: User ID

    Returns:
        Agent result
    """
    agent_map = {
        "email": email_agent,
        "calendar": calendar_agent,
        "document": document_agent,
        "financial": financial_agent,
        "meeting": meeting_agent
    }

    agent = agent_map.get(agent_type)
    if not agent:
        return {"status": "error", "result": f"Unknown agent type: {agent_type}"}

    # Run agent
    result = agent.invoke({
        "query": query,
        "user_id": user_id,
        "messages": [],
        "tool_calls": [],
        "result": "",
        "status": "pending",
        "agent_type": agent_type,
        "start_time": datetime.now().timestamp(),
        "end_time": 0
    })

    # Extract final response
    final_message = result["messages"][-1]
    if hasattr(final_message, "content"):
        response_text = final_message.content
    else:
        response_text = str(final_message)

    return {
        "status": "success",
        "result": response_text,
        "agent_type": agent_type,
        "tool_calls": len([m for m in result["messages"] if isinstance(m, ToolMessage)])
    }

# ============================================
# DEMO
# ============================================

if __name__ == "__main__":
    from rich.console import Console
    from rich.panel import Panel
    from rich.table import Table

    console = Console()

    console.print(Panel.fit(
        "[bold cyan]Workflow Agents - Single-Agent Tool Systems[/bold cyan]\n"
        "[dim]Email | Calendar | Document | Financial | Meeting[/dim]",
        border_style="cyan"
    ))

    # Test queries for each agent
    test_cases = [
        ("email", "Draft a response to client@example.com thanking them for their inquiry"),
        ("calendar", "Find free time slots next week for a 1-hour meeting"),
        ("document", "Create a proposal document for a new software project"),
        ("financial", "Track an expense of 5000000 Rial for marketing"),
        ("meeting", "Extract action items from: 'Ali will follow up with client by Friday. Sara will update the timeline.'")
    ]

    table = Table(title="Workflow Agent Test Results")
    table.add_column("Agent", style="cyan")
    table.add_column("Query", style="yellow", width=40)
    table.add_column("Status", style="green")
    table.add_column("Tool Calls", style="magenta")

    for agent_type, query in test_cases:
        try:
            result = run_workflow_agent(agent_type, query)
            table.add_row(
                agent_type.title(),
                query[:37] + "..." if len(query) > 40 else query,
                result["status"],
                str(result.get("tool_calls", 0))
            )
        except Exception as e:
            table.add_row(
                agent_type.title(),
                query[:37] + "..." if len(query) > 40 else query,
                "error",
                str(e)[:20]
            )

    console.print("\n")
    console.print(table)
    console.print("\n[dim]✓ Workflow agents initialized[/dim]")
    console.print("[dim]Note: Add API keys to .env for full functionality[/dim]\n")

