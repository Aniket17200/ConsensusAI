const AIModelCard = ({ model, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected
          ? 'bg-gradient-to-r ' + model.color + ' shadow-2xl'
          : 'bg-white/10 hover:bg-white/20 border border-white/20'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">{model.icon}</div>
        <div className="flex-1">
          <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-white'}`}>
            {model.name}
          </h3>
          <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
            {model.description}
          </p>
        </div>
        {isSelected && (
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default AIModelCard;