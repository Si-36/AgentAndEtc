"""
Demonstration of AI-EOS Context Engineering + LLM Routing

This script demonstrates:
1. 4-layer context compilation
2. Persian cultural context injection
3. Complexity-based LLM routing
4. Cost tracking

Usage:
    python examples/demo_context_and_routing.py
"""

import asyncio
import sys
import os
from uuid import uuid4, UUID
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.database import db
from src.context.compiler import ContextCompiler
from src.llm.clients import LLMRouter


async def demo():
    """Run demonstration"""

    print("="*80)
    print("AI-EOS Context Engineering + LLM Routing Demo")
    print("="*80)

    # Initialize
    connection = db.connect()
    context_compiler = ContextCompiler(connection)
    llm_router = LLMRouter(connection)

    # Create demo user and session
    user_id = UUID('12345678-1234-1234-1234-123456789012')
    session_id = UUID('87654321-4321-4321-4321-210987654321')

    print("\n1. Creating demo user...")
    with db.get_cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO users (id, email, name, company, tier, preferences)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO UPDATE SET
                email = EXCLUDED.email,
                name = EXCLUDED.name
            """,
            (
                str(user_id),
                'ali.rezaei@tehrantech.ir',
                'Ali Rezaei',
                'Tehran Tech Solutions',
                'professional',
                {
                    "language": "persian",
                    "calendar": "jalali",
                    "formality": "formal"
                }
            )
        )

        # Create session
        cursor.execute(
            """
            INSERT INTO sessions (id, user_id)
            VALUES (%s, %s)
            ON CONFLICT (id) DO NOTHING
            """,
            (str(session_id), str(user_id))
        )

    print(f"✓ User created: Ali Rezaei (ali.rezaei@tehrantech.ir)")
    print(f"✓ Session created: {session_id}")

    # Demo 1: Simple query (should route to Gemini)
    print("\n" + "="*80)
    print("DEMO 1: Simple Query → Gemini 2.0 Flash")
    print("="*80)

    simple_query = "What is the current Jalali date?"

    print(f"\nUser Query: \"{simple_query}\"")
    print("\nCompiling context...")

    context = await context_compiler.compile_working_context(
        user_id=user_id,
        session_id=session_id,
        current_message=simple_query
    )

    print(f"✓ Context compiled:")
    print(f"  - Core Memory: {len(str(context['core_memory']))} chars")
    print(f"  - Recent Events: {len(context['recent_events'])} events")
    print(f"  - Persian Context: {context['persian_context']['current_date_jalali']}")
    print(f"  - Token Count: ~{context['token_count']} tokens")

    formatted_prompt = await context_compiler.format_for_llm(
        context=context,
        current_message=simple_query,
        system_prompt="You are AI-EOS, a Persian business AI assistant. Respond in formal Persian."
    )

    print("\nRouting to LLM...")
    response = await llm_router.route_and_generate(
        prompt=formatted_prompt,
        user_id=str(user_id),
        session_id=str(session_id)
    )

    print(f"\n✓ Response received:")
    print(f"  - Model: {response['model']}")
    print(f"  - Complexity Score: {response.get('complexity_score', 'N/A')}")
    print(f"  - Input Tokens: {response['usage']['input_tokens']}")
    print(f"  - Output Tokens: {response['usage']['output_tokens']}")
    print(f"  - Cost: ${response['cost']:.6f}")
    print(f"  - Latency: {response['latency_ms']}ms")
    print(f"\n  Response: {response['content'][:200]}...")

    # Store interaction in session
    await context_compiler.store_event(
        session_id=session_id,
        user_id=user_id,
        event_type='UserMessage',
        payload={'content': simple_query}
    )
    await context_compiler.store_event(
        session_id=session_id,
        user_id=user_id,
        event_type='AssistantMessage',
        payload={'content': response['content'], 'model': response['model']}
    )

    # Demo 2: Complex strategic query (should route to Claude Opus)
    print("\n" + "="*80)
    print("DEMO 2: Strategic Query → Claude Opus 4.5")
    print("="*80)

    strategic_query = """
    We're a 50-person software company in Tehran considering a major pivot.
    Should we:
    1. Continue with our current enterprise CRM product
    2. Pivot to AI-powered customer service automation
    3. Merge both and create an AI-enhanced CRM

    This decision affects our entire roadmap and team structure.
    """

    print(f"\nUser Query: \"{strategic_query.strip()[:100]}...\"")
    print("\nCompiling context...")

    context = await context_compiler.compile_working_context(
        user_id=user_id,
        session_id=session_id,
        current_message=strategic_query
    )

    formatted_prompt = await context_compiler.format_for_llm(
        context=context,
        current_message=strategic_query,
        system_prompt="You are AI-EOS, a strategic advisor for Persian businesses. Provide in-depth analysis."
    )

    print("\nRouting to LLM...")
    response = await llm_router.route_and_generate(
        prompt=formatted_prompt,
        user_id=str(user_id),
        session_id=str(session_id),
        task_type="strategic"  # Force strategic routing
    )

    print(f"\n✓ Response received:")
    print(f"  - Model: {response['model']}")
    print(f"  - Complexity Score: {response.get('complexity_score', 'N/A')}")
    print(f"  - Input Tokens: {response['usage']['input_tokens']}")
    print(f"  - Output Tokens: {response['usage']['output_tokens']}")
    print(f"  - Cost: ${response['cost']:.6f}")
    print(f"  - Latency: {response['latency_ms']}ms")
    print(f"\n  Response: {response['content'][:300]}...")

    # Store interaction
    await context_compiler.store_event(
        session_id=session_id,
        user_id=user_id,
        event_type='UserMessage',
        payload={'content': strategic_query}
    )
    await context_compiler.store_event(
        session_id=session_id,
        user_id=user_id,
        event_type='AssistantMessage',
        payload={'content': response['content'], 'model': response['model']}
    )

    # Demo 3: Edit Core Memory
    print("\n" + "="*80)
    print("DEMO 3: Core Memory Editing")
    print("="*80)

    print("\nAgent edits Core Memory to remember key goal...")

    await context_compiler.edit_core_memory(
        user_id=user_id,
        field_path="context.key_goals",
        value=["Decide on strategic pivot by Q2 1404", "Maintain team morale during transition"]
    )

    print("✓ Core Memory updated: context.key_goals")

    # Verify it's in context now
    context = await context_compiler.compile_working_context(
        user_id=user_id,
        session_id=session_id,
        current_message="What are my current goals?"
    )

    print(f"\n✓ Core Memory now includes:")
    print(f"  Goals: {context['core_memory']['context']['key_goals']}")

    # Demo 4: Cost Statistics
    print("\n" + "="*80)
    print("DEMO 4: Cost Statistics")
    print("="*80)

    stats = await llm_router.get_cost_stats(str(user_id), days=30)

    print(f"\n✓ Cost Stats (last 30 days):")
    print(f"  Total Calls: {stats['total_calls']}")
    print(f"  Total Cost: ${stats['total_cost']:.4f}")
    print(f"  Avg Latency: {stats['avg_latency_ms']}ms")
    print(f"\n  Model Distribution:")
    for model, percentage in stats['model_distribution'].items():
        print(f"    - {model}: {percentage*100:.1f}%")

    print(f"\n  By Model:")
    for model, model_stats in stats['by_model'].items():
        print(f"    - {model}:")
        print(f"        Calls: {model_stats['calls']}")
        print(f"        Cost: ${model_stats['cost']:.4f}")

    # Final summary
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)
    print("\n✓ Demonstrated:")
    print("  1. 4-layer context architecture (Working, Session, Memory, Artifacts)")
    print("  2. Persian cultural context injection (Jalali calendar, holidays)")
    print("  3. Complexity-based LLM routing (Gemini for simple, Claude for complex)")
    print("  4. Core Memory editing (agent-directed memory management)")
    print("  5. Cost tracking and analytics")
    print("\n✓ System Status:")
    print(f"  - Target distribution: 80% Gemini, 5% Sonnet, 15% Opus")
    print(f"  - Actual distribution: {stats['model_distribution']}")
    print(f"  - Average cost per query: ${stats['total_cost']/stats['total_calls']:.4f}")
    print(f"  - Average latency: {stats['avg_latency_ms']}ms")

    print("\n" + "="*80)
    print("Demo Complete!")
    print("="*80)


if __name__ == "__main__":
    # Check if .env exists
    if not os.path.exists('.env'):
        print("ERROR: .env file not found!")
        print("Please copy config/.env.example to .env and fill in your API keys.")
        sys.exit(1)

    # Run demo
    try:
        asyncio.run(demo())
    except KeyboardInterrupt:
        print("\n\nDemo interrupted by user.")
    except Exception as e:
        print(f"\n\nERROR: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()
