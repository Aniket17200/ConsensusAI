import { useState } from 'react';

const Navbar = ({ currentPage, onPageChange, onAuthClick, isAuthPage = false, onBack }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              ConsensusAI
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-sky-600 border-b-2 border-sky-500'
                      : 'text-gray-700 hover:text-sky-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthPage ? (
              <>
                {onBack && (
                  <button
                    onClick={onBack}
                    className="text-sky-600 hover:text-sky-700 px-4 py-2 text-sm font-medium flex items-center"
                  >
                    ← Back to Home
                  </button>
                )}
                <button
                  disabled
                  className="text-gray-400 px-4 py-2 text-sm font-medium cursor-not-allowed"
                >
                  Login
                </button>
                <button
                  disabled
                  className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onAuthClick('login')}
                  className="text-sky-600 hover:text-sky-700 px-4 py-2 text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => onAuthClick('signup')}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-sky-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block px-3 py-2 text-base font-medium w-full text-left ${
                  currentPage === item.id ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isAuthPage ? (
                <>
                  {onBack && (
                    <button
                      onClick={onBack}
                      className="block px-3 py-2 text-base font-medium text-sky-600 w-full text-left"
                    >
                      ← Back to Home
                    </button>
                  )}
                  <button
                    disabled
                    className="block px-3 py-2 text-base font-medium text-gray-400 w-full text-left cursor-not-allowed"
                  >
                    Login
                  </button>
                  <button
                    disabled
                    className="block px-3 py-2 text-base font-medium bg-gray-300 text-gray-500 rounded-lg mt-2 mx-3 cursor-not-allowed"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onAuthClick('login')}
                    className="block px-3 py-2 text-base font-medium text-sky-600 w-full text-left"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => onAuthClick('signup')}
                    className="block px-3 py-2 text-base font-medium bg-sky-500 text-white rounded-lg mt-2 mx-3"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;