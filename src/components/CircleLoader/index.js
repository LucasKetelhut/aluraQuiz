import React from 'react';
import { motion } from 'framer-motion';

const containerStyle = {
  display: 'flex',
  height: '150px',
  boxSizing: 'border-box',
  alingItems: 'center',
  justifyContent: 'center',
};

const circleStyle = {
  display: 'block',
  width: '10rem',
  height: '10rem',
  border: '20px solid #8e8e8e',
  borderTop: '20px solid #801313',
  borderRadius: '50%',
  boxSizing: 'border-box',
  top: 0,
  left: 0,
};

const spinTransition = {
  loop: Infinity,
  ease: 'linear',
  duration: 1,
};

export default function CircleLoader() {
  return (
    <div style={containerStyle}>
      <motion.span
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
}
