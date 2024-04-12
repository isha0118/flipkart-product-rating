import React, { useState } from "react";
import ProductList from "./ProductList";
import ReviewScreen from "./ReviewScreen";
import Header from "./Header";
import "./App.css";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const submitReview = () => {
    setShowSnackbar(true);
    setSelectedProduct(null);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };
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
            <ReviewScreen product={selectedProduct} submitReview={submitReview}/>
          </aside>
        )}
        {showSnackbar && (
        <div className="snackbar show">
          Review for product is submitted successfully!
        </div>
      )}
      </main>
    </>
  );
}

export default App;
