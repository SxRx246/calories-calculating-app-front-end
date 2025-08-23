import React from 'react';
import Logo from './Components/Logo/Logo';

const Home = () => {
  return (
    <div className="home-hero">
      <div className="hero-content">
        <Logo /> 
        <h1>Welcome to Sip & Skip!</h1>
        <p>Your smart path to weight loss without the workout.</p>
        <p>Skip the gym. Sip smarter. Track calories effortlessly.</p>
        <a href="/user-info/new" className="hero-button">Get Started</a>
      </div>
    </div>
  );
};

export default Home;