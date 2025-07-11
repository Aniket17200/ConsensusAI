const StatsSection = () => {
  const stats = [
    { number: "10K+", label: "Active Users", icon: "👥", gradient: "from-blue-500 to-cyan-500" },
    { number: "50K+", label: "Discussions", icon: "💬", gradient: "from-green-500 to-emerald-500" },
    { number: "99.9%", label: "Uptime", icon: "⚡", gradient: "from-yellow-500 to-orange-500" },
    { number: "4.9/5", label: "Rating", icon: "⭐", gradient: "from-purple-500 to-pink-500" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-gray-300">Real numbers from real users</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`bg-gradient-to-r ${stat.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl`}>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;