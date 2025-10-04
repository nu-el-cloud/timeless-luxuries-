import React from "react";
import "./About.css";
import aboutpic1 from '../../Assets/about1.jpg';
import aboutpic2 from '../../Assets/about2.jpg';



const About = () => {
  return (
    <div className="about">
      
      <div className="about-section">

           <img src={aboutpic1} alt="about" /> 

        <div className="about-text">
           <h3> ABOUT TIMELESS</h3>
           <h5>TIMELESS is more than just a clothing brand ,
              it’s a story of heritage, resilience, and style that never fades.
              The name was inspired by a phrase my mother always told me: 
              “Your glory is timeless.”
          </h5>

          <img className="less" src={aboutpic2} alt="about" /> 
        </div>

      </div>

      <div className="mission">

        <div className="mission-text">
        {/* <h4>ABOUT</h4> */}
        <h3>Born in 1982, she became the symbol of strength, 
          beauty, and inspiration in my life. From her, I learned that true style is 
          not just about trends, but about leaving a mark that lasts forever.
          <br />
          <br />
          Every piece we create carries that spirit — classic, bold, and built to 
          transcend seasons. Timeless Since 1982 is for those who wear their confidence, 
          embrace their story, and believe that their light will never dim.
          </h3>

          <br />
          <h2>Timeless Since 1982 - Wear Your Glory</h2>
        </div>

        <img src={aboutpic2} alt="about" /> 
      </div>
      
    </div>

    
  );
};

export default About;
