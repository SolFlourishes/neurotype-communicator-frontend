import React, { useState } from 'react';
import './Feedback.css'; 

function Feedback({ title, onRatingChange, onCommentChange }) {
  // Local state to manage the selected rating (1-5) and the hover state
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (index) => {
    setRating(index);
    onRatingChange(index); // This passes the new rating back to the parent component
  };

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    setComment(newComment);
    onCommentChange(newComment); // This passes the comment back to the parent component
  };

  return (
    <div className="feedback-group">
      <h4 className="feedback-title">{title} <span className="required-asterisk">*</span></h4>
      
      {/* 5-Star Rating System */}
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "star selected" : "star"}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              {/* Using a standard star character for simplicity and universal rendering */}
              <span className="star-icon">★</span> 
            </button>
          );
        })}
      </div>

      {/* Comment Box */}
      <div className="feedback-comment-area">
        <label htmlFor={`comment-${title.replace(/\s/g, '-')}`}>Comments (Optional)</label>
        <textarea
          id={`comment-${title.replace(/\s/g, '-')}`}
          value={comment}
          onChange={handleCommentChange}
          placeholder="Share your thoughts on this output..."
        />
      </div>
    </div>
  );
}

export default Feedback;