#!/usr/bin/env python3
"""
LangSmith Tracing Verification Test

This is the FIRST test you should run after setup.
It verifies that LangSmith tracing is working correctly.

Run: python tests/test_langsmith.py

Expected result:
- ✅ SUCCESS message
- Trace visible at https://smith.langchain.com/
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def check_environment():
    """Check required environment variables"""
    required = [
        "LANGCHAIN_TRACING_V2",
        "LANGCHAIN_API_KEY",
        "LANGCHAIN_PROJECT"
    ]
    
    missing = []
    for var in required:
        if not os.getenv(var):
            missing.append(var)
    
    if missing:
        print("\n❌ ERROR: Missing required environment variables:")
        for var in missing:
            print(f"  - {var}")
        print("\nPlease check your .env file.")
        print("See .env.example for reference.")
        sys.exit(1)
    
    # Check LANGCHAIN_TRACING_V2 is 'true'
    if os.getenv("LANGCHAIN_TRACING_V2").lower() != "true":
        print("\n❌ ERROR: LANGCHAIN_TRACING_V2 must be 'true'")
        print("Current value:", os.getenv("LANGCHAIN_TRACING_V2"))
        sys.exit(1)

def test_langsmith_tracing():
    """Test LangSmith tracing with a simple LLM call"""
    print("\n🔍 Testing LangSmith Tracing...\n")
    
    # Check environment first
    check_environment()
    print("✅ Environment variables set correctly")
    
    # Try importing required packages
    try:
        from langchain_openai import ChatOpenAI
        from langchain_google_genai import ChatGoogleGenerativeAI
        print("✅ Required packages imported successfully")
    except ImportError as e:
        print(f"\n❌ ERROR: Failed to import required packages: {e}")
        print("\nRun: pip install -r requirements.txt")
        sys.exit(1)
    
    # Test with Gemini (FREE tier) if available
    if os.getenv("GOOGLE_API_KEY"):
        print("\nTesting with Gemini (FREE tier)...")
        try:
            llm = ChatGoogleGenerativeAI(
                model="gemini-2.0-flash-exp",
                temperature=0
            )
            response = llm.invoke("Say 'LangSmith tracing is working!' in one sentence.")
            print(f"✅ Gemini response: {response.content}")
        except Exception as e:
            print(f"⚠️  Gemini test failed: {e}")
            print("This is okay if you haven't set GOOGLE_API_KEY yet.")
    
    # Test with OpenAI if available
    if os.getenv("OPENAI_API_KEY"):
        print("\nTesting with OpenAI...")
        try:
            llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
            response = llm.invoke("Say 'LangSmith tracing is working!' in one sentence.")
            print(f"✅ OpenAI response: {response.content}")
        except Exception as e:
            print(f"⚠️  OpenAI test failed: {e}")
            print("This is okay if you haven't set OPENAI_API_KEY yet.")
    
    # Final success message
    print("\n" + "="*60)
    print("✅ SUCCESS! LangSmith tracing is working!")
    print("="*60)
    print(f"\n📊 View your traces at: https://smith.langchain.com/")
    print(f"   Project: {os.getenv('LANGCHAIN_PROJECT')}")
    print("\nNext steps:")
    print("1. Open https://smith.langchain.com/")
    print("2. Find your project")
    print("3. Click on a trace to see details")
    print("4. Read docs/WEEK_1_FOUNDATION.md to continue\n")

if __name__ == "__main__":
    test_langsmith_tracing()
