import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Tutors from './pages/Tutors/Tutors';
import Profile from './pages/Profile/Profile';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import Auth from './pages/Auth/Auth';

// Context and styles
import useStore from './context/store';
import './styles/global.scss';

function App() {
  const { setUser, isAuthenticated } = useStore();

  useEffect(() => {
    // Check for existing auth token on app load
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you'd validate the token with your API
      // For now, we'll just set a mock user
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: null,
      });
    }
  }, [setUser]);

  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main className="app__main">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tutors" element={<Tutors />} />
              <Route path="/tutors/:id" element={<Profile />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/:tutorId" element={<Booking />} />
              
              {/* Protected routes */}
              {isAuthenticated && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              )}
              
              {/* Auth routes */}
              <Route path="/auth/login" element={<Auth type="login" />} />
              <Route path="/auth/register" element={<Auth type="register" />} />
              
              {/* Help/Support */}
              <Route path="/help" element={<div>Help Page Coming Soon</div>} />
              
              {/* 404 fallback */}
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
