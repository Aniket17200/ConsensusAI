#!/bin/bash

# ConsensusAI Kubernetes Deployment Script

echo "🚀 Deploying ConsensusAI to Kubernetes"
echo "======================================"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Check if cluster is accessible
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Cannot connect to Kubernetes cluster. Please check your kubeconfig."
    exit 1
fi

echo "✅ Kubernetes cluster is accessible"

# Create namespace
echo "📦 Creating namespace..."
kubectl apply -f manifests/namespace.yaml

# Apply configurations
echo "⚙️  Applying configurations..."
kubectl apply -f configs/

# Apply secrets
echo "🔐 Applying secrets..."
if [ -f "secrets/secrets.yaml" ]; then
    kubectl apply -f secrets/secrets.yaml
    echo "✅ Secrets applied"
else
    echo "❌ secrets/secrets.yaml not found. Please create it from secrets-template.yaml"
    exit 1
fi

# Apply manifests
echo "🏗️  Deploying applications..."
kubectl apply -f manifests/

# Wait for deployments
echo "⏳ Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/consensusai-server -n consensusai
kubectl wait --for=condition=available --timeout=300s deployment/consensusai-client -n consensusai

# Get status
echo ""
echo "📊 Deployment Status:"
kubectl get pods -n consensusai
echo ""
kubectl get services -n consensusai
echo ""
kubectl get ingress -n consensusai

echo ""
echo "🎉 Deployment completed!"
echo ""
echo "📝 Next steps:"
echo "   1. Check pod logs: kubectl logs -f deployment/consensusai-server -n consensusai"
echo "   2. Port forward for testing: kubectl port-forward service/consensusai-client-service 8080:80 -n consensusai"
echo "   3. Configure your ingress controller and DNS for external access"
