import { useState } from 'react';
import ParticleField from './ParticleField';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'aniketgaikwad72002@gmail.com',
      description: 'Send us an email anytime',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+91 70582 93067',
      description: 'Call us for immediate support',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: '🏢',
      title: 'Office',
      value: 'Mumbai, Maharashtra, India',
      description: 'Visit our headquarters',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      icon: '⏰',
      title: 'Hours',
      value: '24/7 Support',
      description: 'We\'re always here to help',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ];

  const socialLinks = [
    { icon: '💼', name: 'LinkedIn', gradient: 'from-blue-600 to-blue-700' },
    { icon: '🐦', name: 'Twitter', gradient: 'from-sky-400 to-sky-500' },
    { icon: '📘', name: 'Facebook', gradient: 'from-blue-500 to-blue-600' },
    { icon: '📸', name: 'Instagram', gradient: 'from-pink-500 to-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 relative overflow-hidden">
      <ParticleField />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block p-6 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl mb-8">
              <span className="text-6xl">📞✨</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Contact Us
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                Have questions?
              </span>
              <br />
              We'd love to hear from you. Get in touch and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div key={index} className={`group bg-gradient-to-br ${method.bgGradient} p-8 rounded-3xl shadow-xl border border-white/50 transform hover:scale-105 hover:-rotate-1 transition-all duration-500`}>
                <div className={`bg-gradient-to-r ${method.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                  <span className="text-2xl text-white">{method.icon}</span>
                </div>
                <h3 className={`text-xl font-bold bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent mb-2 text-center`}>
                  {method.title}
                </h3>
                <p className="text-gray-900 font-semibold text-center mb-2">{method.value}</p>
                <p className="text-gray-600 text-sm text-center">{method.description}</p>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/50">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Send us a Message
                </h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-2xl">
                  <div className="flex items-center">
                    <span className="text-green-600 text-2xl mr-3">✅</span>
                    <div>
                      <p className="text-green-800 font-semibold">Message Sent Successfully!</p>
                      <p className="text-green-600 text-sm">We'll get back to you soon.</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-white/50 backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-white/50 backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-white/50 backdrop-blur-sm resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-5 px-8 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <>
                        <span className="inline-block animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        🚀 Send Message
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Quick Response */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl shadow-xl border border-white/50">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-2xl text-white">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-800">Quick Response</h3>
                    <p className="text-green-600">We typically respond within 2-4 hours</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our dedicated support team is committed to providing you with fast, helpful responses. 
                  For urgent matters, please call us directly.
                </p>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl shadow-xl border border-white/50">
                <h3 className="text-2xl font-bold text-purple-800 mb-6">Follow Us</h3>
                <p className="text-gray-700 mb-6">Stay updated with our latest news and updates</p>
                <div className="grid grid-cols-4 gap-4">
                  {socialLinks.map((social, index) => (
                    <button key={index} className={`bg-gradient-to-r ${social.gradient} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl shadow-xl border border-white/50">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-2xl text-white">❓</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-800">Need Quick Answers?</h3>
                    <p className="text-blue-600">Check our FAQ section</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg">
                  View FAQ →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;