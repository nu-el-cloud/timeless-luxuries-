// src/components/ImageSlider.js
import React, { useState } from 'react';
import './ImageSlider.css'; // Create this CSS file

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="image-slider">
      {images.length > 1 && (
        <button className="arrow left" onClick={goToPrevious}>‹</button>
      )}
      <div className="slider-image-container">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slider-image" />
      </div>
      {images.length > 1 && (
        <button className="arrow right" onClick={goToNext}>›</button>
      )}
      {images.length > 1 && (
        <div className="slider-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;