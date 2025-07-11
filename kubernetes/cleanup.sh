#!/bin/bash

# ConsensusAI Kubernetes Cleanup Script

echo "🧹 Cleaning up ConsensusAI from Kubernetes"
echo "=========================================="

# Delete all resources in the consensusai namespace
echo "🗑️  Deleting all resources..."
kubectl delete namespace consensusai --ignore-not-found=true

echo "⏳ Waiting for namespace deletion..."
kubectl wait --for=delete namespace/consensusai --timeout=60s

echo "✅ Cleanup completed!"
echo ""
echo "📝 All ConsensusAI resources have been removed from the cluster."
