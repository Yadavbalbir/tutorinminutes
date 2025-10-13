import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Search, BookOpen, MessageCircle, Bell } from 'lucide-react';
import useStore from '../../context/store';
import './Navbar.scss';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const { 
    user, 
    isAuthenticated, 
    notifications, 
    setUser 
  } = useStore();

  const navigationItems = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Find Tutors', path: '/tutors', icon: Search },
    { name: 'Book Session', path: '/booking', icon: BookOpen },
    { name: 'Dashboard', path: '/dashboard', icon: User, authRequired: true },
    { name: 'Help', path: '/help', icon: MessageCircle },
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/');
    setShowProfileDropdown(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMobileMenu}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="navbar__logo-content"
          >
            <div className="navbar__logo-icon">
              <BookOpen size={28} />
            </div>
            <span className="navbar__logo-text">
              <span className="text-gradient">Tutor</span>InMinutes
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar__nav hide-mobile">
          <ul className="navbar__nav-list">
            {navigationItems.map((item) => {
              if (item.authRequired && !isAuthenticated) return null;
              
              return (
                <li key={item.path} className="navbar__nav-item">
                  <Link
                    to={item.path}
                    className={`navbar__nav-link ${
                      isActivePath(item.path) ? 'navbar__nav-link--active' : ''
                    }`}
                  >
                    {item.icon && <item.icon size={18} />}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User Actions */}
        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <button className="navbar__notification-btn">
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="navbar__notification-badge">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="navbar__profile-dropdown">
                <button
                  className="navbar__profile-btn"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="navbar__avatar"
                    />
                  ) : (
                    <div className="navbar__avatar-placeholder">
                      <User size={20} />
                    </div>
                  )}
                  <span className="hide-mobile">{user?.name || 'User'}</span>
                </button>

                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="navbar__dropdown-menu"
                    >
                      <Link to="/profile" className="navbar__dropdown-item">
                        <User size={16} />
                        Profile
                      </Link>
                      <Link to="/dashboard" className="navbar__dropdown-item">
                        <BookOpen size={16} />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="navbar__dropdown-item navbar__dropdown-item--logout"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="navbar__auth-buttons hide-mobile">
              <Link to="/auth/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="navbar__mobile-toggle show-mobile"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="navbar__mobile-menu show-mobile"
          >
            <div className="navbar__mobile-menu-content">
              <ul className="navbar__mobile-nav-list">
                {navigationItems.map((item) => {
                  if (item.authRequired && !isAuthenticated) return null;
                  
                  return (
                    <li key={item.path} className="navbar__mobile-nav-item">
                      <Link
                        to={item.path}
                        className={`navbar__mobile-nav-link ${
                          isActivePath(item.path) ? 'navbar__mobile-nav-link--active' : ''
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.icon && <item.icon size={20} />}
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {!isAuthenticated && (
                <div className="navbar__mobile-auth">
                  <Link
                    to="/auth/login"
                    className="btn btn-secondary btn-lg"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="btn btn-primary btn-lg"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;