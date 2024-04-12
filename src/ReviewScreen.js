import React, { useState, useEffect } from 'react';
import './ReviewScreen.css';

function ReviewScreen({ product }) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    const savedReview = localStorage.getItem(product.id);
    if (savedReview) {
      const { rating, review } = JSON.parse(savedReview);
      setRating(rating);
      setReview(review);
    }
  }, [product.id]);

  const handleNext = () => {
    if (step === 1 && rating === 0) {
      alert('Please select a rating.');
    } else {
      setStep(2);
    }
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    if (review.length === 0 || review.length > 100) {
      alert('Review must be between 1 and 100 characters.');
    } else {
      localStorage.setItem(product.id, JSON.stringify({ rating, review }));
      alert('Review submitted successfully!');
      setStep(1);
      setRating(0);
      setReview('');
    }
  };

  return (
    <div className="reviewContainer">
      {step === 1 ? (
        <>
          <div className="reviewHeader">Rate the Product</div>
          <input className="reviewInput" type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
          <button className="reviewButton" onClick={handleNext}>Next</button>
        </>
      ) : (
        <>
          <div className="reviewHeader">Write a Review</div>
          <div>Rating: {rating}</div>
          <textarea className="reviewTextarea" value={review} onChange={(e) => setReview(e.target.value)} maxLength="100" />
          <button className="reviewButton" onClick={handlePrevious}>Previous</button>
          <button className="reviewButton" onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default ReviewScreen;
