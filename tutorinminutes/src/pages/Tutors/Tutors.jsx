import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Grid, List } from 'lucide-react';
import TutorCard from '../../components/TutorCard/TutorCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import useStore from '../../context/store';
import { deviceUtils } from '../../utils';
import './Tutors.scss';

const Tutors = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(!deviceUtils.isMobile());
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    tutors, 
    filteredTutors, 
    setTutors, 
    setSearchQuery: setStoreSearchQuery,
    setSelectedTutor 
  } = useStore();

  useEffect(() => {
    // Mock tutors data - in a real app, this would come from an API
    const mockTutors = [
      {
        id: '1',
        name: 'Dr. Priya Sharma',
        title: 'Mathematics & Physics Expert',
        avatar: null,
        subjects: ['Mathematics', 'Physics', 'IIT-JEE'],
        levels: ['CBSE', 'ICSE', 'IIT-JEE'],
        modes: ['online', 'offline'],
        pricePerHour: 800,
        rating: 4.9,
        totalReviews: 127,
        experience: 8,
        bio: 'Former IIT professor with expertise in advanced mathematics and physics. Helped 200+ students crack JEE with top ranks.',
        location: { lat: 28.6139, lng: 77.2090 },
        isVerified: true,
        isOnline: true,
        availableToday: true
      },
      {
        id: '2',
        name: 'Rahul Kumar',
        title: 'Python & Data Science Mentor',
        avatar: null,
        subjects: ['Python', 'Data Science', 'Machine Learning'],
        levels: ['Beginner', 'Intermediate', 'Advanced'],
        modes: ['online'],
        pricePerHour: 600,
        rating: 4.8,
        totalReviews: 89,
        experience: 5,
        bio: 'Senior Software Engineer at Google. Specialized in teaching Python programming and data science concepts.',
        location: { lat: 28.6139, lng: 77.2090 },
        isVerified: true,
        isOnline: true,
        availableToday: false
      },
      // Add more mock tutors...
    ];
    
    setTutors(mockTutors);
  }, [setTutors]);

  const handleSearch = (e) => {
    e.preventDefault();
    setStoreSearchQuery(searchQuery);
  };

  const handleBookTutor = (tutor) => {
    setSelectedTutor(tutor);
    // Navigate to booking page
  };

  const handleMessageTutor = (tutor) => {
    console.log('Message tutor:', tutor.name);
  };

  return (
    <div className="tutors">
      <div className="tutors__header">
        <div className="container">
          <motion.div
            className="tutors__header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Find Your Perfect Tutor</h1>
            <p>Connect with expert tutors for personalized learning</p>
            
            {/* Search Bar */}
            <form className="tutors__search-form" onSubmit={handleSearch}>
              <div className="tutors__search-input-wrapper">
                <Search className="tutors__search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search by subject, tutor name, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="tutors__search-input"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="tutors__main">
        <div className="container">
          <div className="tutors__layout">
            {/* Desktop Filters Sidebar */}
            <div className={`tutors__filters-sidebar ${showFilters ? 'tutors__filters-sidebar--open' : ''}`}>
              <FilterPanel isOpen={showFilters} onClose={() => setShowFilters(false)} />
            </div>

            {/* Main Content */}
            <div className="tutors__content">
              {/* Toolbar */}
              <div className="tutors__toolbar">
                <div className="tutors__results-info">
                  <span>{filteredTutors.length} tutors found</span>
                </div>
                
                <div className="tutors__toolbar-actions">
                  {/* Mobile Filter Button */}
                  <button
                    className="tutors__filter-toggle show-mobile"
                    onClick={() => setShowFilters(true)}
                  >
                    <Filter size={20} />
                    Filters
                  </button>

                  {/* View Mode Toggle */}
                  <div className="tutors__view-toggle hide-mobile">
                    <button
                      className={`tutors__view-btn ${viewMode === 'grid' ? 'tutors__view-btn--active' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      className={`tutors__view-btn ${viewMode === 'list' ? 'tutors__view-btn--active' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tutors Grid/List */}
              <div className={`tutors__grid tutors__grid--${viewMode}`}>
                {filteredTutors.map((tutor, index) => (
                  <motion.div
                    key={tutor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <TutorCard
                      tutor={tutor}
                      onBookNow={handleBookTutor}
                      onMessage={handleMessageTutor}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {filteredTutors.length === 0 && (
                <div className="tutors__empty-state">
                  <MapPin size={64} className="tutors__empty-icon" />
                  <h3>No tutors found</h3>
                  <p>Try adjusting your filters or search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <FilterPanel
        isOpen={showFilters && deviceUtils.isMobile()}
        onClose={() => setShowFilters(false)}
        isMobile={true}
      />
    </div>
  );
};

export default Tutors;