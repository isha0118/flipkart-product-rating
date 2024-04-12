import React from 'react';
import './Header.css'; 
import flipkartLogo from "./assets/flipkart-logo-39904.png"

function Header() {
  return (
    <header className="header">
      <img src={flipkartLogo} alt="Flipkart Logo" className="logo" />
    </header>
  );
}

export default Header;