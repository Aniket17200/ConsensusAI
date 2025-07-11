# ConsensusAI - Frontend

React-based frontend for the ConsensusAI Multi-Model AI Discussion System.

## Features

- **3D Interactive UI**: Engaging particle field animation
- **Multi-Model AI Chat**: Unified interface for AI discussions
- **Authentication**: Secure user login/signup
- **Conversation History**: Save and review past discussions
- **Responsive Design**: Works on desktop and mobile

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173

## Environment Variables

```
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Technologies

- React 19
- Vite
- TailwindCSS
- HTML5 Canvas (for 3D effects)
- Fetch API (for backend communication)