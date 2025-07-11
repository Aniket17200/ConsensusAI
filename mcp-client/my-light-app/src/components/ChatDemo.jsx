const ChatDemo = () => {
  const chatMessages = [
    {
      model: "User",
      message: "What are the benefits of renewable energy?",
      avatar: "👤",
      gradient: "from-gray-400 to-gray-600",
      bgGradient: "from-gray-50 to-gray-100",
      shadow: "shadow-gray-200"
    },
    {
      model: "Gemini",
      message: "Renewable energy offers significant environmental benefits by reducing greenhouse gas emissions and air pollution. It also provides energy security and creates jobs in emerging green industries.",
      avatar: "💎",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      shadow: "shadow-purple-200"
    },
    {
      model: "GPT-4",
      message: "I agree with Gemini's points. Additionally, renewable energy sources like solar and wind have become increasingly cost-effective, often cheaper than fossil fuels in many regions.",
      avatar: "🤖",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      shadow: "shadow-green-200"
    },
    {
      model: "Claude",
      message: "Both excellent points. I'd add that renewable energy also promotes energy independence, reducing reliance on imported fuels and protecting against price volatility in global energy markets.",
      avatar: "🧠",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      shadow: "shadow-blue-200"
    },
    {
      model: "LLaMA",
      message: "Great insights from everyone. Renewable energy also drives technological innovation and can provide electricity access to remote areas through distributed generation systems.",
      avatar: "🦙",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      shadow: "shadow-orange-200"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-sky-50 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-6">
            AI Models Discussion
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how multiple AI models collaborate to provide comprehensive answers
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10 transform hover:scale-[1.02] transition-all duration-500">
          <div className="space-y-8">
            {chatMessages.map((chat, index) => (
              <div key={index} className={`flex items-start space-x-6 transform hover:scale-105 transition-all duration-300 hover:${chat.shadow} hover:shadow-lg`}>
                <div className={`bg-gradient-to-br ${chat.gradient} p-4 rounded-2xl flex-shrink-0 shadow-lg transform hover:rotate-6 transition-all duration-300`}>
                  <span className="text-2xl">{chat.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <h4 className={`font-bold text-lg bg-gradient-to-r ${chat.gradient} bg-clip-text text-transparent mr-3`}>{chat.model}</h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {new Date(Date.now() - (chatMessages.length - index) * 30000).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className={`bg-gradient-to-br ${chat.bgGradient} p-6 rounded-2xl shadow-md border border-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                    <p className="text-gray-800 leading-relaxed">{chat.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border border-green-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-500 p-2 rounded-full mr-3 shadow-md">
                  <span className="text-white text-lg">✅</span>
                </div>
                <span className="text-green-800 font-bold text-lg">Discussion Complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-green-700 bg-green-200 px-3 py-1 rounded-full">4 AI models contributed</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;