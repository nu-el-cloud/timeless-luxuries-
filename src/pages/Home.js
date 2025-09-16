// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css'; // Create this CSS file

const Home = () => {
  // Display a selection of products on the home page
  const featuredProducts = products.slice(0, 6); // Show first 6 products

  return (
    <div className="home">
      <div className="hero-section">
        {/* Add hero image/banner if needed */}
        <h1>Welcome to TIMELESS</h1>
        <p>Discover our latest collection.</p>
        <Link to="/products" className="shop-now-btn">Shop Now</Link>
      </div>

      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;