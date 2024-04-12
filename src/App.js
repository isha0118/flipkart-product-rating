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
        <section className={selectedProduct ? "section" : "fullWidthSection"}>
        <ProductList
            onSelectProduct={setSelectedProduct}
            selectedProductId={selectedProduct && selectedProduct.id}
          />
        </section>
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
