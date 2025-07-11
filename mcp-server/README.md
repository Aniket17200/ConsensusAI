# ConsensusAI - Intelligent Multi-Model Discussion System

## 🚀 Quick Start
```bash
npm install
npm start
```

## 🎯 Features
- **Smart Model Selection** - Automatically chooses best models for each task
- **7 Specialized Groups** - Code, Creative, Scientific, Chat, Analysis, Multilingual, Instruction
- **Free Hugging Face Models** - Uses 12+ free models (Llama2, Falcon, Mistral, etc.)
- **Consensus Building** - Models discuss and reach agreements
- **Production Ready** - Secure, optimized, minimal dependencies

## 📡 API Usage
```bash
curl -X POST http://localhost:3000/api/discuss \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Your question here"}'
```

## 🔧 Setup
1. Copy `.env.example` to `.env`
2. Add your Hugging Face API key (optional - works with mocks)
3. Run `npm start`

## 📊 Response Format
```json
{
  "success": true,
  "discussion": {
    "promptType": "scientific",
    "selectedModels": ["llama2-70b", "falcon-40b", "bloom-176b"],
    "finalConsensus": "SCIENTIFIC CONSENSUS: ...",
    "confidence": 0.95
  }
}
```

## 🧪 Test Examples
- **Code**: "Write a Python function to sort data"
- **Creative**: "Tell me a story about AI consciousness" 
- **Scientific**: "Explain black hole evaporation theory"
- **Analysis**: "Compare different machine learning algorithms"

## 🔒 Security
- API keys secured in `.env` file
- Input validation and error handling
- No sensitive data in logs or responses

## 📁 Project Structure
```
src/
├── app-fixed.js          # Main application
├── config/
│   ├── modelGroups.js    # Model group definitions
│   └── security.js       # Security utilities
└── adapters/
    └── huggingfaceAdapter.js # HF API integration
```