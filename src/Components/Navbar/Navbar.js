import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import logo from '../../Assets/timelesslogo.png';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { PiBagSimpleLight } from 'react-icons/pi';
import { TfiClose } from 'react-icons/tfi';
import { FiMenu } from 'react-icons/fi';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

const Navbar = () => {

  const closeAllMenus = () => {
  setShowClothes(false);
  setIsMobileMenuOpen(false);
};

  const [showSearch, setShowSearch] = useState(false);
  const [showClothes, setShowClothes] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchModalRef = useRef(null);
  const shopModalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    if (showSearch) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopModalRef.current && !shopModalRef.current.contains(event.target)) {
        setShowClothes(false);
      }
    };
    if (showClothes) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showClothes]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleShopModal = (e) => {
    e.stopPropagation();
    if (showClothes) {
      setShowClothes(false);
    } else {
      setShowClothes(true);
    }
  };

  return (
    <div className='navbar'>
      <div className='nav-menu'>
        
        <div className='nav-logo'>
        <Link to='/' onClick={closeMobileMenu}>
          <img src={logo} alt='timelesslogo' />
        </Link>
        </div>


        <div className="divider">

        <button
          onClick={toggleShopModal}
          aria-haspopup="true"
          aria-expanded={showClothes}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          Shop
          {showClothes ? <IoMdRemove /> : <IoMdAdd />}
        </button>

        {showClothes && (
          <div className="shop-modal">
            <div className="shop-box" ref={shopModalRef}>
              <Link to='/top' onClick={() => setShowClothes(false)}>TOPS</Link>
              <Link to='/tank' onClick={() => setShowClothes(false)}>TANK TOPS</Link>
              <Link to='/crop' onClick={() => setShowClothes(false)}>CROP TOPS</Link>
              <Link to='/short' onClick={() => setShowClothes(false)}>SHORTS</Link>
              <Link to='/cap' onClick={() => setShowClothes(false)}>CAPS</Link>
            </div>
          </div>
        )}

        <Link to='/allproduct' onClick={closeMobileMenu}>ALL PRODUCTS</Link>
        <Link to='/collection' onClick={closeMobileMenu}>COLLECTIONS</Link>
        <Link to='/lookbook' onClick={closeMobileMenu}>LOOK BOOK</Link>
        <Link to='/about' onClick={closeMobileMenu}>ABOUT</Link>
      
        </div>
      </div>

      <div className='nav-search'>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowSearch(true);
          }}
          role="button"
          tabIndex={0}
          aria-label="Open search"
        >
          <CiSearch />
        </div>
        <div> 
          <Link to='/cart' >
              <PiBagSimpleLight className='pick' />
          </Link>
        </div>
        <button
          className="hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <TfiClose /> : <FiMenu />}
        </button>
      </div>

      {showSearch && (
        <div className="search-modal">
          <div className="search-box" ref={searchModalRef}>
            <CiSearch className='check' />
            <div className="input-container">
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                aria-label="Search products"
              />
              <button
                className="close-btn"
                onClick={() => setShowSearch(false)}
                aria-label="Close search"
              >
                <TfiClose />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Slide-in from Left */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="mobile-menu" 
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleShopModal}
              className="mobile-shop-btn"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Shop
              {showClothes ? <IoMdRemove /> : <IoMdAdd />}
            </button>

            {showClothes && (
              <div className="mobile-shop-modal">
                <Link to='/top' onClick={() => { setShowClothes(false); setIsMobileMenuOpen(false); }}>Tops</Link>
                <Link to='/tank' onClick={() => { setShowClothes(false); setIsMobileMenuOpen(false); }}>Tank Tops</Link>
                <Link to='/crop' onClick={() => { setShowClothes(false); setIsMobileMenuOpen(false); }}>Crop Tops</Link>
                <Link to='/short' onClick={() => { setShowClothes(false); setIsMobileMenuOpen(false); }}>Shorts</Link>
                <Link to='/cap' onClick={() => { setShowClothes(false); setIsMobileMenuOpen(false); }}>Caps</Link>
              </div>
            )}

            <Link to='/allproduct' onClick={() => setIsMobileMenuOpen(false)}>ALL PRODUCTS</Link>
            <Link to='/collection' onClick={() => setIsMobileMenuOpen(false)}>COLLECTIONS</Link>
            <Link to='/lookbook' onClick={() => setIsMobileMenuOpen(false)}>LOOK BOOK</Link>
            <Link to='/about' onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link>
          </div>
        </div>




      )}
    </div>
  );
};

export default Navbar;