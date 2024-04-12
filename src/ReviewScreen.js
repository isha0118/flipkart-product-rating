import React, { useState, useEffect } from "react";
import "././styles/ReviewScreen.css"; 

import starEmpty from "./assets/star-empty.svg";
import starFilled from "./assets/star-filled.svg";

function ReviewScreen({ product, submitReview }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewError, setReviewError] = useState(false); 
  const [ratingError, setRatingError] = useState("");

  useEffect(() => {
    setCurrentStep(1);
    setRating(0);
    setReviewText("");
    setRatingError(false);
    setReviewError(false);
  }, [product]);

  const handleStarClick = (starNumber) => {
    setRating(starNumber);
    if (currentStep === 1) setRatingError(false); 
  };

  const submitReview_ = () => {
    if (reviewText.trim().length >= 100) {
      localStorage.setItem(`review_${product.id}`, JSON.stringify({ rating, reviewText }));
      setCurrentStep(currentStep + 1);
      submitReview();
    } else {
      setReviewError(true); 
    }
  };

  const goToNextStep = () => {
    if (currentStep === 1 && rating === 0) {
      setRatingError(true); 
    } else if (currentStep === 2 && reviewText.trim().length < 100) {
      setReviewError(true); 
    } else {
      setReviewError(false);
      setCurrentStep(currentStep + 1);
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
      {/* <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${currentStep / 3 * 100}%` }}></div>
      </div> */}
      <div className="steps">
        <div className={`step ${currentStep === 1 ? "active" : ""}`}>1 Rating</div>
        <div className={`step ${currentStep === 2 ? "active" : ""}`}>2 Review</div>
        <div className={`step ${currentStep === 3 ? "active" : ""}`}>3 Summary</div>
      </div>
      {currentStep === 1 && (
        <div className="review-step">
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
            maxLength="1000" 
            className="review-textarea"
          />
          {reviewError && <div className="error-message">Review must be at least 100 characters.</div>}
          <div className="buttons">
          <button className="next-btn" onClick={() => (setCurrentStep(1))}>Previous</button>
          <button className="next-btn" onClick={submitReview_}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewScreen;
