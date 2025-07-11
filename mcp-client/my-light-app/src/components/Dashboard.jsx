import { useState, useEffect, useRef } from 'react';
import apiService from '../services/api';

const Dashboard = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const conversationsPerPage = 10;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await apiService.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await apiService.discussWithAI(inputMessage);
      
      if (response.success && response.discussion) {
        const discussion = response.discussion;
        
        // Create clean, readable AI message
        let aiText = `${discussion.modelGroup || 'General conversation'} (${discussion.selectedModels.join(', ').toLowerCase()})\n\n`;
        
        // Add initial responses with clean formatting
        if (discussion.initialResponses && discussion.initialResponses.length > 0) {
          aiText += 'Initial Analysis:\n';
          discussion.initialResponses.forEach(resp => {
            aiText += `• ${resp.model}: ${resp.text}\n`;
          });
          aiText += '\n';
        }
        
        // Add model interactions with clean formatting
        if (discussion.modelInteractions && discussion.modelInteractions.length > 0) {
          aiText += 'Model Discussion:\n';
          discussion.modelInteractions.forEach(interaction => {
            aiText += `• ${interaction.model} (responding to ${interaction.respondingTo}): ${interaction.text}\n`;
          });
          aiText += '\n';
        }
        
        // Add final consensus with clean formatting
        const consensus = discussion.finalConsensus.replace(/\*\*/g, '').replace(/CONSENSUS:/g, 'CHAT CONSENSUS:');
        aiText += consensus;
        
        if (discussion.confidence) {
          aiText += `\n\nConfidence: ${(discussion.confidence * 100).toFixed(1)}%`;
        }
        
        const aiMessage = {
          id: Date.now() + 1,
          text: aiText,
          sender: 'ai',
          timestamp: new Date(discussion.timestamp || Date.now()),
          discussion: discussion // Store full discussion data
        };
        
        setMessages(prev => [...prev, aiMessage]);
        loadConversations(); // Refresh conversation list
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error connecting to the AI service. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectConversation = async (conv) => {
    try {
      const fullConv = await apiService.getConversation(conv.id);
      
      const userMessage = {
        id: 1,
        text: fullConv.discussion?.userQuery || fullConv.prompt || 'Previous question',
        sender: 'user',
        timestamp: new Date(fullConv.created_at || fullConv.discussion?.timestamp)
      };
      
      const aiMessage = {
        id: 2,
        text: fullConv.discussion?.finalConsensus || fullConv.response || 'Previous response',
        sender: 'ai',
        timestamp: new Date(fullConv.created_at || fullConv.discussion?.timestamp),
        discussion: fullConv.discussion
      };
      
      setMessages([userMessage, aiMessage]);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  const deleteConversation = async (id) => {
    if (window.confirm('Delete this conversation?')) {
      try {
        await apiService.deleteConversation(id);
        setConversations(prev => prev.filter(conv => conv.id !== id));
      } catch (error) {
        alert('Failed to delete conversation');
      }
    }
  };

  // Pagination logic
  const indexOfLastConv = currentPage * conversationsPerPage;
  const indexOfFirstConv = indexOfLastConv - conversationsPerPage;
  const currentConversations = conversations.slice(indexOfFirstConv, indexOfLastConv);
  const totalPages = Math.ceil(conversations.length / conversationsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50">
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-sky-200 p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            ConsensusAI Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{(user.name || user.email).charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-gray-700 font-medium">{user.name || user.email}</span>
            </div>
            <button
              onClick={async () => {
                try {
                  await apiService.signout();
                  onLogout();
                } catch (error) {
                  onLogout();
                }
              }}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-80px)] relative">
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-24 left-4 z-30 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all hover:bg-gray-50"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            )}
          </svg>
        </button>

        {/* Sidebar - Conversation History */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden absolute md:relative z-20 h-full`}>
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
              <button
                onClick={() => {
                  setMessages([]);
                  setInputMessage('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="New Chat"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {currentConversations.length === 0 ? (
              <div className="p-4 text-center">
                <div className="text-gray-400 text-sm">No conversations yet</div>
                <div className="text-xs text-gray-400 mt-1">Start chatting to see history</div>
              </div>
            ) : (
              <div className="p-2">
                {currentConversations.map(conv => (
                  <div
                    key={conv.id}
                    className="group p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors relative"
                    onClick={() => selectConversation(conv)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 font-medium truncate pr-2">
                          {conv.prompt}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(conv.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all text-gray-500 hover:text-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-3 border-t border-gray-100">
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-xs text-gray-500 px-2">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col ${sidebarOpen ? 'md:ml-0' : ''} transition-all duration-300`}>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to ConsensusAI</h3>
                  <p className="text-gray-500">Start a conversation with our AI models</p>
                </div>
              </div>
            ) : (
              <div className="pb-32">
                {messages.map(message => (
                  <div key={message.id} className={`w-full border-b border-gray-100 ${
                    message.sender === 'user' ? 'bg-white' : 'bg-gray-50/50'
                  }`}>
                    <div className="max-w-3xl mx-auto px-4 py-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white'
                              : 'bg-green-500 text-white'
                          }`}>
                            {message.sender === 'user' ? (user.name || user.email).charAt(0).toUpperCase() : 'AI'}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {message.sender === 'user' ? 'You' : 'ConsensusAI'}
                          </div>
                          <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{
                            __html: message.text
                              .replace(/\{[^}]*\}/g, '')
                              .replace(/^([^\n]+)\s*\(([^)]+)\)/gm, '<div class="font-semibold text-base mb-3 text-sky-600">$1 <span class="text-xs font-normal text-gray-500">($2)</span></div>')
                              .replace(/^(Initial Analysis|Model Discussion|CHAT CONSENSUS):/gm, '<div class="font-semibold text-sm mt-4 mb-2 text-gray-700 border-l-4 border-sky-500 pl-3">$1</div>')
                              .replace(/^• ([^:]+):/gm, '<div class="ml-4 mb-2">• <span class="font-medium text-gray-700">$1</span>:')
                              .replace(/\n\n/g, '</div><div class="mb-3">')
                              .replace(/\n/g, '<br>')
                              .replace(/^/, '<div class="mb-3">')
                              .replace(/$/, '</div>')
                              .trim()
                          }} />
                          <div className="text-xs text-gray-400 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
                {isLoading && (
                  <div className="w-full bg-gray-50/50 border-b border-gray-100">
                    <div className="max-w-3xl mx-auto px-4 py-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                            AI
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">ConsensusAI</div>
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sky-500"></div>
                            <span className="text-gray-600 text-sm">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-3 bg-gray-50 rounded-3xl p-3 border border-gray-200 focus-within:border-sky-500 transition-colors">
                <textarea
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Message ConsensusAI..."
                  className="flex-1 bg-transparent border-none outline-none resize-none text-gray-800 placeholder-gray-500 text-sm leading-6"
                  rows={1}
                  disabled={isLoading}
                  style={{ minHeight: '24px', maxHeight: '120px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className={`p-2 rounded-full transition-all ${
                    inputMessage.trim() && !isLoading
                      ? 'bg-sky-500 hover:bg-sky-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-400 text-center">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;