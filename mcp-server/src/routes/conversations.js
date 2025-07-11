const express = require('express');
const supabase = require('../supabase/client');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// @desc    Save a conversation
// @route   POST /api/conversations
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { discussion } = req.body;
    
    if (!discussion) {
      return res.status(400).json({ 
        success: false, 
        error: 'Discussion data is required' 
      });
    }
    
    // Insert conversation into Supabase
    const { data, error } = await supabase
      .from('conversations')
      .insert([{
        user_id: req.user.id,
        user_query: discussion.userQuery,
        prompt_type: discussion.promptType,
        model_group: discussion.modelGroup,
        selected_models: discussion.selectedModels,
        initial_responses: discussion.initialResponses,
        model_interactions: discussion.modelInteractions,
        model_reasoning: discussion.modelReasoning,
        final_consensus: discussion.finalConsensus,
        confidence: discussion.confidence,
        created_at: new Date().toISOString()
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    res.status(201).json({
      success: true,
      data: data[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

// @desc    Get all conversations for a user
// @route   GET /api/conversations
// @access  Private
router.get('/', async (req, res) => {
  try {
    // Get conversations from Supabase
    const { data, error, count } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    res.status(200).json({
      success: true,
      count: count || data.length,
      data
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

// @desc    Get a single conversation
// @route   GET /api/conversations/:id
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    // Get conversation from Supabase
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();
    
    if (error || !data) {
      return res.status(404).json({ 
        success: false, 
        error: 'Conversation not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

// @desc    Delete a conversation
// @route   DELETE /api/conversations/:id
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    // Check if conversation exists and belongs to user
    const { data: conversation, error: fetchError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();
    
    if (fetchError || !conversation) {
      return res.status(404).json({ 
        success: false, 
        error: 'Conversation not found' 
      });
    }
    
    // Delete conversation
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', req.params.id);
    
    if (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

module.exports = router;