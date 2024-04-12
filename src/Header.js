import React from 'react';
import './Header.css'; // Importing the CSS for styling

// Assuming you have the Flipkart logo saved in your project under src/assets/
// If you don't have a logo, you can use any placeholder image or download the Flipkart logo and place it correctly.
import flipkartLogo from "./assets/flipkart-logo-39904.png"

function Header() {
  const path = "/Users/isha/flipkart-product-review/src/assets/flipkart-logo-39904.png";
  return (
    <header className="header">
      <img src={flipkartLogo} alt="Flipkart Logo" className="logo" />
    </header>
  );
}

export default Header;