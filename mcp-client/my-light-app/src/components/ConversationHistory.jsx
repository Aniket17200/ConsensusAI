import { useState, useEffect } from 'react';
import apiService from '../services/api';

const ConversationHistory = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await apiService.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this conversation?')) {
      try {
        await apiService.deleteConversation(id);
        setConversations(prev => prev.filter(conv => conv.id !== id));
      } catch (error) {
        alert('Failed to delete conversation');
      }
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Conversations</h3>
      {conversations.length === 0 ? (
        <p className="text-gray-400">No conversations yet</p>
      ) : (
        <div className="space-y-2">
          {conversations.map(conv => (
            <div
              key={conv.id}
              className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              onClick={() => onSelectConversation(conv)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-white text-sm truncate">{conv.prompt}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(conv.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(conv.id);
                  }}
                  className="text-red-400 hover:text-red-300 ml-2"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationHistory;