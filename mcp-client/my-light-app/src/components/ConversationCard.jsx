const ConversationCard = ({ conversation, onClick }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer border border-gray-200 hover:border-sky-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="bg-sky-100 p-2 rounded-lg mr-3">
            <span className="text-sky-600 text-lg">💬</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">AI Discussion</h3>
            <p className="text-xs text-gray-500">{formatDate(conversation.created_at)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs">🤖</span>
          <span className="text-xs">💎</span>
          <span className="text-xs">🧠</span>
          <span className="text-xs">🦙</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Prompt:</p>
        <p className="text-gray-900 text-sm line-clamp-2">{conversation.prompt}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Consensus Response:</p>
        <p className="text-gray-700 text-sm line-clamp-3">
          {conversation.response?.substring(0, 120)}...
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            ✓ Complete
          </span>
          <span className="text-xs text-gray-500">4 models</span>
        </div>
        <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default ConversationCard;