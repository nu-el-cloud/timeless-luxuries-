// PreviewPage.js
import React, { useState } from "react";
import "./Croptop.css";
import { Link } from 'react-router-dom';

// Main product color images
import White from '../../Assets/wct.png';
import Black from '../../Assets/batct.png';
import Pink from '../../Assets/ptct.png';
import Blue from '../../Assets/btct.png';


// Related product images
import TankTop from '../../Assets/fw.png';
import TankCrop from '../../Assets/wtt.png';
import Short from '../../Assets/wsf.png';
import Caps from '../../Assets/ccs.png';

const Tank = () => {
  const product = {
    name: "TIMELESS NEW TANK CROP TOPS",
    price: "₦25,000.00",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      {
        name: "White",
        frontImage: White,
        selected: true
      },
      {
        name: "Black",
        frontImage: Black,
        selected: false
      },
      {
        name: "Pink",
        frontImage: Pink,
        selected: false
      },
      {
        name: "Blue",
        frontImage: Blue,
        selected: false
      }
    ]
  };

  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

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
      alert("Added to cart!");
    }
  };

  const relatedProducts = [
    { 
      name: "Timeless New Tops - White", 
      price: "₦50,000.00", 
      image: TankTop,
      link: "/top" 
    },
    { 
      name: "Timeless New Tank Tops  - White", 
      price: "₦25,000.00", 
      image: TankCrop,
      link: "/tank" 
    },
    { 
      name: "Timeless New Shorts - White", 
      price: "₦25,000.00", 
      image: Short,
      link: "/short" 
    },
    { 
      name: "Timeless New Caps - White", 
      price: "₦20,000.00", 
      image: Caps,
      link: "/cap" 
    }
  ];

  return (
    <div className="preview-page">
      {/* Main Product Section */}
      <div className="product-section">
        {/* Image column: scrolls normally */}
        <div className="product-image">
          <img src={selectedColor.frontImage} alt={`${product.name} - Front`} />
        </div>

        {/* Details column: stays fixed until images scroll past */}
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
    </div>
  );
};

export default Tank;