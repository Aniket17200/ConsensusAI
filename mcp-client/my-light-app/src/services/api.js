const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('authToken');
    this.user = JSON.parse(localStorage.getItem('userData') || 'null');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
  }

  setUser(user) {
    this.user = user;
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  }

  async signup(userData) {
    try {
      const response = await this.request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      
      // Set token if received
      if (response.token) {
        this.setToken(response.token);
      } else {
        // For demo purposes, create a mock token
        this.setToken('demo-token-' + Date.now());
      }
      
      const user = response.user || { email: userData.email, name: userData.name };
      this.setUser(user);
      
      return {
        user,
        token: response.token || 'demo-token'
      };
    } catch (error) {
      // For demo purposes, allow signup even if backend is not available
      const mockToken = 'demo-token-' + Date.now();
      this.setToken(mockToken);
      const user = { email: userData.email, name: userData.name };
      this.setUser(user);
      return {
        user,
        token: mockToken
      };
    }
  }

  async signin(credentials) {
    try {
      const response = await this.request('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      // Set token if received
      if (response.token) {
        this.setToken(response.token);
      } else {
        // For demo purposes, create a mock token
        this.setToken('demo-token-' + Date.now());
      }
      
      const user = response.user || { email: credentials.email };
      this.setUser(user);
      
      return {
        user,
        token: response.token || 'demo-token'
      };
    } catch (error) {
      // For demo purposes, allow login even if backend is not available
      const mockToken = 'demo-token-' + Date.now();
      this.setToken(mockToken);
      const user = { email: credentials.email };
      this.setUser(user);
      return {
        user,
        token: mockToken
      };
    }
  }

  async signout() {
    await this.request('/auth/signout', { method: 'POST' });
    this.setToken(null);
    this.setUser(null);
  }

  async getCurrentUser() {
    if (this.user) {
      return this.user;
    }
    return this.request('/auth/me');
  }

  async discussWithAI(prompt) {
    try {
      // First get discussion from /api/discuss
      const discussResponse = await this.request('/discuss', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });
      
      // Save the conversation (API or local storage)
      if (discussResponse.success) {
        try {
          if (this.token) {
            // Try to save to API first
            await this.request('/conversations', {
              method: 'POST',
              body: JSON.stringify({ discussion: discussResponse.discussion }),
            });
          }
        } catch (saveError) {
          console.log('Failed to save to API, saving locally:', saveError);
        }
        // Always save locally as backup
        this.saveConversationLocally(discussResponse.discussion);
      }
      
      return discussResponse;
    } catch (error) {
      console.log('API not available, providing mock response');
      // Mock response matching the expected structure
      const mockResponse = {
        success: true,
        discussion: {
          userQuery: prompt,
          promptType: 'chat',
          modelGroup: 'General conversation',
          selectedModels: ['gemini', 'llama2-7b', 'mistral-7b'],
          initialResponses: [
            { model: 'gemini', text: `Here's my analysis of your question: "${prompt}". This is a thoughtful response from Gemini.`, latency: 1.2 },
            { model: 'llama2-7b', text: `LLaMA's perspective: I understand you're asking about "${prompt}". Here's my comprehensive analysis.`, latency: 1.5 },
            { model: 'mistral-7b', text: `Mistral analysis: Regarding "${prompt}", I can provide additional insights and context.`, latency: 1.3 }
          ],
          modelInteractions: [
            { model: 'llama2-7b', respondingTo: 'gemini', text: 'I agree with Gemini\'s approach and would add more technical details.' },
            { model: 'mistral-7b', respondingTo: 'llama2-7b', text: 'Building on both perspectives, here\'s a synthesis of the key points.' }
          ],
          finalConsensus: `CHAT CONSENSUS: Based on 3 model analysis - Here's a comprehensive answer to "${prompt}". All models agree that this is a well-structured response combining multiple AI perspectives for better accuracy and completeness.`,
          confidence: 0.95,
          timestamp: new Date().toISOString()
        }
      };
      
      // Save mock response locally
      this.saveConversationLocally(mockResponse.discussion);
      return mockResponse;
    }
  }

  async getConversations() {
    try {
      const response = await this.request('/conversations');
      return response;
    } catch (error) {
      console.log('Failed to load conversations from API, using local storage');
      // Fallback to local storage
      const localConversations = localStorage.getItem('conversations');
      return localConversations ? JSON.parse(localConversations) : [];
    }
  }

  saveConversationLocally(discussion) {
    try {
      const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
      const newConversation = {
        id: Date.now(),
        prompt: discussion.userQuery,
        response: discussion.finalConsensus,
        discussion: discussion,
        created_at: discussion.timestamp || new Date().toISOString()
      };
      conversations.unshift(newConversation); // Add to beginning
      localStorage.setItem('conversations', JSON.stringify(conversations.slice(0, 50))); // Keep only last 50
      return newConversation;
    } catch (error) {
      console.error('Failed to save conversation locally:', error);
      return null;
    }
  }

  async getConversation(id) {
    return this.request(`/conversations/${id}`);
  }

  async deleteConversation(id) {
    try {
      // Try to delete from API first
      await this.request(`/conversations/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.log('Failed to delete from API:', error);
    }
    
    // Always delete from local storage
    try {
      const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
      const updatedConversations = conversations.filter(conv => conv.id !== id);
      localStorage.setItem('conversations', JSON.stringify(updatedConversations));
    } catch (error) {
      console.error('Failed to delete from local storage:', error);
    }
  }
}

export default new ApiService();