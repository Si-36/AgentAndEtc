"""
Business Memory System - The Competitive Moat

This is what makes your system valuable:
- Learns from past decisions
- Remembers stakeholder preferences
- Tracks project context
- Builds institutional knowledge

Your friend's insight: "Intelligence that learns > stateless automation"
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from pathlib import Path

# ============================================
# DATA MODELS
# ============================================

@dataclass
class Project:
    """A business project or initiative"""
    id: str
    name: str
    description: str
    status: str  # "active", "completed", "cancelled"
    start_date: str
    end_date: Optional[str]
    budget: float
    stakeholders: List[str]
    decisions: List[str]  # Decision IDs
    metadata: Dict[str, Any]

@dataclass
class Stakeholder:
    """A person or entity in the business"""
    id: str
    name: str
    role: str
    preferences: Dict[str, Any]
    communication_style: str  # "formal", "informal"
    language: str  # "fa", "en"
    projects: List[str]  # Project IDs
    metadata: Dict[str, Any]

@dataclass
class Decision:
    """A strategic decision made by the system"""
    id: str
    timestamp: str
    question: str
    decision: str
    confidence: float
    reasoning: str
    agents_involved: List[str]
    outcome: Optional[str]  # "success", "failed", "pending"
    roi: Optional[float]
    lessons_learned: Optional[str]
    metadata: Dict[str, Any]

@dataclass
class Conversation:
    """A conversation thread"""
    id: str
    timestamp: str
    user_id: str
    messages: List[Dict[str, str]]
    decisions_made: List[str]  # Decision IDs
    metadata: Dict[str, Any]

# ============================================
# BUSINESS MEMORY CLASS
# ============================================

class BusinessMemory:
    """
    Persistent business context and learning system
    
    This is your competitive moat:
    - Learns from past decisions
    - Remembers stakeholder preferences
    - Tracks project context
    - Builds institutional knowledge
    """
    
    def __init__(self, storage_path: str = "data/business_memory.json"):
        self.storage_path = storage_path
        
        # Core data structures
        self.projects: Dict[str, Project] = {}
        self.stakeholders: Dict[str, Stakeholder] = {}
        self.decisions: List[Decision] = []
        self.conversations: List[Conversation] = []
        
        # Metadata
        self.created_at: str = datetime.now().isoformat()
        self.last_updated: str = datetime.now().isoformat()
        
        # Load existing data if available
        if os.path.exists(storage_path):
            self.load()
    
    # ============================================
    # CORE OPERATIONS
    # ============================================
    
    def add_project(self, project: Dict[str, Any]) -> str:
        """Add a new project"""
        project_id = project.get("id", f"proj_{len(self.projects) + 1}")
        
        self.projects[project_id] = Project(
            id=project_id,
            name=project["name"],
            description=project.get("description", ""),
            status=project.get("status", "active"),
            start_date=project.get("start_date", datetime.now().isoformat()),
            end_date=project.get("end_date"),
            budget=project.get("budget", 0.0),
            stakeholders=project.get("stakeholders", []),
            decisions=project.get("decisions", []),
            metadata=project.get("metadata", {})
        )
        
        self.save()
        return project_id
    
    def add_stakeholder(self, stakeholder: Dict[str, Any]) -> str:
        """Add a new stakeholder"""
        stakeholder_id = stakeholder.get("id", f"stake_{len(self.stakeholders) + 1}")
        
        self.stakeholders[stakeholder_id] = Stakeholder(
            id=stakeholder_id,
            name=stakeholder["name"],
            role=stakeholder.get("role", ""),
            preferences=stakeholder.get("preferences", {}),
            communication_style=stakeholder.get("communication_style", "formal"),
            language=stakeholder.get("language", "fa"),
            projects=stakeholder.get("projects", []),
            metadata=stakeholder.get("metadata", {})
        )
        
        self.save()
        return stakeholder_id
    
    def add_decision(self, decision: Dict[str, Any]) -> str:
        """Add a new decision (this is critical for learning)"""
        decision_id = decision.get("id", f"dec_{len(self.decisions) + 1}")
        
        self.decisions.append(Decision(
            id=decision_id,
            timestamp=decision.get("timestamp", datetime.now().isoformat()),
            question=decision["question"],
            decision=decision["decision"],
            confidence=decision.get("confidence", 0.0),
            reasoning=decision.get("reasoning", ""),
            agents_involved=decision.get("agents_involved", []),
            outcome=decision.get("outcome"),
            roi=decision.get("roi"),
            lessons_learned=decision.get("lessons_learned"),
            metadata=decision.get("metadata", {})
        ))
        
        self.save()
        return decision_id
    
    def add_conversation(self, conversation: Dict[str, Any]) -> str:
        """Add a conversation"""
        conversation_id = conversation.get("id", f"conv_{len(self.conversations) + 1}")
        
        self.conversations.append(Conversation(
            id=conversation_id,
            timestamp=conversation.get("timestamp", datetime.now().isoformat()),
            user_id=conversation.get("user_id", "default"),
            messages=conversation.get("messages", []),
            decisions_made=conversation.get("decisions_made", []),
            metadata=conversation.get("metadata", {})
        ))
        
        self.save()
        return conversation_id
    
    # ============================================
    # INTELLIGENCE OPERATIONS
    # ============================================
    
    def find_similar_decisions(self, question: str, limit: int = 5) -> List[Decision]:
        """Find similar past decisions (simple keyword matching for now)"""
        question_lower = question.lower()
        keywords = [word for word in question_lower.split() if len(word) > 4]
        
        scored_decisions = []
        for decision in self.decisions:
            decision_text = f"{decision.question} {decision.decision}".lower()
            score = sum(1 for keyword in keywords if keyword in decision_text)
            if score > 0:
                scored_decisions.append((score, decision))
        
        # Sort by score and return top N
        scored_decisions.sort(key=lambda x: x[0], reverse=True)
        return [decision for _, decision in scored_decisions[:limit]]
    
    def calculate_success_rate(self, decisions: List[Decision]) -> float:
        """Calculate success rate from past decisions"""
        if not decisions:
            return 0.5  # Neutral prior
        
        successful = sum(1 for d in decisions if d.outcome == "success")
        return successful / len(decisions)
    
    def get_context_for_query(self, query: str, user_id: str = "default") -> Dict[str, Any]:
        """Get relevant context for a query"""
        
        # Find similar decisions
        similar_decisions = self.find_similar_decisions(query)
        
        # Calculate success rate
        success_rate = self.calculate_success_rate(similar_decisions)
        
        # Get user's stakeholder info
        stakeholder = None
        for s in self.stakeholders.values():
            if s.id == user_id or s.name == user_id:
                stakeholder = s
                break
        
        # Get active projects
        active_projects = [p for p in self.projects.values() if p.status == "active"]
        
        return {
            "similar_decisions": [asdict(d) for d in similar_decisions],
            "success_rate": success_rate,
            "stakeholder": asdict(stakeholder) if stakeholder else None,
            "active_projects": [asdict(p) for p in active_projects],
            "total_decisions": len(self.decisions),
            "total_projects": len(self.projects)
        }
    
    # ============================================
    # PERSISTENCE
    # ============================================
    
    def save(self) -> None:
        """Save to JSON file"""
        # Create directory if needed
        Path(self.storage_path).parent.mkdir(parents=True, exist_ok=True)
        
        # Update timestamp
        self.last_updated = datetime.now().isoformat()
        
        # Serialize
        data = {
            "projects": {k: asdict(v) for k, v in self.projects.items()},
            "stakeholders": {k: asdict(v) for k, v in self.stakeholders.items()},
            "decisions": [asdict(d) for d in self.decisions],
            "conversations": [asdict(c) for c in self.conversations],
            "created_at": self.created_at,
            "last_updated": self.last_updated
        }
        
        # Write
        with open(self.storage_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    def load(self) -> None:
        """Load from JSON file"""
        with open(self.storage_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Deserialize
        self.projects = {k: Project(**v) for k, v in data.get("projects", {}).items()}
        self.stakeholders = {k: Stakeholder(**v) for k, v in data.get("stakeholders", {}).items()}
        self.decisions = [Decision(**d) for d in data.get("decisions", [])]
        self.conversations = [Conversation(**c) for c in data.get("conversations", [])]
        self.created_at = data.get("created_at", datetime.now().isoformat())
        self.last_updated = data.get("last_updated", datetime.now().isoformat())
    
    @classmethod
    def load_from_file(cls, storage_path: str = "data/business_memory.json") -> "BusinessMemory":
        """Load memory from file"""
        return cls(storage_path=storage_path)

# ============================================
# GLOBAL INSTANCE
# ============================================

BUSINESS_MEMORY = BusinessMemory()

# ============================================
# DEMO
# ============================================

if __name__ == "__main__":
    from rich.console import Console
    from rich.panel import Panel
    
    console = Console()
    
    console.print(Panel.fit(
        "[bold cyan]Business Memory System[/bold cyan]\n"
        "[dim]The Competitive Moat - Intelligence that Learns[/dim]",
        border_style="cyan"
    ))
    
    # Create test data
    memory = BusinessMemory(storage_path="data/test_memory.json")
    
    # Add a project
    memory.add_project({
        "name": "HiPet Launch",
        "description": "Pet education platform for Iranian market",
        "budget": 50000000,  # 50M Rial
        "stakeholders": ["sina"]
    })
    
    # Add a stakeholder
    memory.add_stakeholder({
        "name": "Sina",
        "role": "Founder",
        "preferences": {"risk_tolerance": "medium"},
        "communication_style": "informal",
        "language": "fa"
    })
    
    # Add decisions
    memory.add_decision({
        "question": "Should we expand to Turkey market?",
        "decision": "Yes, with pilot program first",
        "confidence": 0.75,
        "reasoning": "Market research shows demand, but test first",
        "outcome": "success",
        "roi": 0.42
    })
    
    memory.add_decision({
        "question": "Should we expand to Egypt market?",
        "decision": "Yes, full launch immediately",
        "confidence": 0.65,
        "reasoning": "Similar to Turkey",
        "outcome": "failed",
        "roi": -0.15,
        "lessons_learned": "Should have done pilot first, didn't understand local regulations"
    })
    
    # Test retrieval
    context = memory.get_context_for_query("Should we expand to Dubai market?")
    
    console.print("\n[yellow]Query:[/yellow] Should we expand to Dubai market?")
    console.print(f"\n[green]Similar decisions found:[/green] {len(context['similar_decisions'])}")
    console.print(f"[green]Success rate:[/green] {context['success_rate']:.0%}")
    
    for decision in context['similar_decisions']:
        console.print(f"\n[cyan]Past decision:[/cyan] {decision['question']}")
        console.print(f"[dim]Outcome: {decision['outcome']}, ROI: {decision.get('roi', 'N/A')}[/dim]")
    
    console.print("\n[bold green]✅ Memory system working![/bold green]\n")

