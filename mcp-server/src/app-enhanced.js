require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const supabase = require('./supabase/client');

// Import security middleware with error handling
let securityMiddleware = {
  securityHeaders: (req, res, next) => next(),
  rateLimiter: (req, res, next) => next(),
  corsMiddleware: (req, res, next) => next(),
  xssProtection: (req, res, next) => next(),
  preventParamPollution: (req, res, next) => next(),
  errorHandler: (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Try to load security middleware
try {
  securityMiddleware = require('./middleware/security');
} catch (err) {
  console.warn('⚠️ Security middleware not loaded:', err.message);
}

const { 
  securityHeaders, 
  rateLimiter, 
  corsMiddleware, 
  xssProtection, 
  preventParamPollution,
  errorHandler 
} = securityMiddleware;

// Set NODE_ENV to 'development' if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initialize Supabase
console.log(`Initializing Supabase connection in ${process.env.NODE_ENV} mode...`);
console.log(`Supabase URL: ${process.env.SUPABASE_URL}`);

// Test Supabase connection
supabase.auth.getSession()
  .then(() => {
    console.log('✅ Supabase connection successful!');
  })
  .catch(err => {
    console.error('❌ Supabase connection error:', err.message);
    console.log('Continuing without Supabase - user authentication and conversation storage will be disabled');
  });

const app = express();

// Apply security middleware in production
if (process.env.NODE_ENV === 'production') {
  app.use(securityHeaders);
  app.use(rateLimiter);
  app.use(corsMiddleware);
  app.use(xssProtection);
  app.use(preventParamPollution);
  
  try {
    const compression = require('compression');
    app.use(compression());
  } catch (err) {
    console.warn('⚠️ Compression middleware not loaded:', err.message);
  }
  
  console.log('✅ Production security middleware enabled');
} else {
  app.use(corsMiddleware);
  console.log('⚠️ Running in development mode - full security disabled');
}

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Import routes
const authRoutes = require('./routes/auth');
const conversationRoutes = require('./routes/conversations');
const testRoutes = require('./routes/test');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/test', testRoutes);

// Generate endpoint using current models
app.post('/api/generate', async (req, res) => {
  const { prompt, model = 'gemini-flash' } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ success: false, error: 'Prompt required' });
  }
  
  try {
    const response = await queryModel(model, prompt);
    res.json({ 
      success: true, 
      data: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Validation
function validateApiKeys() {
  const keys = ['OPENROUTER_API_KEY', 'GEMINI_API_KEY'];
  const missing = keys.filter(key => !process.env[key] || process.env[key].includes('your_'));
  if (missing.length > 0) {
    console.log('⚠️  Missing keys:', missing.join(', '));
  } else {
    console.log('✅ All API keys configured');
  }
}
validateApiKeys();

// Optimized model groups (2 models each for speed)
const MODEL_GROUPS = {
  code: { models: ['gemini-flash', 'dolphin-mistral'], description: 'Code generation and analysis' },
  creative: { models: ['gemini-flash', 'kimi-dev-72b'], description: 'Creative writing and storytelling' },
  scientific: { models: ['gemini-flash', 'nemotron-49b'], description: 'Scientific analysis and research' },
  chat: { models: ['gemini-flash', 'kimi-dev-72b'], description: 'General conversation' },
  analysis: { models: ['gemini-flash', 'dolphin-mistral'], description: 'Data analysis and reasoning' },
  multilingual: { models: ['gemini-flash', 'sarvam-m'], description: 'Translation and multilingual tasks' }
};

// Free OpenRouter model mapping (working models only)
const OPENROUTER_MODELS = {
  'dolphin-mistral': 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
  'kimi-dev-72b': 'moonshotai/kimi-dev-72b:free',
  'sarvam-m': 'sarvamai/sarvam-m:free',
  'glm-z1-32b': 'thudm/glm-z1-32b:free',
  'nemotron-49b': 'nvidia/llama-3.3-nemotron-super-49b-v1:free',
  'cypher-alpha': 'openrouter/cypher-alpha:free'
};

function detectPromptType(prompt) {
  const lower = prompt.toLowerCase();
  
  const codeKeywords = [
    'python', 'javascript', 'java', 'c++', 'typescript', 'ruby', 'go', 'rust', 'php', 'swift',
    'algorithm', 'function', 'code', 'programming', 'sorting', 'loop', 'array', 'class', 'object',
    'variable', 'method', 'implementation', 'recursion', 'iteration', 'data structure', 'binary',
    'compile', 'debug', 'syntax', 'framework', 'library', 'api', 'backend', 'frontend', 'fullstack',
    'database', 'query', 'sql', 'nosql', 'mongodb', 'django', 'flask', 'react', 'angular', 'vue'
  ];
  
  if (codeKeywords.some(keyword => lower.includes(keyword))) return 'code';
  
  if (lower.includes('story') || lower.includes('creative') || lower.includes('poem') || 
      lower.includes('fiction') || lower.includes('imagine')) return 'creative';
      
  if (lower.includes('scientific') || lower.includes('research') || lower.includes('black hole') ||
      lower.includes('physics') || lower.includes('theory') || lower.includes('experiment')) return 'scientific';
      
  if (lower.includes('analyze') || lower.includes('compare') || lower.includes('data') ||
      lower.includes('evaluation') || lower.includes('assessment')) return 'analysis';
      
  if (lower.includes('translate') || lower.includes('language') || lower.includes('spanish') ||
      lower.includes('french') || lower.includes('multilingual')) return 'multilingual';
      
  return 'chat';
}

function getModelGroup(type) {
  return MODEL_GROUPS[type] || MODEL_GROUPS.chat;
}

// API integrations
// Production-level response formatting
function formatResponse(text, modelName) {
  if (!text || typeof text !== 'string') return 'No response available';
  
  // Clean and format response
  let cleaned = text
    .replace(/\*{3,}/g, '') // Remove excessive asterisks
    .replace(/\*\*(.*?)\*\*/g, '**$1**') // Keep important bold
    .replace(/#{1,6}\s*/g, '') // Remove markdown headers
    .trim();
  
  // Ensure code blocks are properly formatted
  if (cleaned.includes('```')) {
    cleaned = cleaned.replace(/```(\w+)?/g, '```$1');
  }
  
  // Clean excessive whitespace but preserve structure
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');
  
  // Ensure minimum response quality
  if (cleaned.length < 20) {
    return `${modelName}: Brief response - ${cleaned}`;
  }
  
  return cleaned;
}

async function queryGemini(prompt) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
          maxOutputTokens: 800, 
          temperature: 0.8,
          topP: 0.95,
          topK: 40
        }
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

async function queryOpenRouter(modelName, prompt) {
  if (!OPENROUTER_MODELS[modelName]) {
    throw new Error(`Model ${modelName} not available`);
  }
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'ConsensusAI'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODELS[modelName],
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.8,
        top_p: 0.95,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || 'API Error');
    }
    
    return data.choices?.[0]?.message?.content || 'No response';
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

// Production-optimized model query function
async function queryModel(modelName, prompt) {
  const startTime = Date.now();
  
  // Input validation
  if (!prompt || prompt.trim().length === 0) {
    throw new Error('Invalid prompt provided');
  }
  
  try {
    let text = '';
    
    if (modelName === 'gemini-flash') {
      text = await queryGemini(prompt);
    } else {
      text = await queryOpenRouter(modelName, prompt);
    }
    
    const formattedText = formatResponse(text, modelName);
    const latency = (Date.now() - startTime) / 1000;
    
    // Quality validation
    if (formattedText.length < 10) {
      throw new Error('Response too short or invalid');
    }
    
    return {
      model: modelName,
      text: formattedText,
      latency: Math.round(latency * 100) / 100, // Round to 2 decimals
      tokensUsed: Math.ceil(formattedText.length / 4), // Estimate tokens
      quality: formattedText.length > 100 ? 'high' : 'medium'
    };
  } catch (error) {
    console.error(`${modelName} Error:`, error.message);
    return {
      model: modelName,
      text: `${modelName} is temporarily unavailable. Please try again.`,
      error: error.message,
      latency: (Date.now() - startTime) / 1000,
      tokensUsed: 0,
      quality: 'error'
    };
  }
}

// Enhanced discussion engine
async function processDiscussion(prompt) {
  const promptType = detectPromptType(prompt);
  const modelGroup = getModelGroup(promptType);
  const availableModels = modelGroup.models;
  
  console.log(`🎯 Type: ${promptType} | Models: ${availableModels.join(', ')}`);
  
  const results = [];
  
  // Query models in parallel with timeout
  const promises = availableModels.map(modelName => 
    Promise.race([
      queryModel(modelName, prompt),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Model timeout')), 20000)
      )
    ])
  );
  const responses = await Promise.allSettled(promises);
  
  responses.forEach((response, index) => {
    if (response.status === 'fulfilled') {
      results.push(response.value);
    } else {
      results.push({
        model: availableModels[index],
        text: `${availableModels[index]}: Analysis unavailable`,
        error: response.reason?.message
      });
    }
  });

  // Generate detailed interactions
  const interactions = [];
  const validResults = results.filter(r => r.text && !r.error);
  
  if (validResults.length >= 2) {
    const cleanText1 = formatResponse(validResults[0].text.substring(0, 200), validResults[0].model);
    const cleanText2 = validResults.length >= 3 ? formatResponse(validResults[2].text.substring(0, 200), validResults[2].model) : '';
    
    interactions.push({
      model: validResults[0].model,
      respondingTo: validResults[1].model,
      text: `${validResults[0].model} responds:\n\n${cleanText1}...\n\nI agree with ${validResults[1].model}'s approach and would add this perspective.`,
      type: "detailed_response"
    });
    
    if (validResults.length >= 3) {
      interactions.push({
        model: validResults[2].model,
        respondingTo: validResults[0].model,
        text: `${validResults[2].model} synthesis:\n\n${cleanText2}...\n\nBuilding on both perspectives above.`,
        type: "detailed_synthesis"
      });
    }
  }

  // Create detailed consensus
  const validResponses = results.filter(r => r.text && !r.error);
  let consensus = "No consensus reached";
  
  if (validResponses.length > 0) {
    const responsePreview = validResponses.map(r => {
      const cleanText = formatResponse(r.text.substring(0, 150), r.model);
      return `${r.model}: ${cleanText}...`;
    }).join('\n\n');
    consensus = `${promptType.toUpperCase()} CONSENSUS:\n\nBased on ${validResponses.length} AI model analysis:\n\n${responsePreview}`;
  }
  
  return {
    userQuery: prompt,
    promptType,
    modelGroup: modelGroup.description,
    selectedModels: availableModels,
    initialResponses: results,
    modelInteractions: interactions,
    finalConsensus: consensus,
    confidence: validResponses.length / availableModels.length,
    timestamp: new Date().toISOString()
  };
}

// Production-ready quick endpoint
app.post('/api/quick', async (req, res) => {
  const { prompt, model = 'gemini-flash' } = req.body;
  
  // Enhanced validation
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Valid prompt is required',
      code: 'INVALID_PROMPT'
    });
  }
  
  if (prompt.length > 4000) {
    return res.status(400).json({ 
      success: false, 
      error: 'Prompt too long (max 4000 characters)',
      code: 'PROMPT_TOO_LONG'
    });
  }
  
  try {
    const response = await queryModel(model, prompt);
    res.json({ 
      success: true, 
      data: response,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      code: 'PROCESSING_ERROR'
    });
  }
});

