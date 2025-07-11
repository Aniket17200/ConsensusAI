# Docker Setup Guide

## Quick Start

1. **Copy environment file and add your API keys:**
   ```bash
   cp .env.example .env
   nano .env  # Add your actual API keys
   ```

2. **Run the application:**
   ```bash
   ./run-docker.sh
   ```

3. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - Health Check: http://localhost:3000/health

## Required API Keys

### 1. Google Gemini API Key
- Go to: https://makersuite.google.com/app/apikey
- Create a new API key
- Add to `.env` as `GEMINI_API_KEY`

### 2. OpenRouter API Key
- Go to: https://openrouter.ai/keys
- Create a new API key
- Add to `.env` as `OPENROUTER_API_KEY`

### 3. Supabase Configuration
- Go to your Supabase project settings
- Copy the Project URL and Anon Key
- Add to `.env` as `SUPABASE_URL` and `SUPABASE_ANON_KEY`

## Manual Docker Commands

### Build images:
```bash
# Backend
docker build -t consensusai-backend ./mcp-server

# Frontend  
docker build -t consensusai-frontend ./mcp-client/my-light-app
```

### Run containers:
```bash
# Backend
docker run -d --name backend -p 3000:3000 --env-file .env consensusai-backend

# Frontend
docker run -d --name frontend -p 80:80 consensusai-frontend
```

### Using docker-compose:
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose down && docker-compose build && docker-compose up -d
```

## Troubleshooting

### Check container status:
```bash
docker-compose ps
```

### View logs:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Restart services:
```bash
docker-compose restart
```

### Clean rebuild:
```bash
docker-compose down
docker system prune -f
docker-compose build --no-cache
docker-compose up -d
```
