// src/pages/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'; // Create this CSS file

const About = () => {
  return (
    <div className="about-page">
      {/* Row 1: Image Left, Text Right */}
      <section className="about-row">
        <div className="about-image">
          {/* Replace with your actual image path */}
          <img src="/TIMELESS/alphacap.jpg" alt="The World is Yours" />
        </div>
        <div className="about-text">
          <h1>TIMELESS</h1>
          <p><strong>TIMELESS</strong> is more than just a clothing brand, it’s a story of heritage, resilience, and style that never fades.</p>
        </div>
      </section>

      {/* Row 2: Text Left, Image Right (Reversed) */}
      <section className="about-row reverse">
        <div className="about-image">
          {/* Replace with your actual image path */}
          <img src="/TIMELESS/alphacap.jpg" alt="Craftsmanship & Detail" />
        </div>
        <div className="about-text">
          <h1>About</h1>
          <p>The name was inspired by a phrase my mother always told me: “Your glory is timeless.” Born in 1982, she became the symbol of strength, beauty, and inspiration in my life. From her, I learned that true style is not just about trends, but about leaving a mark that lasts forever.</p>
          <p>Every piece we create carries that spirit — classic, bold, and built to transcend seasons. Timeless Since 1982 is for those who wear their confidence, embrace their story, and believe that their light will never dim.</p>
          <div className="tagline">Timeless Since 1982 - Wear Your Glory</div>
        </div>
      </section>
    </div>
  );
};

export default About;