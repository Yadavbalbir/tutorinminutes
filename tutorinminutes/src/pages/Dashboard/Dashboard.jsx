import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="section">
          <h1>Dashboard</h1>
          <p>Dashboard page is under construction...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;