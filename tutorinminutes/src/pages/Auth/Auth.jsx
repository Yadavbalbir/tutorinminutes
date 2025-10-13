import React from 'react';
import { motion } from 'framer-motion';

const Auth = ({ type = 'login' }) => {
  return (
    <motion.div
      className="auth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="section">
          <h1>{type === 'login' ? 'Login' : 'Sign Up'}</h1>
          <p>Authentication page is under construction...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Auth;