import React from 'react';
import './Loader.css'; // Importing the CSS for styling

// If you have the loader as a separate HTML file and you want to import it directly into your react component
// you would need to set it up as a component or as an HTML string that you can inject.
// However, for security reasons, it's generally better to avoid `dangerouslySetInnerHTML` where possible.
// Instead, you can recreate the spinner using CSS or as an SVG.

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading products...</p>
    </div>
  );
}

export default Loader;
