import React from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <motion.div
      className="profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="section">
          <h1>Tutor Profile</h1>
          <p>Profile page is under construction...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;