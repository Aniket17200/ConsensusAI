#!/bin/bash

# ConsensusAI Docker Build Script

set -e

echo "🔨 Building ConsensusAI Docker Images..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Build server image
print_status "Building server image..."
cd "$PROJECT_ROOT"
docker build -f kubernetes/Dockerfile.server -t consensusai-server:latest .

# Build client image
print_status "Building client image..."
docker build -f kubernetes/Dockerfile.client -t consensusai-client:latest .

# Show built images
print_status "Built images:"
docker images | grep consensusai

print_status "✅ Docker images built successfully!"
print_status "You can now deploy using: ./deploy.sh"

# Optional: Tag for registry
read -p "Do you want to tag images for a registry? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter registry URL (e.g., your-registry.com/consensusai): " REGISTRY
    if [ ! -z "$REGISTRY" ]; then
        docker tag consensusai-server:latest $REGISTRY/server:latest
        docker tag consensusai-client:latest $REGISTRY/client:latest
        print_status "Tagged images for registry: $REGISTRY"
        print_status "Push with: docker push $REGISTRY/server:latest && docker push $REGISTRY/client:latest"
    fi
fi
