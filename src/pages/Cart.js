// src/pages/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css'; // Create this CSS file

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const shipping = cart.length > 0 ? 5000 : 0; // Flat rate shipping
  const total = getTotalPrice() + shipping;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.currency}{item.price.toLocaleString()}</p>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
              </div>
              <div className="cart-item-total">
                {item.currency}{(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₦{getTotalPrice().toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>₦{shipping.toLocaleString()}</span>
          </div>
          <div className="summary-item summary-total">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;