import { useState } from 'react';
import apiService from '../services/api';

const ModelInteraction = ({ prompt }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const models = [
    { id: 'gemini', name: 'Gemini', icon: '💎', color: 'from-purple-500 to-pink-500' },
    { id: 'gpt', name: 'GPT-4', icon: '🤖', color: 'from-green-500 to-blue-500' },
    { id: 'claude', name: 'Claude', icon: '🧠', color: 'from-blue-500 to-indigo-500' },
    { id: 'llama', name: 'LLaMA', icon: '🦙', color: 'from-orange-500 to-red-500' }
  ];

  const handleDiscussion = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResponses([]);

    try {
      const response = await apiService.discussWithAI(prompt);
      
      // Simulate individual model responses
      const modelResponses = models.map((model, index) => ({
        ...model,
        response: `${model.name}: ${response.response.substring(0, 150)}...`,
        timestamp: new Date(Date.now() + index * 1000)
      }));

      // Add responses with delay for animation effect
      modelResponses.forEach((modelResponse, index) => {
        setTimeout(() => {
          setResponses(prev => [...prev, modelResponse]);
        }, index * 800);
      });

    } catch (error) {
      console.error('Discussion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">AI Model Discussion</h3>
        <button
          onClick={handleDiscussion}
          disabled={loading || !prompt.trim()}
          className="bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {loading ? 'Processing...' : 'Start Discussion'}
        </button>
      </div>

      {prompt && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-1">User Prompt:</p>
          <p className="text-gray-900">{prompt}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {models.map((model) => {
          const response = responses.find(r => r.id === model.id);
          return (
            <div
              key={model.id}
              className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                response 
                  ? `bg-gradient-to-r ${model.color} text-white transform scale-105` 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{model.icon}</span>
                <h4 className={`font-semibold ${response ? 'text-white' : 'text-gray-700'}`}>
                  {model.name}
                </h4>
                {loading && !response && (
                  <div className="ml-auto">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sky-500"></div>
                  </div>
                )}
              </div>
              
              {response ? (
                <div>
                  <p className={`text-sm ${response ? 'text-white/90' : 'text-gray-600'} mb-2`}>
                    {response.response}
                  </p>
                  <p className={`text-xs ${response ? 'text-white/70' : 'text-gray-400'}`}>
                    {response.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Waiting for response...</p>
              )}
            </div>
          );
        })}
      </div>

      {responses.length === models.length && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">🎯 Consensus Reached</h4>
          <p className="text-green-700 text-sm">
            All AI models have provided their perspectives. The discussion is complete!
          </p>
        </div>
      )}
    </div>
  );
};

export default ModelInteraction;