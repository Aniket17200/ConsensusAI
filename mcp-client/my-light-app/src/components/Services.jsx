import ParticleField from './ParticleField';

const Services = () => {
  const services = [
    {
      icon: '🤖',
      title: 'Multi-Model Discussion',
      description: 'Get consensus responses from multiple AI models working together for balanced, comprehensive insights.',
      features: ['4 AI Models Integration', 'Real-time Consensus', 'Balanced Perspectives', 'Quality Assurance'],
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      popular: true
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Advanced analytics and insights into your AI usage patterns, conversation history, and performance metrics.',
      features: ['Usage Analytics', 'Conversation History', 'Performance Metrics', 'Export Reports'],
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      popular: false
    },
    {
      icon: '🔧',
      title: 'API Integration',
      description: 'Integrate ConsensusAI into your existing workflows with our powerful, developer-friendly API.',
      features: ['REST API Access', 'Webhook Support', 'Custom Endpoints', 'Developer Documentation'],
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
      popular: false
    },
    {
      icon: '🛡️',
      title: 'Enterprise Security',
      description: 'Enterprise-grade security, compliance, and dedicated support for large organizations.',
      features: ['End-to-end Encryption', 'GDPR Compliant', 'Open Source', 'Community Support'],
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      popular: false
    }
  ];

  const additionalFeatures = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-second response times' },
    { icon: '🌍', title: 'Open Source', desc: 'Completely free and transparent' },
    { icon: '🔄', title: 'Auto Updates', desc: 'Always latest AI models' },
    { icon: '🛡️', title: 'Privacy First', desc: 'Your data stays secure' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 relative overflow-hidden">
      <ParticleField />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block p-6 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl mb-8">
              <span className="text-6xl">🚀✨</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Our Services
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                Free & Open Source AI Platform
              </span>
              <br />
              Powerful multi-model AI discussions available to everyone
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            {services.map((service, index) => (
              <div key={index} className={`group relative bg-gradient-to-br ${service.bgGradient} p-10 rounded-3xl shadow-2xl border border-white/50 transform hover:scale-105 transition-all duration-500 ${service.popular ? 'ring-4 ring-green-400 ring-opacity-50' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      🌟 Most Popular
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-center mb-6">
                  <div className={`bg-gradient-to-r ${service.gradient} w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform duration-300`}>
                    <span className="text-3xl text-white">{service.icon}</span>
                  </div>
                </div>
                
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-4`}>
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">{service.description}</p>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-bold text-gray-900 text-lg">What's Included:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className={`bg-gradient-to-r ${service.gradient} w-6 h-6 rounded-full flex items-center justify-center mr-3 shadow-md`}>
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className={`w-full bg-gradient-to-r ${service.gradient} text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-lg`}>
                  Learn More
                </button>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                Why Choose Us?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built for performance, security, and scale
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="group text-center">
                  <div className="bg-gradient-to-r from-sky-500 to-blue-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl">
                    <span className="text-3xl text-white">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-5xl font-bold text-white mb-6">Open Source & Free</h2>
              <p className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                ConsensusAI is completely free and open source. Contribute to the project or deploy your own instance.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="bg-white text-gray-900 px-12 py-5 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-110 shadow-2xl">
                  🚀 Get Started
                </button>
                <button className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:from-sky-600 hover:to-blue-600 transition-all transform hover:scale-110 shadow-2xl">
                  📂 View on GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;