// Streaming endpoint for real-time responses
app.post('/api/stream', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });
  
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  
  const promptType = detectPromptType(prompt);
  const modelGroup = getModelGroup(promptType);
  
  res.write(`data: ${JSON.stringify({ type: 'start', promptType, models: modelGroup.models })}\n\n`);
  
  for (const modelName of modelGroup.models) {
    try {
      const response = await queryModel(modelName, prompt);
      res.write(`data: ${JSON.stringify({ type: 'response', model: modelName, data: response })}\n\n`);
    } catch (error) {
      res.write(`data: ${JSON.stringify({ type: 'error', model: modelName, error: error.message })}\n\n`);
    }
  }
  
  res.write(`data: ${JSON.stringify({ type: 'end' })}\n\n`);
  res.end();
});

// Production-ready discuss endpoint
app.post('/api/discuss', async (req, res) => {
  const { prompt } = req.body;
  
  // Enhanced validation
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Valid prompt is required',
      code: 'INVALID_PROMPT'
    });
  }
  
  if (prompt.length > 4000) {
    return res.status(400).json({ 
      success: false, 
      error: 'Prompt too long (max 4000 characters)',
      code: 'PROMPT_TOO_LONG'
    });
  }
  
  try {
    const discussion = await processDiscussion(prompt);
    res.json({ 
      success: true, 
      discussion,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Discussion error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process discussion',
      code: 'PROCESSING_ERROR'
    });
  }
});

// Test OpenRouter API key
app.get('/api/test/openrouter', async (req, res) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.error) {
      return res.status(401).json({
        success: false,
        error: data.error.message,
        status: 'OpenRouter API key invalid'
      });
    }
    
    res.json({
      success: true,
      status: 'OpenRouter API key valid',
      models: data.data?.length || 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      status: 'OpenRouter API test failed'
    });
  }
});

// Available models endpoint
app.get('/api/models', (req, res) => {
  res.json({
    success: true,
    models: {
      'gemini-flash': { name: 'Gemini 1.5 Flash', provider: 'Google', free: true },
      'dolphin-mistral': { name: 'Dolphin Mistral 24B', provider: 'OpenRouter', free: true },
      'hunyuan-a13b': { name: 'Hunyuan A13B', provider: 'OpenRouter', free: true },
      'deepseek-chimera': { name: 'DeepSeek Chimera', provider: 'OpenRouter', free: true },
      'cypher-alpha': { name: 'Cypher Alpha', provider: 'OpenRouter', free: true }
    }
  });
});

app.get('/health', (req, res) => res.json({ 
  status: 'ok', 
  models: 'gemini-flash+kimi-dev-72b+sarvam-m+glm-z1-32b+nemotron-49b+dolphin-mistral+cypher-alpha',
  provider: 'openrouter+google',
  database: 'supabase',
  totalModels: 7
}));

// Add global error handler
app.use(errorHandler);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

module.exports = app;