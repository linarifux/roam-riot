import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = false }) => {
  return (
    <motion.div 
      initial={hoverEffect ? { opacity: 0, y: 20 } : {}}
      animate={hoverEffect ? { opacity: 1, y: 0 } : {}}
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" } : {}}
      className={`glass-panel rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;