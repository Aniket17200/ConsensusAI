#!/bin/bash

# ConsensusAI Kubernetes Verification Script

echo "🔍 Verifying ConsensusAI Kubernetes Deployment"
echo "=============================================="

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed"
    exit 1
fi

# Check namespace
echo "📦 Checking namespace..."
if kubectl get namespace consensusai &> /dev/null; then
    echo "✅ Namespace 'consensusai' exists"
else
    echo "❌ Namespace 'consensusai' not found"
    exit 1
fi

# Check secrets
echo "🔐 Checking secrets..."
if kubectl get secret consensusai-secrets -n consensusai &> /dev/null; then
    echo "✅ Secrets configured"
    kubectl get secret consensusai-secrets -n consensusai -o jsonpath='{.data}' | jq -r 'keys[]' | sed 's/^/   - /'
else
    echo "❌ Secrets not found"
fi

# Check configmaps
echo "⚙️  Checking configurations..."
kubectl get configmap -n consensusai

# Check deployments
echo "🏗️  Checking deployments..."
kubectl get deployments -n consensusai

# Check pods
echo "📦 Checking pods..."
kubectl get pods -n consensusai

# Check services
echo "🌐 Checking services..."
kubectl get services -n consensusai

# Check ingress
echo "🚪 Checking ingress..."
kubectl get ingress -n consensusai

# Health check if pods are running
echo "🏥 Health checks..."
SERVER_POD=$(kubectl get pods -n consensusai -l app=consensusai-server -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)
if [ ! -z "$SERVER_POD" ]; then
    echo "Testing backend health..."
    kubectl exec -n consensusai $SERVER_POD -- curl -s http://localhost:3000/health | jq . 2>/dev/null || echo "Health check failed"
fi

CLIENT_POD=$(kubectl get pods -n consensusai -l app=consensusai-client -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)
if [ ! -z "$CLIENT_POD" ]; then
    echo "Testing frontend..."
    kubectl exec -n consensusai $CLIENT_POD -- curl -s -I http://localhost:80 | head -1
fi

echo ""
echo "🎯 Quick Access Commands:"
echo "   Port forward frontend: kubectl port-forward service/consensusai-client-service 8080:80 -n consensusai"
echo "   Port forward backend:  kubectl port-forward service/consensusai-server-service 3000:3000 -n consensusai"
echo "   View backend logs:     kubectl logs -f deployment/consensusai-server -n consensusai"
echo "   View frontend logs:    kubectl logs -f deployment/consensusai-client -n consensusai"
