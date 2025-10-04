import React from "react";
import "./Home.css";
import { Link } from 'react-router-dom';
import intro from '../../Assets/Picdisplay.jpg';
import introVideo from '../../Assets/backgroundvid.mp4';

import FrontWhite from '../../Assets/fw.png'
import FrontBlack from '../../Assets/fb.png'
import FrontTankWhite from '../../Assets/wtt.png'
import FrontTankBlack from '../../Assets/btt.png'
import WhiteCrop from '../../Assets/wct.png'
import BlackCrop from '../../Assets/batct.png'
import WhiteShort from '../../Assets/wsf.png'
import BlackShort from '../../Assets/bdf.png'
import BlackCap from '../../Assets/bc.png'



import displaya from '../../Assets/PULSEOFSOUNDB.jpg';
import displayb from '../../Assets/PULSEOFSOUNDBLACK.jpg';



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

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="display">
        {/* Video Section */}
        <div className="video-container">
          <video src={introVideo} autoPlay muted loop playsInline />
        </div>

        {/* Image Section */}
        <div className="display-pic">
          <img src={intro} alt="intro" />
        </div>
      </div>

        <div className="all-products">
      
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



      {/* "View All" Button */}
      <div className="view-all-container">
        <a href="/allproduct" className="view-all-btn">View all →</a>

        <div className="down-pic">
          <img src={displaya} alt="Display Picture" />
          <img src={displayb} alt="Display Picture" />
        </div>
      </div>
    </div>
  );
};

export default Home;