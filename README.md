# ConsensusAI - Multi-Model AI Discussion System

A full-stack application that combines multiple AI models to provide comprehensive, balanced responses to user queries.

## Project Structure

- **mcp-server**: Backend API built with Express.js and Supabase
- **mcp-client**: Frontend UI built with React, Vite, and Three.js

## Features

- **3D Interactive UI**: Engaging particle field animation
- **Multi-Model AI**: Combines responses from multiple AI models
- **Authentication**: Secure user authentication with Supabase
- **Conversation History**: Save and review past conversations
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Option 1: Docker (Recommended)
```bash
# 1. Set up environment variables
cp .env.example .env
nano .env  # Add your API keys

# 2. Run with Docker
./run-docker.sh

# 3. Access the application
# Frontend: http://localhost
# Backend: http://localhost:3000
```

### Option 2: Kubernetes
```bash
# 1. Deploy to Kubernetes cluster
cd kubernetes
./deploy.sh

# 2. Port forward for local access
kubectl port-forward service/consensusai-client-service 8080:80 -n consensusai

# 3. Access at http://localhost:8080
```

### Option 3: Manual Development Setup

Run the `start-app.bat` file to start both the backend and frontend servers.

### Option 2: Manual startup

1. Start the backend server:
   ```bash
   cd mcp-server
   npm install
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd mcp-client
   npm install
   npm run dev
   ```

3. Open your browser and navigate to:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/signin`: Login
- `POST /api/auth/signout`: Logout
- `GET /api/auth/me`: Get current user

### AI Discussion
- `POST /api/discuss`: Get AI discussion (no auth required)
- `POST /api/discuss/auth`: Get AI discussion and save it (auth required)

### Conversations
- `GET /api/conversations`: Get all conversations for the current user
- `GET /api/conversations/:id`: Get a specific conversation
- `DELETE /api/conversations/:id`: Delete a conversation

## Environment Variables

### Backend (.env)
```
PORT=3000
HUGGINGFACE_API_KEY=your_huggingface_api_key
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Technologies Used

### Backend
- Express.js
- Supabase
- Gemini API
- Hugging Face API

### Frontend
- React
- Vite
- Three.js / React Three Fiber
- Tailwind CSS
- Framer Motion