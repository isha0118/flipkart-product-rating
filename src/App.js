import React, { useState } from 'react';
import ProductList from './ProductList';
import ReviewScreen from './ReviewScreen';
import Header from './Header';
import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Header />
      <main className="appContainer">
        {/* Render the full-width ProductList if no product is selected */}
        <section className={selectedProduct ? "section" : "fullWidthSection"}>
          <ProductList onSelectProduct={setSelectedProduct} />
        </section>
        
        {/* Conditionally render the ReviewScreen if a product is selected */}
        {selectedProduct && (
          <aside className="aside">
            <ReviewScreen product={selectedProduct} />
          </aside>
        )}
      </main>
    </>
  );
}

export default App;
