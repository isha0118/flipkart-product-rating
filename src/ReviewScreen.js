import React, { useState } from 'react';
import './ReviewScreen.css'; // Ensure your CSS styles are defined as per the design

// Importing star images
import starEmpty from "./assets/star-empty.svg";
import starFilled from './assets/star-filled.svg';
import starError from './assets/star-error.svg';

function ReviewScreen({ product }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewError, setReviewError] = useState(false); // State to manage review error
  const [ratingError, setRatingError] = useState("");

  // Function to handle star click
  const handleStarClick = (starNumber) => {
    setRating(starNumber);
    if (currentStep === 1) setRatingError(false); // Reset error when user selects a rating
  };

  // Function to go to next step
  const goToNextStep = () => {
    if (currentStep === 1 && rating === 0) {
      setRatingError(true); // Show error if no rating given
    } else if (currentStep === 2 && reviewText.trim().length < 100) {
      setReviewError(true); // Show error if review text is less than 100 characters
    } else {
      setReviewError(false);
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to submit the review
  const submitReview = () => {
    if (reviewText.trim().length >= 100) {
      // Save review to local storage or state
      localStorage.setItem(`review_${product.id}`, JSON.stringify({ rating, reviewText }));
      setCurrentStep(currentStep + 1); // Move to summary step or handle as needed
    } else {
      setReviewError(true); // Show error if review text is less than 100 characters
    }
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img 
          key={i} 
          src={rating >= i ? starFilled : starEmpty} 
          alt={`${i} Star`} 
          onClick={() => handleStarClick(i)}
          className="star"
        />
      );
    }
    return stars;
  };


  return (
    <div className="review-screen">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${currentStep / 3 * 100}%` }}></div>
      </div>
      <div className="steps">
        <div className={`step ${currentStep === 1 ? 'active' : ''}`}>1 Rating</div>
        <div className={`step ${currentStep === 2 ? 'active' : ''}`}>2 Review</div>
        <div className={`step ${currentStep === 3 ? 'active' : ''}`}>3 Summary</div>
      </div>
      {currentStep === 1 && (
        <div className="rating-step">
          <p>Please provide your rating</p>
          <div className="stars">{renderStars()}</div>
          {ratingError && <div className="error-message">Please select a star rating.</div>}
          <button className="next-btn" onClick={goToNextStep}>Next</button>
        </div>
      )}
      {currentStep === 2 && (
        <div className="review-step">
          <p>Please write your review (100 characters minimum)</p>
          <textarea 
            value={reviewText} 
            onChange={(e) => setReviewText(e.target.value)} 
            maxLength="1000" // Set maximum length to your preference
            className="review-textarea"
          />
          {reviewError && <div className="error-message">Review must be at least 100 characters.</div>}
          <button className="next-btn" onClick={submitReview}>Submit</button>
        </div>
      )}
      {currentStep === 3 && (
        <div className="summary-step">
          {/* Summary content */}
        </div>
      )}
    </div>
  );
}

export default ReviewScreen;
