// src/pages/Checkout.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css'; // Create this CSS file

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const shipping = cart.length > 0 ? 5000 : 0;
  const total = getTotalPrice() + shipping;

  useEffect(() => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Simple validation checks (expand as needed)
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zip', 'phone', 'cardName', 'cardNumber', 'expiryDate', 'cvv'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required`;
        isValid = false;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Phone validation (basic)
    if (formData.phone && formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Invalid phone number';
      isValid = false;
    }

    // Card number validation (basic)
    const cardDigits = formData.cardNumber.replace(/\D/g, '');
    if (cardDigits.length < 13 || cardDigits.length > 19) {
      newErrors.cardNumber = 'Card number must be 13-19 digits';
      isValid = false;
    }

    // CVV validation
    const cvvDigits = formData.cvv.replace(/\D/g, '');
    if (cvvDigits.length < 3 || cvvDigits.length > 4) {
      newErrors.cvv = 'CVV must be 3-4 digits';
      isValid = false;
    }

    // Expiry date validation (MM/YY)
    if (formData.expiryDate && !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be MM/YY';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Simulate API call to place order
  const placeOrder = async () => {
    if (!validateForm()) {
      alert('Please correct the errors in the form.');
      return;
    }

    // Here you would make an API call to your backend
    // Example using fetch:
    /*
    try {
      const response = await fetch('/api/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo: formData,
          items: cart,
          totalAmount: total,
          // Add any other relevant order data
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Order placed successfully:', data);
      // Assuming the backend returns an order number
      setOrderNumber(data.orderNumber || 'ORD-' + Math.floor(100000 + Math.random() * 900000));
      setOrderPlaced(true);
      clearCart(); // Clear cart on successful order

    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    }
    */

    // Simulate successful order placement for now
    setTimeout(() => {
      const orderNum = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(orderNum);
      setOrderPlaced(true);
      clearCart(); // Clear cart on successful order simulation
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <div className="confirmation-icon">✓</div>
        <h2 className="confirmation-title">Thank you for your order!</h2>
        <p className="confirmation-message">Your order has been successfully placed. We'll send you a confirmation email with the details.</p>
        <p className="confirmation-message">Order Number: <strong>{orderNumber}</strong></p>
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-form">
          <div className="form-section">
            <h2 className="form-title">Contact Information</h2>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-title">Shipping Address</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                  required
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                  required
                />
                 {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
                required
              />
               {errors.address && <div className="error-message">{errors.address}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="apartment">Apartment, suite, etc. (optional)</label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                  required
                />
                 {errors.city && <div className="error-message">{errors.city}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={errors.state ? 'error' : ''}
                  required
                />
                 {errors.state && <div className="error-message">{errors.state}</div>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zip">ZIP Code *</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className={errors.zip ? 'error' : ''}
                  required
                />
                 {errors.zip && <div className="error-message">{errors.zip}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  required
                />
                 {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-title">Payment Method</h2>
            <div className="form-group">
              <label htmlFor="cardName">Name on Card *</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className={errors.cardName ? 'error' : ''}
                required
              />
               {errors.cardName && <div className="error-message">{errors.cardName}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number *</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                className={errors.cardNumber ? 'error' : ''}
                required
              />
               {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date (MM/YY) *</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className={errors.expiryDate ? 'error' : ''}
                  required
                />
                 {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV *</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="XXX"
                  className={errors.cvv ? 'error' : ''}
                  required
                />
                 {errors.cvv && <div className="error-message">{errors.cvv}</div>}
              </div>
            </div>
          </div>

          <button className="place-order" onClick={placeOrder}>
            Complete Order
          </button>
        </div>

        <div className="order-summary">
          <h3 className="form-title">Order Summary</h3>
          <div className="order-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} × {item.quantity}</span>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;