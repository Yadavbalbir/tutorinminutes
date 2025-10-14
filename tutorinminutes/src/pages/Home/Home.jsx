import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Star,
  ArrowRight,
  PlayCircle,
  Users,
  BookOpen,
  Award
} from 'lucide-react';
import Hero from '../../components/Hero/Hero';
import TutorCard from '../../components/TutorCard/TutorCard';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import useStore from '../../context/store';
import './Home.scss';

const Home = () => {
  const navigate = useNavigate();
  const [featuredTutors, setFeaturedTutors] = useState([]);
  const { setSelectedTutor, toggleBookingModal } = useStore();

  // Mock featured tutors data
  useEffect(() => {
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
      {
        id: '3',
        name: 'Dr. Anjali Patel',
        title: 'NEET Biology Specialist',
        avatar: null,
        subjects: ['Biology', 'Chemistry', 'NEET'],
        levels: ['CBSE', 'NEET'],
        modes: ['online', 'offline'],
        pricePerHour: 700,
        rating: 4.9,
        totalReviews: 156,
        experience: 10,
        bio: 'Medical doctor and NEET mentor with 95% success rate. Expert in Biology and Chemistry for medical entrance exams.',
        location: { lat: 28.6139, lng: 77.2090 },
        isVerified: true,
        isOnline: false,
        availableToday: true
      }
    ];
    setFeaturedTutors(mockTutors);
  }, []);

  const handleBookTutor = (tutor) => {
    setSelectedTutor(tutor);
    navigate(`/booking/${tutor.id}`);
  };

  const handleMessageTutor = (tutor) => {
    console.log('Message tutor:', tutor.name);
    // In a real app, this would open a chat interface
  };

  const features = [
    {
      icon: Clock,
      title: 'Instant Booking',
      description: 'Find and book qualified tutors in under 60 seconds'
    },
    {
      icon: Shield,
      title: 'Verified Tutors',
      description: 'All tutors are background-checked and credential-verified'
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: '4.8+ average rating from thousands of satisfied students'
    },
    {
      icon: Users,
      title: 'Flexible Learning',
      description: 'Choose online or offline sessions based on your preference'
    }
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: 'Search & Browse',
      description: 'Find tutors by subject, location, price, and availability'
    },
    {
      step: 2,
      title: 'Book Instantly',
      description: 'Choose your preferred time slot and book with one click'
    },
    {
      step: 3,
      title: 'Learn & Grow',
      description: 'Join your session and get personalized 1:1 guidance'
    }
  ];

  const subjects = [
    { name: 'Mathematics', icon: '📐', students: '2.5k+' },
    { name: 'Physics', icon: '⚛️', students: '1.8k+' },
    { name: 'Chemistry', icon: '🧪', students: '1.6k+' },
    { name: 'Biology', icon: '🧬', students: '1.4k+' },
    { name: 'Python', icon: '🐍', students: '3.2k+' },
    { name: 'English', icon: '📚', students: '2.1k+' },
    { name: 'Data Science', icon: '📊', students: '2.8k+' },
    { name: 'Web Development', icon: '💻', students: '2.3k+' }
  ];

  return (
    <div className="home">
      <Hero />

      {/* Features Section */}
      <section className="home__features section">
        <div className="container">
          <motion.div
            className="home__section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose TutorInMinutes?</h2>
            <p>Experience the future of personalized learning with our innovative platform</p>
          </motion.div>

          <div className="home__features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="home__feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="home__feature-icon">
                  <feature.icon size={32} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="home__tutors section">
        <div className="container">
          <motion.div
            className="home__section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Meet Our Top-Rated Tutors</h2>
            <p>Learn from the best educators and industry experts</p>
          </motion.div>

          <div className="home__tutors-grid">
            {featuredTutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TutorCard
                  tutor={tutor}
                  onBookNow={handleBookTutor}
                  onMessage={handleMessageTutor}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="home__tutors-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/tutors')}
            >
              View All Tutors
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Subjects */}
      <section className="home__subjects section">
        <div className="container">
          <motion.div
            className="home__section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Popular Subjects</h2>
            <p>Master any subject with expert guidance</p>
          </motion.div>

          <div className="home__subjects-grid">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                className="home__subject-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  navigate('/tutors?subject=' + encodeURIComponent(subject.name));
                }}
              >
                <div className="home__subject-icon">{subject.icon}</div>
                <h3>{subject.name}</h3>
                <p>{subject.students} students learning</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="home__how-it-works section">
        <div className="container">
          <motion.div
            className="home__section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>How It Works</h2>
            <p>Get started with personalized tutoring in just 3 simple steps</p>
          </motion.div>

          <div className="home__steps">
            {howItWorksSteps.map((stepData, index) => (
              <motion.div
                key={stepData.step}
                className="home__step"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="home__step-number">
                  <span>{stepData.step}</span>
                </div>
                <div className="home__step-content">
                  <h3>{stepData.title}</h3>
                  <p>{stepData.description}</p>
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="home__step-arrow">
                    <ArrowRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home__cta section">
        <div className="container">
          <motion.div
            className="home__cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start Learning?</h2>
            <p>Join thousands of students who are already achieving their academic goals</p>
            <div className="home__cta-buttons">
              <motion.button
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/tutors')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Find Your Tutor
              </motion.button>
              <motion.button
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/auth/register')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Become a Tutor
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <ChatWidget />
    </div>
  );
};

export default Home;