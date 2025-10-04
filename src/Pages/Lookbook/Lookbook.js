import React from 'react'
import "./Lookbook.css";
import looka from '../../Assets/lookbooka.jpg'
import lookb from '../../Assets/lookbookb.jpg'
import lookc from '../../Assets/lookbookc.jpg'
import lookd from '../../Assets/lookbookd.jpg'

import looke from '../../Assets/lookbooke.jpg'
import lookf from '../../Assets/lookbookf.jpg'
import lookg from '../../Assets/lookbookg.jpg'
import lookh from '../../Assets/lookbookh.jpg'

import looki from '../../Assets/lookbooki.jpg'
import lookj from '../../Assets/lookbookj.jpg'
import lookk from '../../Assets/lookbookk.jpg'
import lookl from '../../Assets/lookbookl.jpg'

import lookm from '../../Assets/lookbookm.jpg'
import lookn from '../../Assets/lookbookn.jpg'
import looko from '../../Assets/lookbooko.jpg'
import lookp from '../../Assets/lookbookp.jpg'



const Lookbook = () => {
  return (
    <div className='lookbook'>

       <div className='book-a'>

        <div className='first'>
            <img src={looka} alt='lookbook' />
            <img src={lookb} alt='lookbook' />
            <img src={lookc} alt='lookbook' />
            <img src={lookd} alt='lookbook' />
        </div>

        <div className='second'>
            <img src={looke} alt='lookbook' />
            <img src={lookf} alt='lookbook' />
            <img src={lookg} alt='lookbook' />
            <img src={lookh} alt='lookbook' />
        </div>

        </div>

        <div className='book-b'>


          <div className='third'>
            <img src={looki} alt='lookbook' />
            <img src={lookj} alt='lookbook' />
            <img src={lookk} alt='lookbook' />
            <img src={lookl} alt='lookbook' />
          </div>

          <div className='fourth'>
            <img src={lookm} alt='lookbook' />
            <img src={lookn} alt='lookbook' />
            <img src={looko} alt='lookbook' />
            <img src={lookp} alt='lookbook' />
          </div>
          
        </div>
      


       </div>
  )
}

export default Lookbook