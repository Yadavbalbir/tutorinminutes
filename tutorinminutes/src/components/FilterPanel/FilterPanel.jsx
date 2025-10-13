import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  X, 
  MapPin, 
  Video, 
  Star, 
  DollarSign,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import useStore from '../../context/store';
import './FilterPanel.scss';

const FilterPanel = ({ isOpen, onClose, isMobile = false }) => {
  const { 
    filters, 
    setFilters, 
    sortBy, 
    setSortBy,
    filteredTutors,
    tutors 
  } = useStore();

  const [tempFilters, setTempFilters] = useState(filters);

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
    'Python', 'Java', 'JavaScript', 'Data Science', 'Machine Learning',
    'IIT-JEE', 'NEET', 'CUET', 'Web Development', 'Digital Marketing'
  ];

  const levels = [
    'CBSE', 'ICSE', 'State Board', 'IIT-JEE', 'NEET', 'CUET',
    'Beginner', 'Intermediate', 'Advanced', 'Professional'
  ];

  const modes = [
    { value: 'all', label: 'All Modes' },
    { value: 'online', label: 'Online', icon: Video },
    { value: 'offline', label: 'Offline', icon: MapPin }
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'highest-rated', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'nearest', label: 'Nearest First' }
  ];

  const handleFilterChange = (key, value) => {
    setTempFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...tempFilters.priceRange];
    newRange[index] = parseInt(value);
    setTempFilters(prev => ({
      ...prev,
      priceRange: newRange
    }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    if (isMobile) {
      onClose();
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      subject: '',
      level: '',
      mode: 'all',
      priceRange: [0, 1000],
      rating: 0,
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  const FilterContent = () => (
    <div className="filter-panel__content">
      {/* Header */}
      <div className="filter-panel__header">
        <div className="filter-panel__title">
          <Filter size={20} />
          <span>Filters</span>
          <span className="filter-panel__count">
            {filteredTutors.length} of {tutors.length} tutors
          </span>
        </div>
        {isMobile && (
          <button className="filter-panel__close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="filter-panel__section">
        <label className="filter-panel__label">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-panel__select"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Filter */}
      <div className="filter-panel__section">
        <label className="filter-panel__label">Subject</label>
        <select
          value={tempFilters.subject}
          onChange={(e) => handleFilterChange('subject', e.target.value)}
          className="filter-panel__select"
        >
          <option value="">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {/* Level Filter */}
      <div className="filter-panel__section">
        <label className="filter-panel__label">Level</label>
        <select
          value={tempFilters.level}
          onChange={(e) => handleFilterChange('level', e.target.value)}
          className="filter-panel__select"
        >
          <option value="">All Levels</option>
          {levels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Mode Filter */}
      <div className="filter-panel__section">
        <label className="filter-panel__label">Session Mode</label>
        <div className="filter-panel__mode-buttons">
          {modes.map(mode => (
            <button
              key={mode.value}
              className={`filter-panel__mode-btn ${
                tempFilters.mode === mode.value ? 'filter-panel__mode-btn--active' : ''
              }`}
              onClick={() => handleFilterChange('mode', mode.value)}
            >
              {mode.icon && <mode.icon size={16} />}
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-panel__section">
        <label className="filter-panel__label">
          Price Range (₹{tempFilters.priceRange[0]} - ₹{tempFilters.priceRange[1]}/hour)
        </label>
        <div className="filter-panel__price-range">
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={tempFilters.priceRange[0]}
            onChange={(e) => handlePriceRangeChange(0, e.target.value)}
            className="filter-panel__range-input"
          />
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={tempFilters.priceRange[1]}
            onChange={(e) => handlePriceRangeChange(1, e.target.value)}
            className="filter-panel__range-input"
          />
        </div>
        <div className="filter-panel__price-labels">
          <span>₹0</span>
          <span>₹2000+</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="filter-panel__section">
        <label className="filter-panel__label">Minimum Rating</label>
        <div className="filter-panel__rating-buttons">
          {[0, 3, 4, 4.5, 5].map(rating => (
            <button
              key={rating}
              className={`filter-panel__rating-btn ${
                tempFilters.rating === rating ? 'filter-panel__rating-btn--active' : ''
              }`}
              onClick={() => handleFilterChange('rating', rating)}
            >
              <Star 
                size={14} 
                className={rating > 0 ? 'filter-panel__star--filled' : ''} 
              />
              <span>{rating === 0 ? 'Any' : `${rating}+`}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="filter-panel__actions">
        <button
          className="filter-panel__reset-btn"
          onClick={resetFilters}
        >
          <RotateCcw size={16} />
          Reset All
        </button>
        <button
          className="filter-panel__apply-btn btn btn-primary"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="filter-panel__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="filter-panel filter-panel--mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <FilterContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className={`filter-panel ${isOpen ? 'filter-panel--open' : ''}`}>
      <FilterContent />
    </div>
  );
};

export default FilterPanel;