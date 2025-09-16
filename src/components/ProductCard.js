// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Create this CSS file

const ProductCard = ({ product }) => {
  // Simple image display, can be enhanced with ImageSlider if needed for grid
  const displayImage = product.images && product.images[0] ? product.images[0] : product.image;

  return (
    <div className="product">
      <Link to={`/product/${product.id}`}>
        <img src={displayImage} alt={product.name} className="product-image" />
        <div className="product-name">{product.name}</div>
        <div className="price">{product.currency}{product.price.toLocaleString()}</div>
      </Link>
    </div>
  );
};

export default ProductCard;