import React from 'react'
import { Link } from 'react-router-dom';

import "./Collections.css";
import "../Lookbook/Lookbook.css";

import lookn from '../../Assets/lookbookn.jpg'
import cap from '../../Assets/caps.jpg' 
import tanktop from '../../Assets/wtt.png'

import short from '../../Assets/bdf.png'
import croptop from '../../Assets/batct.png'
import tshirt from '../../Assets/bb.png'


const Collections = () => {
  return (
    
     <div className='collect'>
    
    
              <div className='row-a'>
                <Link to="/allproduct" > <img src={lookn} alt='lookbook' /> </Link>
                <Link to="/cap" > <img src={cap} alt='lookbook' /> </Link>
                <Link to="/top" > <img src={tshirt} alt='lookbook' /> </Link>
              </div>
    
              <div className='row-b'>
               <Link to="/tank" > <img src={tanktop} alt='lookbook' /> </Link>
               <Link to="/crop" > <img src={croptop} alt='lookbook' /> </Link>
               <Link to="/short" > <img src={short} alt='lookbook' /> </Link>
              </div>
              
            </div>

  )
}

export default Collections