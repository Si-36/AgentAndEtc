"""
Simple test script for debate system
Tests the graph structure without requiring API keys
"""

import sys
import os

# Add src to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from rich.console import Console
from rich.panel import Panel

console = Console()

console.print(Panel.fit(
    "[bold cyan]Testing Multi-Agent Debate System[/bold cyan]\n"
    "[dim]Checking imports and graph structure...[/dim]",
    border_style="cyan"
))

try:
    console.print("\n[yellow]1. Importing debate_system module...[/yellow]")
    from agents import debate_system
    console.print("[green]✓ Import successful[/green]")
    
    console.print("\n[yellow]2. Checking graph compilation...[/yellow]")
    assert hasattr(debate_system, 'graph'), "Graph not found"
    console.print("[green]✓ Graph compiled successfully[/green]")
    
    console.print("\n[yellow]3. Checking state schema...[/yellow]")
    assert hasattr(debate_system, 'DebateState'), "DebateState not found"
    console.print("[green]✓ DebateState schema defined[/green]")
    
    console.print("\n[yellow]4. Checking agent nodes...[/yellow]")
    nodes = ['analyst_node', 'strategist_node', 'critic_node', 'consensus_node', 'arbiter_node']
    for node in nodes:
        assert hasattr(debate_system, node), f"{node} not found"
        console.print(f"[green]  ✓ {node} defined[/green]")
    
    console.print("\n[yellow]5. Checking ConfMAD calibrator...[/yellow]")
    assert hasattr(debate_system, 'ConfMADCalibrator'), "ConfMADCalibrator not found"
    console.print("[green]✓ ConfMADCalibrator defined[/green]")
    
    console.print("\n[yellow]6. Checking Persian context function...[/yellow]")
    assert hasattr(debate_system, 'get_persian_context'), "get_persian_context not found"
    persian_ctx = debate_system.get_persian_context()
    assert 'current_date_jalali' in persian_ctx
    console.print(f"[green]✓ Persian context working[/green]")
    console.print(f"[dim]  Current Jalali date: {persian_ctx['current_date_jalali']}[/dim]")
    console.print(f"[dim]  Fiscal year: {persian_ctx['fiscal_year']}[/dim]")
    console.print(f"[dim]  Quarter: {persian_ctx['quarter']}[/dim]")
    
    console.print("\n[bold green]✅ All structural tests passed![/bold green]")
    console.print("\n[dim]Note: To run full debate, add API keys to .env file:[/dim]")
    console.print("[dim]  - GEMINI_API_KEY (get from ai.google.dev)[/dim]")
    console.print("[dim]  - ANTHROPIC_API_KEY (get from console.anthropic.com)[/dim]")
    console.print("[dim]  - LANGCHAIN_API_KEY (get from smith.langchain.com)[/dim]")
    
except Exception as e:
    console.print(f"\n[bold red]❌ Test failed:[/bold red] {str(e)}")
    import traceback
    console.print(f"[dim]{traceback.format_exc()}[/dim]")
    sys.exit(1)

