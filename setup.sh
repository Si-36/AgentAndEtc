#!/bin/bash

# AI-EOS Setup Script
# Automates initial project setup

set -e  # Exit on error

echo "=================================="
echo "AI-EOS Setup Script"
echo "=================================="
echo ""

# Check Python version
echo "Checking Python version..."
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "✓ Python version: $python_version"

# Create virtual environment
echo ""
echo "Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✓ Virtual environment created"
else
    echo "✓ Virtual environment already exists"
fi

# Activate virtual environment
echo ""
echo "Activating virtual environment..."
source venv/bin/activate
echo "✓ Virtual environment activated"

# Install dependencies
echo ""
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
echo "✓ Dependencies installed"

# Install OpenAI Swarm from GitHub
echo ""
echo "Installing OpenAI Swarm..."
pip install git+https://github.com/openai/swarm.git
echo "✓ OpenAI Swarm installed"

# Check if .env exists
echo ""
if [ ! -f ".env" ]; then
    echo "Creating .env from template..."
    cp config/.env.example .env
    echo "✓ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your API keys:"
    echo "   - GEMINI_API_KEY"
    echo "   - ANTHROPIC_API_KEY"
    echo "   - OPENAI_API_KEY"
    echo "   - DATABASE_URL"
else
    echo "✓ .env file already exists"
fi

# Check PostgreSQL
echo ""
echo "Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    echo "✓ PostgreSQL is installed"

    # Check if database exists
    if psql -lqt | cut -d \| -f 1 | grep -qw ai_eos; then
        echo "✓ Database 'ai_eos' exists"
    else
        echo ""
        read -p "Create database 'ai_eos'? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            createdb ai_eos
            echo "✓ Database 'ai_eos' created"
        fi
    fi

    # Check pgvector extension
    echo ""
    echo "Checking pgvector extension..."
    if psql ai_eos -c "SELECT * FROM pg_extension WHERE extname='vector';" | grep -q vector; then
        echo "✓ pgvector extension installed"
    else
        echo ""
        read -p "Install pgvector extension? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            psql ai_eos -c "CREATE EXTENSION vector;"
            echo "✓ pgvector extension installed"
        fi
    fi
else
    echo "⚠️  PostgreSQL not found. Please install PostgreSQL 14+ with pgvector extension."
fi

# Run database migrations
echo ""
read -p "Run database migrations? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Running migrations..."
    python -c "from src.database import db; db.execute_migration('database/migrations/001_initial_schema.sql')"
    echo "✓ Migrations complete"
fi

# Setup complete
echo ""
echo "=================================="
echo "Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Edit .env and add your API keys"
echo "2. Run demo: python examples/demo_context_and_routing.py"
echo "3. Read ultimate_last_plan.md for full implementation details"
echo ""
echo "To activate the virtual environment in future sessions:"
echo "  source venv/bin/activate"
echo ""
