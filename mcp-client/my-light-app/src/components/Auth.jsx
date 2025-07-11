import { useState } from 'react';
import apiService from '../services/api';
import ParticleField from './ParticleField';
import Navbar from './Navbar';

const Auth = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      let userData;
      if (isLogin) {
        const response = await apiService.signin({
          email: formData.email,
          password: formData.password
        });
        userData = response.user || { email: formData.email };
      } else {
        const response = await apiService.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        userData = response.user || { name: formData.name, email: formData.email };
      }
      
      // Always call onLogin with user data
      onLogin(userData);
    } catch (error) {
      setError(error.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 relative overflow-hidden">
      <ParticleField />
      
      {/* Navbar without login buttons */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-sky-200 p-4 relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-sky-100 rounded-lg transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform inline-block">←</span>
            </button>
            <div className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              ConsensusAI
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-sky-600 hover:text-sky-700 font-semibold"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-20 w-36 h-36 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-20 animate-pulse delay-2000"></div>
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 relative z-10">
        <div className="w-full max-w-lg">
          {/* Main Auth Card */}
          <div className="bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl p-8 md:p-10 shadow-2xl transform hover:scale-105 transition-all duration-500 w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-block p-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl mb-6 shadow-xl">
                <span className="text-4xl text-white">{isLogin ? '🔐' : '🚀'}</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-3">
                {isLogin ? 'Welcome Back!' : 'Join ConsensusAI'}
              </h1>
              <p className="text-gray-600 text-lg">
                {isLogin 
                  ? 'Sign in to access your AI discussions' 
                  : 'Create your account and start exploring'
                }
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div className="flex items-center">
                  <span className="text-red-500 text-xl mr-3">⚠️</span>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-5 bg-white/50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all backdrop-blur-sm"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    👤
                  </div>
                </div>
              )}
              
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-5 bg-white/50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all backdrop-blur-sm"
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📧
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full p-5 bg-white/50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all backdrop-blur-sm"
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔒
                </div>
              </div>



              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⏳</span>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? '🔐 Sign In' : '🚀 Create Account'}
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-600">
              By {isLogin ? 'signing in' : 'signing up'}, you agree to our{' '}
              <span className="text-sky-600">Terms of Service</span>
              {' '}and{' '}
              <span className="text-sky-600">Privacy Policy</span>
            </div>
          </div>

          {/* Toggle Option */}
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-sky-600 hover:text-sky-700 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;