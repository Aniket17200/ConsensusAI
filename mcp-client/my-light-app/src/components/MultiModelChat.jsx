import { useState } from 'react';
import apiService from '../services/api';

const MultiModelChat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const result = await apiService.discussWithAI(prompt);
      setResponse(result);
      setPrompt('');
    } catch (error) {
      alert('Failed to get AI response: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
          Multi-Model AI Discussion
        </h2>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ask your question to multiple AI models:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your question or topic for discussion..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
              rows={4}
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
          >
            {loading ? 'Getting Consensus...' : 'Start Discussion'}
          </button>
        </form>

        {response && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Consensus Response</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{response.response}</p>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Generated on {new Date(response.timestamp || Date.now()).toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiModelChat;