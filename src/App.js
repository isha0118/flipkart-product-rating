import React, { useState } from 'react';
import ProductList from './ProductList';
import ReviewScreen from './ReviewScreen';
import Header from './Header';
// import Loader from './Loader'; // Import the Loader component
import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  // Example function that gets called when the ProductList has finished fetching
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <main className="appContainer">
      <section className="section">
            {/* Pass the loading complete handler to ProductList */}
            <ProductList onSelectProduct={setSelectedProduct} onLoadingComplete={handleLoadingComplete} />
          </section>
        <aside className="aside">
          {selectedProduct && <ReviewScreen product={selectedProduct} />}
        </aside>
      </main>
    </>
  );
}

export default App;
