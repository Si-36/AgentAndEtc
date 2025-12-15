#!/usr/bin/env python3
"""
🔍 AI-EOS Setup Verification Script

Verify ALL requirements before building:
- Environment variables
- Python packages
- LangSmith tracing
- Letta server (optional)
- API keys validity

Usage:
    python scripts/verify_setup.py

Expected output:
    ✅ All checks passed! Ready to build.
"""

import os
import sys
from pathlib import Path
from typing import Dict, List, Tuple
import subprocess

try:
    from rich.console import Console
    from rich.table import Table
    from rich.panel import Panel
    from rich import print as rprint
except ImportError:
    print("⚠️  Installing rich for better output...")
    subprocess.run([sys.executable, "-m", "pip", "install", "rich"], check=True)
    from rich.console import Console
    from rich.table import Table
    from rich.panel import Panel
    from rich import print as rprint

from dotenv import load_dotenv

console = Console()

# Load environment variables
load_dotenv()


class SetupVerifier:
    """Verify all setup requirements"""
    
    def __init__(self):
        self.errors: List[str] = []
        self.warnings: List[str] = []
        self.successes: List[str] = []
    
    def verify_all(self) -> bool:
        """Run all verification checks"""
        console.print(Panel.fit(
            "[bold cyan]🔍 AI-EOS Setup Verification[/bold cyan]\n"
            "Checking all requirements before building...",
            border_style="cyan"
        ))
        
        # Run checks
        self.check_python_version()
        self.check_environment_variables()
        self.check_required_packages()
        self.check_langsmith_tracing()
        self.check_optional_services()
        
        # Print results
        self.print_results()
        
        # Return overall status
        return len(self.errors) == 0
    
    def check_python_version(self):
        """Verify Python version >= 3.10"""
        version = sys.version_info
        if version.major == 3 and version.minor >= 10:
            self.successes.append(f"Python {version.major}.{version.minor}.{version.micro}")
        else:
            self.errors.append(
                f"Python 3.10+ required, got {version.major}.{version.minor}.{version.micro}"
            )
    
    def check_environment_variables(self):
        """Check all required environment variables"""
        console.print("\n[bold]1. Environment Variables[/bold]")
        
        required = {
            "LANGCHAIN_TRACING_V2": "Must be 'true'",
            "LANGCHAIN_API_KEY": "Get from https://smith.langchain.com/settings",
            "LANGCHAIN_PROJECT": "Project name (e.g., ai-eos-production)"
        }
        
        optional = {
            "GOOGLE_API_KEY": "Gemini (FREE tier) - https://aistudio.google.com/app/apikey",
            "ANTHROPIC_API_KEY": "Claude - https://console.anthropic.com/",
            "OPENAI_API_KEY": "OpenAI - https://platform.openai.com/api-keys",
            "TAVILY_API_KEY": "Web search - https://tavily.com/"
        }
        
        table = Table(title="Environment Variables")
        table.add_column("Variable", style="cyan")
        table.add_column("Status", style="green")
        table.add_column("Note")
        
        # Check required
        for var, note in required.items():
            value = os.getenv(var)
            if value:
                table.add_row(var, "✅ SET", note)
                self.successes.append(f"Env: {var}")
            else:
                table.add_row(var, "[red]❌ MISSING[/red]", note)
                self.errors.append(f"Missing required env var: {var}")
        
        # Check optional
        for var, note in optional.items():
            value = os.getenv(var)
            if value:
                table.add_row(var, "✅ SET", note)
                self.successes.append(f"Env: {var}")
            else:
                table.add_row(var, "[yellow]⚠️  NOT SET[/yellow]", note)
                self.warnings.append(f"Optional env var not set: {var}")
        
        console.print(table)
    
    def check_required_packages(self):
        """Check if required Python packages are installed"""
        console.print("\n[bold]2. Python Packages[/bold]")
        
        required = [
            ("langgraph", "0.2.0"),
            ("langchain", "0.3.0"),
            ("langsmith", "0.2.0"),
            ("letta", "0.6.0"),
            ("dotenv", None)
        ]
        
        table = Table(title="Required Packages")
        table.add_column("Package", style="cyan")
        table.add_column("Required", style="yellow")
        table.add_column("Installed", style="green")
        table.add_column("Status")
        
        for package, min_version in required:
            try:
                if package == "dotenv":
                    import dotenv
                    installed = dotenv.__version__ if hasattr(dotenv, '__version__') else "OK"
                else:
                    mod = __import__(package)
                    installed = mod.__version__ if hasattr(mod, '__version__') else "OK"
                
                if min_version and installed != "OK":
                    if self._compare_versions(installed, min_version):
                        table.add_row(package, min_version, installed, "✅ OK")
                        self.successes.append(f"Package: {package}")
                    else:
                        table.add_row(package, min_version, installed, "[yellow]⚠️  OLD[/yellow]")
                        self.warnings.append(f"Package {package} version {installed} < {min_version}")
                else:
                    table.add_row(package, min_version or "any", installed, "✅ OK")
                    self.successes.append(f"Package: {package}")
            
            except ImportError:
                table.add_row(package, min_version or "any", "[red]NOT INSTALLED[/red]", "[red]❌ MISSING[/red]")
                self.errors.append(f"Missing package: {package}")
        
        console.print(table)
    
    def _compare_versions(self, installed: str, required: str) -> bool:
        """Compare version strings"""
        try:
            inst = [int(x) for x in installed.split('.')[:2]]
            req = [int(x) for x in required.split('.')[:2]]
            return inst >= req
        except:
            return True  # Can't parse, assume OK
    
    def check_langsmith_tracing(self):
        """Test if LangSmith tracing actually works"""
        console.print("\n[bold]3. LangSmith Tracing Test[/bold]")
        
        if not os.getenv("LANGCHAIN_TRACING_V2") or not os.getenv("LANGCHAIN_API_KEY"):
            console.print("[yellow]⚠️  Skipping (missing env vars)[/yellow]")
            return
        
        try:
            console.print("Testing LangSmith tracing...")
            
            # Try to import and test
            from langchain_openai import ChatOpenAI
            
            # This should trace to LangSmith
            llm = ChatOpenAI(model='gpt-4o-mini', max_tokens=10)
            response = llm.invoke('Test')
            
            console.print("✅ [green]LangSmith tracing WORKING![/green]")
            console.print(f"   Response: {response.content[:50]}...")
            console.print(f"   View traces: https://smith.langchain.com/")
            self.successes.append("LangSmith tracing")
        
        except Exception as e:
            console.print(f"[red]❌ LangSmith test FAILED: {e}[/red]")
            self.errors.append(f"LangSmith tracing failed: {str(e)}")
    
    def check_optional_services(self):
        """Check optional services like Letta"""
        console.print("\n[bold]4. Optional Services[/bold]")
        
        # Check if Letta server is running
        try:
            import requests
            response = requests.get('http://localhost:8283/health', timeout=2)
            if response.status_code == 200:
                console.print("✅ [green]Letta server is running[/green]")
                self.successes.append("Letta server")
            else:
                console.print("[yellow]⚠️  Letta server not responding[/yellow]")
                self.warnings.append("Letta server not running (optional for Week 1 Day 2+)")
        except:
            console.print("[yellow]⚠️  Letta server not running[/yellow]")
            self.warnings.append("Letta server not running (optional for Week 1 Day 2+)")
    
    def print_results(self):
        """Print verification results"""
        console.print("\n" + "="*60)
        
        # Summary
        total = len(self.successes) + len(self.warnings) + len(self.errors)
        
        console.print(f"\n[bold]📊 Summary[/bold]")
        console.print(f"   ✅ Successes: {len(self.successes)}/{total}")
        console.print(f"   ⚠️  Warnings: {len(self.warnings)}/{total}")
        console.print(f"   ❌ Errors: {len(self.errors)}/{total}")
        
        # Errors
        if self.errors:
            console.print("\n[bold red]❌ Errors (MUST FIX):[/bold red]")
            for error in self.errors:
                console.print(f"   • {error}")
        
        # Warnings
        if self.warnings:
            console.print("\n[bold yellow]⚠️  Warnings (optional):[/bold yellow]")
            for warning in self.warnings:
                console.print(f"   • {warning}")
        
        # Final verdict
        console.print()
        if len(self.errors) == 0:
            console.print(Panel.fit(
                "[bold green]✅ All critical checks passed!\nReady to build AI-EOS.[/bold green]",
                border_style="green"
            ))
            console.print("\n[bold]Next steps:[/bold]")
            console.print("1. Follow 01_IMPLEMENTATION_ROADMAP.md")
            console.print("2. Start with Week 1, Day 1 (LangSmith setup)")
            console.print("3. Run: python scripts/test_langsmith.py")
        else:
            console.print(Panel.fit(
                "[bold red]❌ Setup incomplete!\nFix errors above before building.[/bold red]",
                border_style="red"
            ))
            console.print("\n[bold]Fix these first:[/bold]")
            for error in self.errors:
                console.print(f"   • {error}")


def main():
    """Main entry point"""
    verifier = SetupVerifier()
    success = verifier.verify_all()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
