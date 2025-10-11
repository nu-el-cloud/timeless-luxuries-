import React from 'react';
import './Allproducts.css';
import { Link } from 'react-router-dom';

import FrontWhite from '../../Assets/fw.png'
import FrontBlack from '../../Assets/fb.png'
import FrontTankWhite from '../../Assets/wtt.png'
import FrontTankBlack from '../../Assets/btt.png'
import WhiteCrop from '../../Assets/wct.png'
import BlackCrop from '../../Assets/batct.png'
import WhiteShort from '../../Assets/wsf.png'
import BlackShort from '../../Assets/bdf.png'
import BlackCap from '../../Assets/bc.png'
import RedCap from '../../Assets/rc.png'

// Mock product data — replace with your API later
const stocks = [
  {
    id: 1,
    name: "Timeless New Top - White",
    price: "₦50,000.00",
    image: FrontWhite,
    soldOut: false,
    link: "/top"
  },
  {
    id: 2,
    name: "Timeless New Top - Black",
    price: "₦50,000.00",
    image: FrontBlack,
    soldOut: true,
    link: "/top"
  },
  {
    id: 3,
    name: "Timeless New Tank Tops - White",
    price: "₦25,000.00",
    image: FrontTankWhite,
    soldOut: false,
    link: "/tank"
  },
  {
    id: 4,
    name: "Timeless New Tank Tops - Black",
    price: "₦25,000.00",
    image: FrontTankBlack,
    soldOut: false,
    link: "/tank"
  },
  {
    id: 5,
    name: "Timeless New Tank Crop Tops - White",
    price: "₦25,000.00",
    image: WhiteCrop,
    soldOut: false,
    link: "/crop"
  },
  {
    id: 6,
    name: "Timeless New Tank Crop Tops - Black",
    price: "₦25,000.00",
    image: BlackCrop,
    soldOut: false,
    link: "/crop"
  },
  {
    id: 7,
    name: "Timeless New Shorts - White",
    price: "₦25,000.00",
    image: WhiteShort,
    soldOut: false,
    link: "/short"
  },
  {
    id: 8,
    name: "Timeless New Shorts - Black",
    price: "₦25,000.00",
    image: BlackShort,
    soldOut: false,
    link: "/short"
  },
  {
    id: 9,
    name: "Timeless New Caps - Black",
    price: "₦20,000.00",
    image: BlackCap,
    soldOut: false,
    link: "/cap"
  },
];

const AllProducts = () => {
  return (
    <div className="all-products-page">

      {/* Product Grid */}
      <div className="stock-grid">
        {stocks.map(stock => (
          <Link to={stock.link} >
          <div key={stock.id} className={`stock-card ${stock.soldOut ? 'sold-out' : ''}`}>
            <div className="stock-image">
              <img src={stock.image} alt={stock.name} />
              {stock.soldOut &&  <div className="sold-out-label"> sold out </div>}
            </div>
            <div className="stock-info">
              <h3>{stock.name}</h3>
              <p className="price">{stock.price}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default AllProducts;