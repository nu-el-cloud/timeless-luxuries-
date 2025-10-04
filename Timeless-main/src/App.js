import React from "react";
import "@fontsource/montserrat"; // Defaults to 400 weight
import "@fontsource/montserrat/700.css"; // Optional: bold
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from './Components/Scroll/Scroll';

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";


// Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import AllProducts from "./Pages/Allproducts/Allproducts";
import Collections from "./Pages/Collections/Collections";
import Lookbook from "./Pages/Lookbook/Lookbook";
import Cart from "./Pages/Cart/Cart";
import Top from "./Pages/Preview/Preview";
import Tank from "./Pages/Tanktops/Tanktops";
import Crop from "./Pages/Croptop/Croptop";
import Short from "./Pages/Short/Short";
import Cap from "./Pages/Cap/Cap";

function App() {

  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      <ScrollToTop />
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/allproduct" element={<AllProducts /> } />
        <Route path="/collection" element={<Collections />} />
        <Route path="/lookbook" element={<Lookbook />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/top" element={<Top />} />
        <Route path="/tank" element={<Tank />} />
        <Route path="/crop" element={<Crop />} />
        <Route path="/short" element={<Short />} />
        <Route path="/cap" element={<Cap />} />
      </Routes>

       {/* Footer always visible */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
