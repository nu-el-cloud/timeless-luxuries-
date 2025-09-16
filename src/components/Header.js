// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css'; // Create this CSS file for header styles

const Header = () => {
  const { getTotalItems } = useCart();

  return (
    <header>
      <div className="logo">
        <Link to="/">
          {/* Replace with your actual logo image path */}
          <img src="/TIMELESS/timelesslogo.png" alt="TIMELESS" />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/lookbook">Lookbook</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="icons">
        <a href="#" title="Search">🔍</a> {/* Implement search functionality later */}
        <Link to="/cart" title="Cart">
          🛍️ {getTotalItems() > 0 && `(${getTotalItems()})`}
        </Link>
      </div>
    </header>
  );
};

export default Header;