"""
AI-EOS Configuration
Centralized configuration management
"""

from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    """Application settings"""

    # Database
    database_url: str
    redis_url: str = "redis://localhost:6379/0"

    # LLM APIs
    gemini_api_key: str
    anthropic_api_key: str
    openai_api_key: str

    # Google Services
    google_application_credentials: Optional[str] = None
    gmail_credentials_path: Optional[str] = None

    # Voice & Communication
    twilio_account_sid: Optional[str] = None
    twilio_auth_token: Optional[str] = None
    telegram_bot_token: Optional[str] = None
    whatsapp_business_api_key: Optional[str] = None

    # Storage
    s3_bucket: str = "ai-eos-artifacts"
    s3_region: str = "us-east-1"
    aws_access_key_id: Optional[str] = None
    aws_secret_access_key: Optional[str] = None

    # Monitoring
    sentry_dsn: Optional[str] = None

    # Application
    environment: str = "development"
    log_level: str = "INFO"
    secret_key: str

    # Feature Flags
    enable_multi_agent: bool = True
    enable_rl_training: bool = True
    enable_voice: bool = False

    # LLM Routing (percentages)
    gemini_flash_percentage: float = 0.80
    claude_sonnet_percentage: float = 0.05
    claude_opus_percentage: float = 0.15

    # Context Engineering
    max_working_context_tokens: int = 20000
    session_history_limit: int = 20  # Last N messages
    core_memory_max_bytes: int = 2048

    # Memory Lifecycle
    session_archive_days: int = 90

    # Costs (USD per 1M tokens)
    gemini_flash_cost_per_1m: float = 0.01  # After FREE tier
    claude_sonnet_input_cost: float = 3.0
    claude_sonnet_output_cost: float = 15.0
    claude_opus_input_cost: float = 15.0
    claude_opus_output_cost: float = 75.0
    openai_embedding_cost: float = 0.02

    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()


# Model configurations
LLM_MODELS = {
    "gemini-2.0-flash": {
        "provider": "google",
        "model_id": "gemini-2.0-flash-exp",
        "cost_per_1m_input": settings.gemini_flash_cost_per_1m,
        "cost_per_1m_output": settings.gemini_flash_cost_per_1m,
        "context_window": 1000000,  # 1M tokens
        "supports_multimodal": True,
        "supports_json_mode": True,
    },
    "claude-sonnet-4-5": {
        "provider": "anthropic",
        "model_id": "claude-sonnet-4-5-20250929",
        "cost_per_1m_input": settings.claude_sonnet_input_cost,
        "cost_per_1m_output": settings.claude_sonnet_output_cost,
        "context_window": 200000,
        "supports_multimodal": True,
        "supports_json_mode": False,
    },
    "claude-opus-4-5": {
        "provider": "anthropic",
        "model_id": "claude-opus-4-5-20251101",
        "cost_per_1m_input": settings.claude_opus_input_cost,
        "cost_per_1m_output": settings.claude_opus_output_cost,
        "context_window": 200000,
        "supports_multimodal": True,
        "supports_json_mode": False,
    },
}


# Complexity thresholds for routing
COMPLEXITY_THRESHOLDS = {
    "simple": (0, 3),      # → Gemini Flash
    "medium": (4, 6),      # → Gemini Flash
    "complex": (7, 8),     # → Claude Sonnet
    "critical": (9, 10),   # → Claude Opus
}


# Agent configurations
AGENT_CONFIGS = {
    "analyst": {
        "model": "gemini-2.0-flash",
        "role": "Data gathering, research, fact-checking",
        "temperature": 0.3,
    },
    "strategist": {
        "model": "claude-sonnet-4-5",
        "role": "Strategic planning, scenario modeling",
        "temperature": 0.5,
    },
    "critic": {
        "model": "claude-opus-4-5",
        "role": "Risk analysis, challenge assumptions",
        "temperature": 0.7,
    },
    "arbiter": {
        "model": "claude-opus-4-5",
        "role": "Synthesize debate, final decision",
        "temperature": 0.3,
    },
}


WORKFLOW_AGENTS = {
    "email": {
        "model": "gemini-2.0-flash",
        "tools": ["read_gmail", "send_email", "draft_reply", "search_emails"],
    },
    "meeting": {
        "model": "gemini-2.0-flash",
        "tools": ["create_calendar_event", "generate_zoom_link", "transcribe_meeting"],
    },
    "document": {
        "model": "claude-sonnet-4-5",
        "tools": ["create_google_doc", "generate_pdf", "draft_contract"],
    },
    "calendar": {
        "model": "gemini-2.0-flash",
        "tools": ["create_event", "find_free_slots", "check_conflicts"],
    },
    "financial": {
        "model": "claude-opus-4-5",
        "tools": ["parse_invoice", "track_expense", "generate_report"],
    },
}
