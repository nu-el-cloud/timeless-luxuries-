// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { findProductById } from '../data/products';
import ImageSlider from '../components/ImageSlider';
import './ProductDetail.css'; // Create this CSS file

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M'); // Default size
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = findProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default color to the first available color
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      } else {
        // Fallback if colors array is missing, use color property
        setSelectedColor(foundProduct.color || '');
      }
    } else {
      // Handle product not found, maybe redirect
      navigate('/products');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: `${product.id}-${selectedColor}-${selectedSize}`, // Unique ID for cart item
      productId: product.id,
      name: `${product.name} (${selectedColor}, ${selectedSize})`,
      price: product.price,
      image: product.image, // Use main image or logic to get image by color
      size: selectedSize,
      color: selectedColor,
      quantity: parseInt(quantity)
    };

    addToCart(cartItem);
    alert(`${cartItem.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart'); // Redirect to cart page
  };

  if (!product) {
    return <div>Loading...</div>; // Or a 404 component
  }

  return (
    <div className="product-detail-page">
      <div className="back-link">
        <Link to="/products">← Back to Products</Link>
      </div>

      <div className="product-detail">
        <div className="product-image-section">
          <ImageSlider images={product.images || [product.image]} />
        </div>
        <div className="product-info-section">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-price">{product.currency}{product.price.toLocaleString()}</div>

          {/* Size Selection */}
          <div className="size-selection">
            <label><strong>Size:</strong></label>
            <div className="size-options">
              {['S', 'M', 'L', 'XL', '2XL'].map(size => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection - Assuming colors are in product.colors array */}
          {product.colors && product.colors.length > 0 && (
            <div className="color-selection">
              <label><strong>Color:</strong></label>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: getColorHex(color) }} // Implement getColorHex helper
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="quantity-control">
            <label><strong>Quantity:</strong></label>
            <div className="quantity-input-group">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="button-group">
            <button className="button add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="button buy-now-btn" onClick={handleBuyNow}>
              Buy it now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple color hex map helper (move to utils if it grows)
const getColorHex = (colorName) => {
  const map = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Orange': '#FFA500',
    'Green': '#008000',
    'Blue': '#0000FF',
    'Pink': '#FFC0CB',
    'Purple': '#800080',
    'Red': '#FF0000',
    'Brown': '#A52A2A',
    'Cream': '#FFFDD0',
    'Camo': '#78866B' // Approximation
  };
  return map[colorName] || '#ccc'; // Default grey
};

export default ProductDetail;