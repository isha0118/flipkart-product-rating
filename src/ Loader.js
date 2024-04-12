import React from "react";
import "././styles/Loader.css";
function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading products...</p>
    </div>
  );
}

export default Loader;
