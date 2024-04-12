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
  const [ratingError, setRatingError] = useState(false);

  // Function to handle star click
  const handleStarClick = (starNumber) => {
    setRating(starNumber);
    setRatingError(false); // Reset error when user selects a rating
  };

  // Function to render star images
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

  // Function to go to next step
  const goToNextStep = () => {
    if (currentStep === 1 && rating === 0) {
      setRatingError(true); // Show error if no rating given
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to go to previous step
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Function to submit the review
  const submitReview = () => {
    // Validate the review text and submit the review
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
          {ratingError && <img src={starError} alt="Error" className="error-icon" />}
          <button className="next-btn" onClick={goToNextStep}>Next</button>
        </div>
      )}
      {/* Handle additional steps (2 and 3) here */}
    </div>
  );
}

export default ReviewScreen;
