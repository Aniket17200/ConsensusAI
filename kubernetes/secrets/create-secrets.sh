#!/bin/bash

# Helper script to create secrets.yaml from environment variables or prompts

echo "🔐 Creating Kubernetes secrets for ConsensusAI..."

# Function to base64 encode
encode_base64() {
    echo -n "$1" | base64 -w 0
}

# Function to prompt for input
prompt_for_secret() {
    local var_name=$1
    local description=$2
    local value=""
    
    if [ ! -z "${!var_name}" ]; then
        value="${!var_name}"
        echo "Using $var_name from environment"
    else
        read -p "Enter $description: " -s value
        echo
    fi
    
    if [ -z "$value" ]; then
        echo "Warning: Empty value for $var_name"
        value="REPLACE_ME"
    fi
    
    encode_base64 "$value"
}

# Create secrets.yaml
cat > secrets/secrets.yaml << EOF
apiVersion: v1
kind: Secret
metadata:
  name: consensusai-secrets
  namespace: consensusai
type: Opaque
data:
  GEMINI_API_KEY: $(prompt_for_secret "GEMINI_API_KEY" "Google Gemini API Key")
  OPENROUTER_API_KEY: $(prompt_for_secret "OPENROUTER_API_KEY" "OpenRouter API Key")
  SUPABASE_URL: $(prompt_for_secret "SUPABASE_URL" "Supabase URL")
  SUPABASE_ANON_KEY: $(prompt_for_secret "SUPABASE_ANON_KEY" "Supabase Anonymous Key")
  VITE_SUPABASE_URL: $(prompt_for_secret "SUPABASE_URL" "Supabase URL (for client)")
  VITE_SUPABASE_ANON_KEY: $(prompt_for_secret "SUPABASE_ANON_KEY" "Supabase Anonymous Key (for client)")
EOF

echo "✅ secrets.yaml created successfully!"
echo "⚠️  Remember to never commit this file to version control!"

# Add to .gitignore if it exists
if [ -f "../.gitignore" ]; then
    if ! grep -q "secrets/secrets.yaml" "../.gitignore"; then
        echo "secrets/secrets.yaml" >> "../.gitignore"
        echo "Added secrets.yaml to .gitignore"
    fi
fi
