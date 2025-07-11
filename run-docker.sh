#!/bin/bash

# ConsensusAI Docker Build and Run Script

echo "🐳 ConsensusAI Docker Setup"
echo "=========================="

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "📝 Please copy .env.example to .env and fill in your API keys:"
    echo "   cp .env.example .env"
    echo "   nano .env"
    exit 1
fi

# Source environment variables
set -a
source .env
set +a

# Check required environment variables
required_vars=("GEMINI_API_KEY" "OPENROUTER_API_KEY" "SUPABASE_URL" "SUPABASE_ANON_KEY")
missing_vars=()

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ] || [[ "${!var}" == *"your_"* ]]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "❌ Missing or placeholder values for required environment variables:"
    printf '   %s\n' "${missing_vars[@]}"
    echo "📝 Please update your .env file with actual values"
    exit 1
fi

echo "✅ Environment variables validated"

# Build and run with docker compose
echo "🔨 Building and starting containers..."
docker compose down
docker compose build
docker compose up -d

echo ""
echo "🚀 Services started successfully!"
echo "📱 Frontend: http://localhost"
echo "🔧 Backend:  http://localhost:3000"
echo "📊 Health:   http://localhost:3000/health"
echo ""
echo "📝 To view logs: docker compose logs -f"
echo "🛑 To stop:     docker compose down"
