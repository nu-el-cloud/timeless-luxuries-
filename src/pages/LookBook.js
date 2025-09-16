// src/pages/Lookbook.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Lookbook.css'; // Create this CSS file

const Lookbook = () => {
  // Image array for the lookbook
  const images = [
    '/TIMELESS/lookbook/pic1.jpg',
    '/TIMELESS/lookbook/pic2.jpg',
    '/TIMELESS/lookbook/pic3.jpg',
    '/TIMELESS/lookbook/pic4.jpg',
    '/TIMELESS/lookbook/pic5.jpg',
    '/TIMELESS/lookbook/pic6.jpg',
    '/TIMELESS/lookbook/pic7.jpg',
    '/TIMELESS/lookbook/pic8.jpg',
    '/TIMELESS/lookbook/pic9.jpg'
    // Add more image paths as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const changeImage = (direction) => {
    setCurrentImageIndex(prevIndex => {
      let newIndex = prevIndex + direction;
      if (newIndex >= images.length) newIndex = 0;
      if (newIndex < 0) newIndex = images.length - 1;
      return newIndex;
    });
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (isModalOpen) {
        switch (event.key) {
          case 'Escape':
            closeModal();
            break;
          case 'ArrowLeft':
            changeImage(-1);
            break;
          case 'ArrowRight':
            changeImage(1);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Touch/swipe support (basic implementation)
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        changeImage(1); // Swipe left - next image
      } else {
        changeImage(-1); // Swipe right - previous image
      }
    }
  };

  return (
    <div className="lookbook-page">
      <div className="back-link">
        <Link to="/">← Back to Home</Link>
      </div>
      <h1 className="page-title">Lookbook</h1>

      <div className="lookbook-grid">
        {images.map((imgSrc, index) => (
          <div key={index} className="look-item" onClick={() => openModal(index)}>
            <img src={imgSrc} alt={`Lookbook Image ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Modal/Lightbox */}
      {isModalOpen && (
        <div className="modal active" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <button className="nav-arrow prev" onClick={(e) => { e.stopPropagation(); changeImage(-1); }}>&#10094;</button>
          <div className="modal-content" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <img className="modal-image" src={images[currentImageIndex]} alt="Lookbook Image" />
          </div>
          <button className="nav-arrow next" onClick={(e) => { e.stopPropagation(); changeImage(1); }}>&#10095;</button>
          <div className="image-counter">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Join Community Section (Optional) */}
      {/* <div className="community-section">
        <div className="community-text">
          <h3>JOIN THE COMMUNITY.</h3>
          <p>You Will Receive All The Information Regarding The Next Drops.</p>
        </div>
        <form className="subscribe-form">
          <input type="email" className="subscribe-input" placeholder="Email Address" />
          <button type="submit" className="subscribe-btn">SUBSCRIBE →</button>
        </form>
      </div> */}
    </div>
  );
};

export default Lookbook;