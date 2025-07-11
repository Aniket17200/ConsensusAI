# ConsensusAI Kubernetes Deployment

This directory contains all the necessary Kubernetes manifests and scripts to deploy ConsensusAI to a Kubernetes cluster.

## Prerequisites

- Kubernetes cluster (v1.20+)
- kubectl configured to access your cluster
- NGINX Ingress Controller (optional, for external access)

## Quick Deployment

1. **Deploy to Kubernetes:**
   ```bash
   cd kubernetes
   ./deploy.sh
   ```

2. **Access the application:**
   ```bash
   # Port forward for local testing
   kubectl port-forward service/consensusai-client-service 8080:80 -n consensusai
   # Then access: http://localhost:8080
   ```

## Manual Deployment Steps

### 1. Create Namespace
```bash
kubectl apply -f manifests/namespace.yaml
```

### 2. Apply Configurations
```bash
kubectl apply -f configs/
```

### 3. Apply Secrets
```bash
kubectl apply -f secrets/secrets.yaml
```

### 4. Deploy Applications
```bash
kubectl apply -f manifests/
```

## Configuration

### Environment Variables

#### Backend (Server)
- `GEMINI_API_KEY`: Google Gemini API key
- `OPENROUTER_API_KEY`: OpenRouter API key for multiple AI models
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `NODE_ENV`: Environment (production/development)
- `PORT`: Server port (default: 3000)
- `CORS_ORIGIN`: CORS allowed origins

#### Frontend (Client)
- `VITE_API_URL`: Backend API URL
- `VITE_SUPABASE_URL`: Supabase URL for client
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key for client

### Secrets Management

1. **Copy template:**
   ```bash
   cp secrets/secrets-template.yaml secrets/secrets.yaml
   ```

2. **Encode your values:**
   ```bash
   echo -n "your-api-key" | base64 -w 0
   ```

3. **Update secrets.yaml with base64 encoded values**

### Ingress Configuration

Update `manifests/ingress.yaml`:
- Change `consensusai.local` to your actual domain
- Configure TLS if needed
- Ensure NGINX Ingress Controller is installed

## Services

### Backend Service
- **Name**: `consensusai-server-service`
- **Port**: 3000
- **Type**: ClusterIP

### Frontend Service
- **Name**: `consensusai-client-service`
- **Port**: 80
- **Type**: ClusterIP

## Deployments

### Backend Deployment
- **Image**: `consensusai-server:latest`
- **Replicas**: 2
- **Resources**: 256Mi-512Mi RAM, 250m-500m CPU
- **Health Checks**: `/health` endpoint

### Frontend Deployment
- **Image**: `consensusai-client:latest`
- **Replicas**: 2
- **Resources**: 128Mi-256Mi RAM, 100m-200m CPU
- **Health Checks**: Root path `/`

## Monitoring and Troubleshooting

### Check Pod Status
```bash
kubectl get pods -n consensusai
```

### View Logs
```bash
# Backend logs
kubectl logs -f deployment/consensusai-server -n consensusai

# Frontend logs
kubectl logs -f deployment/consensusai-client -n consensusai
```

### Check Services
```bash
kubectl get services -n consensusai
```

### Check Ingress
```bash
kubectl get ingress -n consensusai
kubectl describe ingress consensusai-ingress -n consensusai
```

### Port Forwarding for Testing
```bash
# Frontend
kubectl port-forward service/consensusai-client-service 8080:80 -n consensusai

# Backend
kubectl port-forward service/consensusai-server-service 3000:3000 -n consensusai
```

## Scaling

### Manual Scaling
```bash
# Scale backend
kubectl scale deployment consensusai-server --replicas=3 -n consensusai

# Scale frontend
kubectl scale deployment consensusai-client --replicas=3 -n consensusai
```

### Auto Scaling (HPA)
HPA configurations are included:
- `manifests/server-hpa.yaml`
- `manifests/client-hpa.yaml`

Requirements:
- Metrics server installed in cluster
- Resource requests defined in deployments

## Security

### Network Policies
Network policies are configured to:
- Allow frontend to backend communication
- Allow ingress traffic to frontend
- Restrict unnecessary inter-pod communication

### RBAC
Currently using default service account. For production:
1. Create dedicated service accounts
2. Apply principle of least privilege
3. Use Pod Security Standards

## Persistence

### Persistent Volumes
- Configuration for persistent storage included
- Modify `manifests/persistent-volume.yaml` for your storage class

## Production Considerations

1. **Image Management**
   - Use specific image tags instead of `latest`
   - Implement proper CI/CD pipeline
   - Use private container registry

2. **Security**
   - Enable Pod Security Standards
   - Use network policies
   - Regular security updates

3. **Monitoring**
   - Implement Prometheus/Grafana
   - Set up alerting
   - Log aggregation (ELK/EFK stack)

4. **Backup**
   - Database backups
   - Configuration backups
   - Disaster recovery plan

## Cleanup

To remove all ConsensusAI resources:
```bash
./cleanup.sh
```

Or manually:
```bash
kubectl delete namespace consensusai
```

## Support

For issues and questions:
1. Check pod logs
2. Verify configurations
3. Check cluster resources
4. Review ingress controller logs
