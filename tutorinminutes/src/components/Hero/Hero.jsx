import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Video, 
  Users, 
  Star, 
  CheckCircle,
  BookOpen,
  Award,
  Clock
} from 'lucide-react';
import useStore from '../../context/store';
import './Hero.scss';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const { setSearchQuery: setStoreSearchQuery, setFilters } = useStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setStoreSearchQuery(searchQuery);
      setFilters({ mode: selectedMode });
      navigate('/tutors');
    }
  };

  const handleQuickSearch = (subject) => {
    setStoreSearchQuery(subject);
    navigate('/tutors');
  };

  const quickSearchTags = [
    'Mathematics', 'Physics', 'Chemistry', 'Python', 
    'IIT-JEE', 'NEET', 'Data Science', 'English'
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Students' },
    { icon: BookOpen, value: '5,000+', label: 'Expert Tutors' },
    { icon: Award, value: '95%', label: 'Success Rate' },
    { icon: Clock, value: '24/7', label: 'Support' }
  ];

  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__background-gradient"></div>
        <div className="hero__background-pattern"></div>
      </div>

      <div className="container">
        <div className="hero__content">
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your Perfect <span className="text-gradient">Tutor</span><br />
            In Minutes, Not Hours
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Connect with expert tutors for personalized 1:1 learning sessions. 
            Master any subject with verified professionals, available online and offline.
          </motion.p>

          <motion.div
            className="hero__search"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="hero__search-container">
              <form onSubmit={handleSearch} className="hero__search-form">
                <div className="hero__search-input-wrapper">
                  <Search className="hero__search-icon" size={20} />
                  <input
                    type="text"
                    placeholder="Search by subject, skill, or tutor name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="hero__search-input"
                  />
                </div>

                <div className="hero__mode-selector">
                  <button
                    type="button"
                    className={`hero__mode-btn ${selectedMode === 'all' ? 'hero__mode-btn--active' : ''}`}
                    onClick={() => setSelectedMode('all')}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={`hero__mode-btn ${selectedMode === 'online' ? 'hero__mode-btn--active' : ''}`}
                    onClick={() => setSelectedMode('online')}
                  >
                    <Video size={16} />
                    Online
                  </button>
                  <button
                    type="button"
                    className={`hero__mode-btn ${selectedMode === 'offline' ? 'hero__mode-btn--active' : ''}`}
                    onClick={() => setSelectedMode('offline')}
                  >
                    <MapPin size={16} />
                    Offline
                  </button>
                </div>

                <button type="submit" className="hero__search-btn btn btn-primary">
                  Find Tutors
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="hero__quick-search"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="hero__quick-search-label">Popular subjects:</p>
            <div className="hero__quick-search-tags">
              {quickSearchTags.map((tag, index) => (
                <motion.button
                  key={tag}
                  className="hero__quick-search-tag"
                  onClick={() => handleQuickSearch(tag)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="hero__stat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="hero__stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="hero__stat-content">
                  <div className="hero__stat-value">{stat.value}</div>
                  <div className="hero__stat-label">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/tutors')}
            >
              <BookOpen size={20} />
              Start Learning Today
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/auth/register')}
            >
              <Users size={20} />
              Become a Tutor
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;