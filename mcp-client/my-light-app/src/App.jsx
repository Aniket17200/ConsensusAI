import { useState, useEffect } from 'react'
import apiService from './services/api'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (apiService.token && apiService.user) {
          setUser(apiService.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Auth check failed:', error.message);
        apiService.setToken(null);
        apiService.setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    console.log('Login handler called with:', userData);
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuth(false);
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setCurrentPage('home')
    apiService.setToken(null)
    apiService.setUser(null)
  }

  const handleAuthClick = (type) => {
    setShowAuth(true)
  }

  const handleGetStarted = () => {
    setShowAuth(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  if (showAuth) {
    return <Auth onLogin={handleLogin} onBack={() => setShowAuth(false)} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onGetStarted={handleGetStarted} />
      case 'about':
        return <About />
      case 'services':
        return <Services />
      case 'contact':
        return <Contact />
      default:
        return <Home onGetStarted={handleGetStarted} />
    }
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <Navbar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
          onAuthClick={handleAuthClick} 
        />
        {renderPage()}
      </div>
    </ErrorBoundary>
  )
}

export default App
