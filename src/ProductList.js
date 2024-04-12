import React, { useEffect, useState } from 'react';
import Loader from './ Loader';
import './ProductList.css';

function ProductList({ onSelectProduct, onLoadingComplete }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://65e60da8d7f0758a76e8083a.mockapi.io/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      onLoadingComplete && onLoadingComplete(); // Notify parent component that loading is complete
    }
  };

  const getImageUrl = (url, width, height, quality) => {
    return url.replace('{@width}', width).replace('{@height}', height).replace('{@quality}', quality);
  };

  if (loading) return <Loader />; // Use the Loader component when loading
  if (error) return <article>Error: {error} <button onClick={fetchProducts}>Retry</button></article>;

  return (
    <ul className="productList">
      {products.map(product => (
        <li key={product.id} onClick={() => onSelectProduct(product)} className="productItem">
          <img src={getImageUrl(product.image, '150', '150', '80')} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.subTitle.join(', ')}</p>
          <p>₹{product.price}</p>
          <p>Rating: {product.rating}</p>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
