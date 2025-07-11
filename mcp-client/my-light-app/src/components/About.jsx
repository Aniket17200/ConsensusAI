import ParticleField from './ParticleField';

const About = () => {
  const teamMembers = [
    { name: "AI Research", role: "Core Technology", avatar: "🤖", gradient: "from-blue-500 to-cyan-500" },
    { name: "Data Science", role: "Model Training", avatar: "📊", gradient: "from-green-500 to-emerald-500" },
    { name: "Engineering", role: "Platform Development", avatar: "⚙️", gradient: "from-purple-500 to-pink-500" },
    { name: "Security", role: "Privacy & Safety", avatar: "🛡️", gradient: "from-orange-500 to-red-500" }
  ];

  const milestones = [
    { year: "2023", title: "Founded", desc: "ConsensusAI was born", icon: "🚀" },
    { year: "2024", title: "Launch", desc: "Public beta release", icon: "🌟" },
    { year: "2024", title: "Growth", desc: "10K+ active users", icon: "📈" },
    { year: "2025", title: "Future", desc: "Global expansion", icon: "🌍" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 relative overflow-hidden">
      <ParticleField />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block p-6 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl mb-8">
              <span className="text-6xl">🧠✨</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              About ConsensusAI
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                Multi-Model AI Discussion System
              </span>
              <br />
              Combining multiple AI perspectives for comprehensive, balanced insights
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  ConsensusAI revolutionizes AI interaction by combining multiple AI models to provide 
                  <span className="font-semibold text-sky-600"> balanced, comprehensive responses</span> to your queries.
                </p>
                <p>
                  By leveraging different AI perspectives from <span className="font-semibold text-purple-600">Gemini, GPT-4, Claude, and LLaMA</span>, 
                  we deliver more nuanced and reliable insights than any single model could provide.
                </p>
                <p>
                  Our platform creates a <span className="font-semibold text-green-600">collaborative intelligence ecosystem</span> 
                  that goes beyond traditional AI limitations.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-white to-sky-50 p-12 rounded-3xl shadow-2xl border border-white/50 transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-sky-500 to-purple-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <span className="text-4xl text-white">🚀</span>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Innovation First
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Cutting-edge AI technology at your fingertips with enterprise-grade reliability
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                Our Expertise
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built by experts in AI, data science, and engineering
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="group text-center">
                  <div className={`bg-gradient-to-r ${member.gradient} w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl`}>
                    <span className="text-3xl text-white">{member.avatar}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600">Key milestones in our mission</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/50 text-center transform hover:scale-105 transition-all duration-300">
                    <div className="text-4xl mb-4">{milestone.icon}</div>
                    <div className="text-3xl font-bold text-sky-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.desc}</p>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-sky-500 to-purple-500"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Open Source Section */}
          <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Open Source & Community Driven</h2>
              <p className="text-xl text-gray-300">Built by developers, for developers</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl">
                  <span className="text-3xl text-white">📂</span>
                </div>
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-300 text-lg">Open Source</div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl">
                  <span className="text-3xl text-white">🌐</span>
                </div>
                <div className="text-4xl font-bold text-white mb-2">Free</div>
                <div className="text-gray-300 text-lg">Forever</div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl">
                  <span className="text-3xl text-white">🚀</span>
                </div>
                <div className="text-4xl font-bold text-white mb-2">MIT</div>
                <div className="text-gray-300 text-lg">License</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;