const express = require('express');
const supabase = require('../supabase/client');
const router = express.Router();

// @desc    Sign up with email and password
// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide email and password' 
      });
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });
    
    if (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    res.status(201).json({
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

// @desc    Sign in with email and password
// @route   POST /api/auth/signin
// @access  Public
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide email and password' 
      });
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return res.status(401).json({ 
        success: false, 
        error: error.message 
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

// @desc    Sign out
// @route   POST /api/auth/signout
// @access  Private
router.post('/signout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Signed out successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide email' 
      });
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.PASSWORD_RESET_URL || `${req.protocol}://${req.get('host')}/reset-password`
    });
    
    if (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

// @desc    Reset password with token
// @route   POST /api/auth/reset-password
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide new password' 
      });
    }
    
    // The token is automatically handled by Supabase when using the session
    const { error } = await supabase.auth.updateUser({
      password: password
    });
    
    if (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(
      req.headers.authorization?.split(' ')[1]
    );
    
    if (error || !user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

module.exports = router;