import React, { useState } from 'react';
import './ReviewScreen.css'; // Make sure this CSS file contains all necessary styles

// Importing star images
import starEmpty from "./assets/star-empty.svg";
import starFilled from './assets/star-filled.svg';
import starError from './assets/star-error.svg';

function ReviewScreen({ product }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // Function to handle star click
  const handleStarClick = (starNumber) => {
    setRating(starNumber);
  };

  // Function to render star images
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img 
          key={i} 
          src={i <= rating ? starFilled : starEmpty} 
          alt={`star ${i}`} 
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
      // Show error if no rating given
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  // Function to go to previous step
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Function to submit the review
  const submitReview = () => {
    if (reviewText.trim().length === 0 || reviewText.trim().length > 100) {
      // Show error if no review text or text is too long
      return;
    }
    // Save review to local storage or state
    console.log('Submit review:', { rating, reviewText });
    // Reset state or handle submission
  };

  return (
    <div className="review-screen">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${currentStep / 3 * 100}%` }}></div>
      </div>
      <div className="steps">
        <div className={currentStep === 1 ? 'step active' : 'step'}>1 Rating</div>
        <div className={currentStep === 2 ? 'step active' : 'step'}>2 Review</div>
        <div className={currentStep === 3 ? 'step active' : 'step'}>3 Summary</div>
      </div>
      {currentStep === 1 && (
        <div className="rating-step">
          <p>Please provide your rating</p>
          <div className="stars">{renderStars()}</div>
          <button className="next-btn" onClick={goToNextStep}>Next</button>
        </div>
      )}
      {/* Include additional components or divs for step 2 (Review) and 3 (Summary) */}
    </div>
  );
}

export default ReviewScreen;
