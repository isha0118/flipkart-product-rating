import React, { useEffect, useState } from 'react';
import Loader from "./ Loader";
import './ProductList.css';
import errorIcon from "./assets/error.png";

function ProductList({ onSelectProduct, onLoadingComplete, selectedProductId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true); 
    setError(null);
    try {
      const response = await fetch('https://65e60da8d7f0758a76e8083a.mockapi.io/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const finalData = data.map((obj, i) => {
        return { ...obj, id: i };
      });
      setProducts(finalData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      onLoadingComplete && onLoadingComplete(); 
    }
  };

  const getImageUrl = (url, width, height, quality) => {
    return url.replace('{@width}', width).replace('{@height}', height).replace('{@quality}', quality);
  };

  if (loading) return <Loader />;
  if (error) {
    return (
      <div className="errorContainer">
        <img src={errorIcon} alt="error icon" className="errorIcon" />
        <p className="errorMessage">Failed to load products</p>
        <button className="retryButton" onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

  return (
    <ul className="productList">
      {products.map(product => (
        <li 
          key={product.id} 
          onClick={() => onSelectProduct(product)}
          className={`productItem ${product.id === selectedProductId ? 'selected' : ''}`}
        >
          <img src={getImageUrl(product.image, '150', '150', '80')} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.subTitle.join(', ')}</p>
            <div className="rnp">
              <p className="rating">{product.rating}</p>
              <p>₹{product.price}</p>
            </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
