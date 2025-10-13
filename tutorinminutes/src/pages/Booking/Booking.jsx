import React from 'react';
import { motion } from 'framer-motion';

const Booking = () => {
  return (
    <motion.div
      className="booking"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="section">
          <h1>Book a Session</h1>
          <p>Booking page is under construction...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Booking;