"""
AI-EOS Persian Business Advisor - Main Integration
Combines Router + Debate System + Workflow Agents

Usage:
    python src/main.py "Should we expand to Dubai market?"
    python src/main.py "Draft email to client@example.com"
    python src/main.py "Schedule meeting next Tuesday"
"""

import sys
import os
from typing import Dict, Any
from datetime import datetime

# Add src to path
sys.path.insert(0, os.path.dirname(__file__))

from agents.router import route_query
from agents.debate_system import graph as debate_graph, get_persian_context
from agents.workflow_agents import run_workflow_agent

from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.markdown import Markdown

console = Console()

# ============================================
# MAIN ORCHESTRATOR
# ============================================

def process_query(query: str, user_id: str = "default") -> Dict[str, Any]:
    """
    Main orchestrator: Route query and execute appropriate system
    
    Args:
        query: User query
        user_id: User ID for personalization
    
    Returns:
        Result dictionary with response and metadata
    """
    
    console.print(Panel.fit(
        f"[bold cyan]Processing Query[/bold cyan]\n[dim]{query}[/dim]",
        border_style="cyan"
    ))
    
    # Step 1: Route query
    console.print("\n[yellow]Step 1: Routing query...[/yellow]")
    routing_result = route_query(query, user_id)
    
    console.print(f"[green]✓ Classified as:[/green] {routing_result['task_type']}")
    console.print(f"[green]✓ Routing to:[/green] {routing_result['route_to']}")
    console.print(f"[green]✓ Confidence:[/green] {routing_result['confidence']:.0%}")
    console.print(f"[dim]  Reasoning: {routing_result['reasoning']}[/dim]\n")
    
    # Step 2: Execute appropriate system
    route_to = routing_result['route_to']
    start_time = datetime.now()
    
    if route_to == "debate_system":
        console.print("[yellow]Step 2: Running multi-agent debate...[/yellow]")
        result = run_debate_system(query, user_id)
    
    elif route_to in ["email_agent", "calendar_agent", "document_agent", 
                      "financial_agent", "meeting_agent"]:
        agent_type = route_to.replace("_agent", "")
        console.print(f"[yellow]Step 2: Running {agent_type} workflow agent...[/yellow]")
        result = run_workflow_agent(agent_type, query, user_id)
    
    elif route_to == "simple_llm":
        console.print("[yellow]Step 2: Getting simple LLM response...[/yellow]")
        result = run_simple_llm(query)
    
    else:
        result = {
            "status": "error",
            "result": f"Unknown route: {route_to}"
        }
    
    end_time = datetime.now()
    duration = (end_time - start_time).total_seconds()
    
    # Step 3: Display result
    console.print(f"\n[green]✓ Completed in {duration:.1f}s[/green]\n")
    
    return {
        "query": query,
        "routing": routing_result,
        "result": result,
        "duration": duration,
        "timestamp": datetime.now().isoformat()
    }

# ============================================
# SYSTEM EXECUTORS
# ============================================

def run_debate_system(query: str, user_id: str) -> Dict[str, Any]:
    """Run multi-agent debate system"""
    try:
        persian_context = get_persian_context(user_id)
        
        result = debate_graph.invoke({
            "question": query,
            "user_id": user_id,
            "round": 1,
            "max_rounds": 2,
            "messages": [],
            "persian_context": persian_context,
            "start_time": datetime.now().timestamp()
        })
        
        # Display debate results
        table = Table(title="Debate Metrics")
        table.add_column("Agent", style="cyan")
        table.add_column("Model", style="green")
        table.add_column("Confidence", style="yellow")
        
        table.add_row("Analyst", result.get('analyst_model', ''), f"{result.get('analyst_confidence', 0):.0%}")
        table.add_row("Strategist", result.get('strategist_model', ''), f"{result.get('strategist_confidence', 0):.0%}")
        table.add_row("Critic", result.get('critic_model', ''), f"{result.get('critic_confidence', 0):.0%}")
        
        console.print(table)
        console.print(f"\n[bold]Calibrated Consensus:[/bold] {result.get('consensus', 0):.0%}")
        console.print(f"[bold]Recommendation:[/bold] {result.get('recommendation_type', 'UNKNOWN')}")
        
        console.print(Panel(
            result.get('final_decision', ''),
            title="Final Decision",
            border_style="yellow"
        ))
        
        return {
            "status": "success",
            "result": result.get('final_decision', ''),
            "consensus": result.get('consensus', 0),
            "recommendation_type": result.get('recommendation_type', ''),
            "rounds": result.get('round', 0)
        }
    
    except Exception as e:
        console.print(f"[red]Error in debate system: {str(e)}[/red]")
        return {
            "status": "error",
            "result": str(e)
        }

def run_simple_llm(query: str) -> Dict[str, Any]:
    """Run simple LLM for quick queries"""
    try:
        from langchain_openai import ChatOpenAI
        from langchain_core.messages import HumanMessage
        
        llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)
        response = llm.invoke([HumanMessage(content=query)])
        
        console.print(Panel(
            response.content,
            title="Response",
            border_style="green"
        ))
        
        return {
            "status": "success",
            "result": response.content
        }
    
    except Exception as e:
        console.print(f"[red]Error in simple LLM: {str(e)}[/red]")
        return {
            "status": "error",
            "result": str(e)
        }

# ============================================
# CLI INTERFACE
# ============================================

def main():
    """Main CLI interface"""
    console.print(Panel.fit(
        "[bold cyan]AI-EOS Persian Business Advisor[/bold cyan]\n"
        "[dim]Multi-Agent System with Intelligent Routing[/dim]\n"
        "[dim]Debate System | Workflow Agents | Simple LLM[/dim]",
        border_style="cyan"
    ))
    
    # Get query from command line or prompt
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
    else:
        console.print("\n[yellow]Enter your query (or 'quit' to exit):[/yellow]")
        query = input("> ")
        
        if query.lower() in ["quit", "exit", "q"]:
            console.print("[dim]Goodbye![/dim]")
            return
    
    # Process query
    result = process_query(query)
    
    # Save to history (optional)
    # TODO: Implement conversation history

if __name__ == "__main__":
    main()

