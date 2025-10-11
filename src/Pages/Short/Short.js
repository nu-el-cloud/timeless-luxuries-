// Short.js
import React, { useState, useEffect } from "react";
import "./Short.css";
import { Link } from 'react-router-dom';

// Main product color images
import FrontWhite from '../../Assets/wsf.png';
import BackWhite from '../../Assets/wsb.png';
import FrontBlack from '../../Assets/bdf.png';
import BackBlack from '../../Assets/bsb.png';
import FrontRed from '../../Assets/rsf.png';
import BackRed from '../../Assets/rsb.png';
import FrontBlue from '../../Assets/busf.png';
import BackBlue from '../../Assets/busb.png';

// Related product images
import Top from '../../Assets/fw.png';
import Tank from '../../Assets/wtt.png';
import Crop from '../../Assets/wct.png';
import Caps from '../../Assets/ccs.png';

const Short = () => {
  const product = {
    name: "TIMELESS NEW SHORTS",
    price: "₦50,000.00",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      {
        name: "White",
        frontImage: FrontWhite,
        backImage: BackWhite,
        selected: true
      },
      {
        name: "Black",
        frontImage: FrontBlack,
        backImage: BackBlack,
        selected: false
      },
      {
        name: "Red",
        frontImage: FrontRed,
        backImage: BackRed,
        selected: false
      },
      {
        name: "Blue",
        frontImage: FrontBlue,
        backImage: BackBlue,
        selected: false
      }
    ]
  };

  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false); // ✅ Toast state

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const addToCart = (buyNow = false) => {
    const cartItem = {
      id: Date.now(),
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor.name,
      quantity: quantity,
      image: selectedColor.frontImage
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    if (buyNow) {
      window.location.href = "/cart";
    } else {
      setShowToast(true); // ✅ Show toast instead of alert
    }
  };

  // ✅ Auto-hide toast after 3 seconds
  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const relatedProducts = [
    { 
      name: "Timeless New Tops - White", 
      price: "₦50,000.00", 
      image: Top,
      link: "/top" 
    },
    { 
      name: "Timeless New Tank Tops - White", 
      price: "₦25,000.00", 
      image: Tank,
      link: "/tank" 
    },
    { 
      name: "Timeless New Tank Crop Tops - White", 
      price: "₦25,000.00", 
      image: Crop,
      link: "/crop" 
    },
    { 
      name: "Timeless New Caps", 
      price: "₦20,000.00", 
      image: Caps,
      link: "/cap" 
    }
  ];

  return (
    <div className="preview-page">
      {/* Main Product Section */}
      <div className="product-section">
        <div className="product-image">
          <img src={selectedColor.frontImage} alt={`${product.name} - Front`} />
          <img src={selectedColor.backImage} alt={`${product.name} - Back`} />
        </div>

        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="price">{product.price}</p>

          <div className="size-selector">
            <label>Size:</label>
            <div className="size-buttons">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="color-selector">
            <label>Color:</label>
            <div className="color-swatches">
              {product.colors.map((color) => (
                <div
                  key={color.name}
                  className={`color-swatch ${selectedColor.name === color.name ? "selected" : ""}`}
                  style={{ backgroundColor: color.name.toLowerCase() }}
                  onClick={() => handleColorClick(color)}
                  title={color.name}
                ></div>
              ))}
            </div>
          </div>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button onClick={decrementQuantity}>−</button>
              <span>{quantity}</span>
              <button onClick={incrementQuantity}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart" onClick={() => addToCart(false)}>
              Add to cart →
            </button>
            <button className="buy-now" onClick={() => addToCart(true)}>
              Buy it now →
            </button>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="related-products">
        <h2>YOU MAY ALSO LIKE</h2>
        <div className="products-grid">
          {relatedProducts.map((item, index) => (
            <Link to={item.link} key={index} className="related-product">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ✅ TOP-RIGHT TOAST NOTIFICATION */}
      {showToast && (
        <div className="add-to-cart-toast">
          <p>Added to cart</p>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Short;