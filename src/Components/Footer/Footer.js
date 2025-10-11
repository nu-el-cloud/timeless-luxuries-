import React, { useState } from 'react';
import './Footer.css';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xqayybwk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          message: "A new user has subscribed to the TIMELESS newsletter from the website footer.",
          source: "TIMELESS Footer Subscription"
        }),
      });

      if (response.ok) {
        setSubscribed(true);
      } else {
        alert("Subscription failed. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Formspree error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='footer'>
      <div className='join'>
        <div className='line'>
          <h2>JOIN THE COMMUNITY.</h2>
          <h3>You will receive all the information regarding the next drops.</h3>
        </div>
        <div className='subscribe'>
          {subscribed ? (
            <p className="thankyou">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="email" 
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "SUBSCRIBING..." : "SUBSCRIBE"} <FaArrowRightLong className='arrow' />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className='socials'>
        <h2>FOLLOW US</h2>
        <div className='icons'>
          <a href='https://www.instagram.com/timeless_since1982/' target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href='https://www.tiktok.com/@timelesssince1982' target="_blank" rel="noreferrer">
            <FaTiktok />
          </a>
          <a href='https://wa.me/2348166514620' target="_blank" rel="noreferrer">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <p>© 2025, TIMELESS. All rights reserved.</p>
    </div>
  );
};

export default Footer;