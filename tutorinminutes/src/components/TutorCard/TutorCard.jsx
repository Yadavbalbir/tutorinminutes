import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Clock, 
  BookOpen, 
  MessageCircle, 
  Shield,
  Video,
  User
} from 'lucide-react';
import { formatUtils, locationUtils } from '../../utils';
import useStore from '../../context/store';
import './TutorCard.scss';

const TutorCard = ({ tutor, onBookNow, onMessage }) => {
  const { userLocation } = useStore();

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(tutor);
    }
  };

  const handleMessage = () => {
    if (onMessage) {
      onMessage(tutor);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={14} className="tutor-card__star tutor-card__star--filled" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={14} className="tutor-card__star tutor-card__star--half" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={14} className="tutor-card__star" />
      );
    }

    return stars;
  };

  const getDistance = () => {
    if (!userLocation || !tutor.location) return null;
    
    const distance = locationUtils.calculateDistance(
      userLocation.lat,
      userLocation.lng,
      tutor.location.lat,
      tutor.location.lng
    );
    
    return locationUtils.formatDistance(distance);
  };

  return (
    <motion.div
      className="tutor-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="tutor-card__header">
        <div className="tutor-card__avatar-container">
          <motion.div
            className="tutor-card__avatar"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {tutor.avatar ? (
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="tutor-card__avatar-image"
              />
            ) : (
              <div className="tutor-card__avatar-placeholder">
                <User size={32} />
              </div>
            )}
          </motion.div>
          
          {tutor.isVerified && (
            <div className="tutor-card__verified-badge">
              <Shield size={16} />
            </div>
          )}
          
          {tutor.isOnline && (
            <div className="tutor-card__online-status" />
          )}
        </div>

        <div className="tutor-card__info">
          <h3 className="tutor-card__name">{tutor.name}</h3>
          <p className="tutor-card__title">{tutor.title}</p>
          
          <div className="tutor-card__rating">
            <div className="tutor-card__stars">
              {renderStars(tutor.rating)}
            </div>
            <span className="tutor-card__rating-text">
              {formatUtils.formatRating(tutor.rating)} ({tutor.totalReviews} reviews)
            </span>
          </div>
        </div>

        <div className="tutor-card__price">
          <span className="tutor-card__price-amount">
            {formatUtils.formatCurrency(tutor.pricePerHour)}
          </span>
          <span className="tutor-card__price-unit">/hour</span>
        </div>
      </div>

      <div className="tutor-card__subjects">
        {tutor.subjects.slice(0, 3).map((subject, index) => (
          <span key={index} className="tutor-card__subject-tag">
            {subject}
          </span>
        ))}
        {tutor.subjects.length > 3 && (
          <span className="tutor-card__subject-tag tutor-card__subject-tag--more">
            +{tutor.subjects.length - 3} more
          </span>
        )}
      </div>

      <div className="tutor-card__details">
        <div className="tutor-card__detail">
          <Clock size={16} />
          <span>{tutor.experience} years exp.</span>
        </div>
        
        {getDistance() && (
          <div className="tutor-card__detail">
            <MapPin size={16} />
            <span>{getDistance()} away</span>
          </div>
        )}

        <div className="tutor-card__modes">
          {tutor.modes.includes('online') && (
            <div className="tutor-card__mode-badge tutor-card__mode-badge--online">
              <Video size={14} />
              <span>Online</span>
            </div>
          )}
          {tutor.modes.includes('offline') && (
            <div className="tutor-card__mode-badge tutor-card__mode-badge--offline">
              <MapPin size={14} />
              <span>In-person</span>
            </div>
          )}
        </div>
      </div>

      <div className="tutor-card__bio">
        <p>{formatUtils.truncateText(tutor.bio, 120)}</p>
      </div>

      <div className="tutor-card__actions">
        <motion.button
          className="tutor-card__action-btn tutor-card__action-btn--secondary"
          onClick={handleMessage}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle size={18} />
          <span>Message</span>
        </motion.button>

        <motion.button
          className="tutor-card__action-btn tutor-card__action-btn--primary"
          onClick={handleBookNow}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BookOpen size={18} />
          <span>Book Now</span>
        </motion.button>
      </div>

      <div className="tutor-card__availability">
        <div className="tutor-card__availability-indicator">
          <div className={`tutor-card__availability-dot ${
            tutor.availableToday ? 'tutor-card__availability-dot--available' : 
            'tutor-card__availability-dot--busy'
          }`} />
          <span className="tutor-card__availability-text">
            {tutor.availableToday ? 'Available today' : 'Next available tomorrow'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorCard;