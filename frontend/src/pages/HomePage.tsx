import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <h1>Welcome to test-vite-react-scaffolding</h1>
        <p>A modern full-stack application</p>
        <button className="cta-button">Get Started</button>
      </header>
      
      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Modern Tech Stack</h3>
            <p>Built with React, TypeScript, and modern best practices</p>
          </div>
          <div className="feature-card">
            <h3>Secure Authentication</h3>
            <p>JWT-based authentication with secure token management</p>
          </div>
          <div className="feature-card">
            <h3>Responsive Design</h3>
            <p>Mobile-first design that works on all devices</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
