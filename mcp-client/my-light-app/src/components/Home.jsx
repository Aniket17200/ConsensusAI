import ParticleField from './ParticleField';
import ChatDemo from './ChatDemo';
import StatsSection from './StatsSection';

const Home = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 relative overflow-hidden">
      <ParticleField />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-20 animate-pulse delay-2000"></div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 relative z-10">
              <div className="inline-block p-4 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl mb-6">
                <span className="text-6xl">🤖💎🧠🦙</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 relative z-10">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Welcome to </span>
              <br />
              <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                ConsensusAI
              </span>
            </h1>
            <p className="text-2xl text-gray-700 mb-12 max-w-4xl mx-auto relative z-10 leading-relaxed">
              <span className="font-semibold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">Multi-Model AI Discussion System</span>
              <br />
              Get comprehensive, balanced responses from multiple AI models working together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-12 py-5 rounded-2xl text-xl font-bold transition-all transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-sky-500/25 relative overflow-hidden group"
              >
                <span className="relative z-10">🚀 Start Discussion</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button className="bg-white/80 backdrop-blur-lg text-gray-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white transition-all transform hover:scale-105 shadow-lg border border-white/50">
                📺 Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">Why Choose ConsensusAI?</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">Powerful features for modern AI interactions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-white to-sky-50 hover:from-sky-50 hover:to-blue-50 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 shadow-xl hover:shadow-2xl border border-white/50">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <span className="text-3xl text-white">🤖</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Multi-Model Consensus</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Get balanced responses from multiple AI models working together for comprehensive insights</p>
            </div>
            
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-white to-green-50 hover:from-green-50 hover:to-emerald-50 transition-all duration-500 transform hover:scale-105 hover:rotate-1 shadow-xl hover:shadow-2xl border border-white/50">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <span className="text-3xl text-white">⚡</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">Fast & Reliable</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Lightning-fast responses with 99.9% uptime and enterprise-grade reliability</p>
            </div>
            
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 shadow-xl hover:shadow-2xl border border-white/50">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <span className="text-3xl text-white">🔒</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">Secure & Private</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Your conversations are encrypted and private with enterprise-grade security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Demo Section */}
      <ChatDemo />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-sky-500 via-blue-600 to-purple-700 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-2xl text-sky-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users already using ConsensusAI to get better AI responses
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={onGetStarted}
                className="bg-white text-sky-600 px-12 py-5 rounded-2xl text-xl font-bold hover:bg-gray-50 transition-all transform hover:scale-110 shadow-2xl hover:shadow-white/25 group relative overflow-hidden"
              >
                <span className="relative z-10">🚀 Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <div className="flex items-center space-x-4 text-white">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sky-100">Join 10,000+ users</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;