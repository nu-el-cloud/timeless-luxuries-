import React, { useState, useEffect } from "react";
import "./Cart.css";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

// Helper: extract numeric price from "₦50,000.00"
const parsePrice = (priceStr) => {
  const numStr = priceStr.replace(/[^\d.]/g, '');
  return parseFloat(numStr) || 0;
};

// Helper: format number as NGN currency
const formatNGN = (value) => {
  return value.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate subtotal (for summary)
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <h1>YOUR CART</h1>

      {cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {cartItems.map(item => {
              const unitPrice = parsePrice(item.price);
              const totalForItem = unitPrice * item.quantity;

              return (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-meta">Size: {item.size} • Color: {item.color}</p>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>
                        <IoMdClose />
                      </button>
                    </div>
                  </div>
                  {/* Show total for this item (price × qty) */}
                  <div className="item-price">
                    {formatNGN(totalForItem)}
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="divider" />

          <div className="note-section">
            <label htmlFor="orderNote">Add a note to your order</label>
            <textarea
              id="orderNote"
              placeholder=""
              rows="2"
            ></textarea>
          </div>

          <div className="summary">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>{formatNGN(subtotal)}</span>
            </div>
            <p className="tax-shipping">Taxes and shipping calculated at checkout</p>
            <Link to="/check" > <button className="checkout-btn">Check out →</button> </Link>
          </div>
        </>
      ) : (
        <>
          <p className="empty-message">Your cart is currently empty.</p>
          <a href="/" className="continue-shopping">
            Continue shopping →
          </a>
        </>
      )}
    </div>
  );
};

export default Cart;