import { useState } from 'react';

const PromptInput = ({ onPromptSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onPromptSubmit(prompt);
    }
  };

  const samplePrompts = [
    "Explain quantum computing in simple terms",
    "What are the benefits of renewable energy?",
    "How does artificial intelligence work?",
    "Compare different programming languages"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Start AI Discussion</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your question or topic:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything you want multiple AI models to discuss..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
        
        <button
          type="submit"
          disabled={!prompt.trim()}
          className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
        >
          Start Multi-Model Discussion
        </button>
      </form>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 mb-3">Try these sample prompts:</p>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((sample, index) => (
            <button
              key={index}
              onClick={() => setPrompt(sample)}
              className="text-xs bg-sky-50 hover:bg-sky-100 text-sky-700 px-3 py-2 rounded-lg transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;