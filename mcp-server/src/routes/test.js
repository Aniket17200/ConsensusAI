const express = require('express');
const supabase = require('../supabase/client');
const router = express.Router();

// @desc    Test Supabase connection
// @route   GET /api/test/supabase
// @access  Public
router.get('/supabase', async (req, res) => {
  try {
    const { data, error } = await supabase.from('conversations')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
        status: 'Supabase connection failed'
      });
    }
    
    res.status(200).json({
      success: true,
      status: 'Supabase connection successful',
      count: data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      status: 'Supabase connection failed'
    });
  }
});

// @desc    Test AI models
// @route   GET /api/test/models
// @access  Public

// @desc    Test Gemini Flash API
// @route   GET /api/test/gemini
// @access  Public
router.get('/gemini', async (req, res) => {
  try {
    // Use correct Gemini model name
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        contents: [{ parts: [{ text: 'Hello, test response' }] }],
        generationConfig: { maxOutputTokens: 50 }
      })
    });
    
    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    res.status(200).json({
      success: true,
      model: 'gemini-1.5-flash-latest',
      status: responseText ? 'working' : 'error',
      response: responseText || data.error?.message || 'No response'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      model: 'gemini-1.5-flash-latest',
      status: 'error',
      error: err.message
    });
  }
});

// @desc    Test AI models
// @route   GET /api/test/models
// @access  Public
router.get('/models', async (req, res) => {
  try {
    const results = {};
    
    // Test Gemini Flash (Free)
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: [{ parts: [{ text: 'Hello, test response' }] }],
          generationConfig: { maxOutputTokens: 30 }
        })
      });
      
      const data = await response.json();
      results.geminiFlash = {
        model: 'gemini-1.5-flash-latest',
        status: data.candidates?.[0]?.content?.parts?.[0]?.text ? 'working' : 'error',
        free: true
      };
    } catch (error) {
      results.geminiFlash = {
        model: 'gemini-1.5-flash-latest',
        status: 'error',
        error: error.message,
        free: true
      };
    }
    
    // Test OpenRouter Dolphin Mistral (Free)
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
          model: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
          messages: [{ role: 'user', content: 'Hello, test response' }],
          max_tokens: 50
        })
      });
      const data = await response.json();
      results.dolphinMistral = {
        model: 'dolphin-mistral-24b',
        status: data.choices?.[0]?.message?.content ? 'working' : 'error',
        free: true
      };
    } catch (error) {
      results.dolphinMistral = {
        model: 'dolphin-mistral-24b',
        status: 'error',
        error: error.message,
        free: true
      };
    }
    
    res.status(200).json({
      success: true,
      freeModels: results,
      summary: {
        total: Object.keys(results).length,
        working: Object.values(results).filter(r => r.status === 'working').length
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// @desc    Test authentication
// @route   GET /api/test/auth
// @access  Public
router.get('/auth', async (req, res) => {
  try {
    // Create a test user
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'password123';
    
    // Sign up
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword
    });
    
    if (signupError) {
      return res.status(500).json({
        success: false,
        error: signupError.message,
        status: 'Auth test failed at signup'
      });
    }
    
    // Sign in
    const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    });
    
    if (signinError) {
      return res.status(500).json({
        success: false,
        error: signinError.message,
        status: 'Auth test failed at signin'
      });
    }
    
    // Get user
    const { data: userData, error: userError } = await supabase.auth.getUser(
      signinData.session.access_token
    );
    
    if (userError) {
      return res.status(500).json({
        success: false,
        error: userError.message,
        status: 'Auth test failed at getUser'
      });
    }
    
    res.status(200).json({
      success: true,
      status: 'Auth test successful',
      user: {
        id: userData.user.id,
        email: userData.user.email
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      status: 'Auth test failed with exception'
    });
  }
});

// @desc    Test full flow (auth + conversation)
// @route   GET /api/test/flow
// @access  Public
router.get('/flow', async (req, res) => {
  try {
    // Create a test user
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'password123';
    
    // Sign up
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword
    });
    
    if (signupError) {
      return res.status(500).json({
        success: false,
        error: signupError.message,
        step: 'signup'
      });
    }
    
    // Sign in
    const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    });
    
    if (signinError) {
      return res.status(500).json({
        success: false,
        error: signinError.message,
        step: 'signin'
      });
    }
    
    // Create a mock discussion
    const mockDiscussion = {
      userQuery: "Test query",
      promptType: "test",
      modelGroup: "Test group",
      selectedModels: ["model1", "model2"],
      initialResponses: [
        { model: "model1", text: "Test response 1" },
        { model: "model2", text: "Test response 2" }
      ],
      modelInteractions: [
        { model: "model1", respondingTo: "model2", text: "Test interaction" }
      ],
      finalConsensus: "Test consensus",
      confidence: 1.0
    };
    
    // Save conversation
    const { data: conversationData, error: conversationError } = await supabase
      .from('conversations')
      .insert([{
        user_id: signinData.user.id,
        user_query: mockDiscussion.userQuery,
        prompt_type: mockDiscussion.promptType,
        model_group: mockDiscussion.modelGroup,
        selected_models: mockDiscussion.selectedModels,
        initial_responses: mockDiscussion.initialResponses,
        model_interactions: mockDiscussion.modelInteractions,
        final_consensus: mockDiscussion.finalConsensus,
        confidence: mockDiscussion.confidence
      }])
      .select();
    
    if (conversationError) {
      return res.status(500).json({
        success: false,
        error: conversationError.message,
        step: 'conversation'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Full flow test successful',
      data: {
        user: { id: signinData.user.id, email: signinData.user.email },
        conversation: conversationData[0]
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      step: 'exception'
    });
  }
});

module.exports = router;