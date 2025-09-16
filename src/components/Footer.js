// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Create this CSS file for footer styles

const Footer = () => {
  return (
    <footer>
      <h3>FOLLOW US</h3>
      <div className="social-icons">
        <a href="https://www.instagram.com/timeless_since_1982" target="_blank" rel="noopener noreferrer" title="Instagram">
          {/* Replace with your actual Instagram logo image path */}
          <img src="/TIMELESS/instagramlogo.webp" alt="Instagram" />
        </a>
        <a href="https://wa.me/2348166514620" target="_blank" rel="noopener noreferrer" title="WhatsApp">
          {/* You can use the SVG directly or an image */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '24px', height: '24px' }} />
        </a>
        <a href="https://www.tiktok.com/@t_m_l11" target="_blank" rel="noopener noreferrer" title="TikTok">
          {/* Replace with your actual TikTok logo image path */}
          <img src="/TIMELESS/tiktoklogo.webp" alt="TikTok" />
        </a>
      </div>
      <p style={{ fontSize: '14px', color: '#777', marginTop: '10px' }}>
        © 2025 TIMELESS. Crafted with care since 1982.
      </p>
    </footer>
  );
};

export default Footer;