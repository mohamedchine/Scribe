
import React from 'react';
import './intro.css';

const Intro = ({ fadeOut }) => {
  return (
    <div className={`intro-screen ${fadeOut ? 'fade-out' : ''}`}>
      <h1>Welcome to Scribe ✍️</h1>
    </div>
  );
};

export default Intro;
