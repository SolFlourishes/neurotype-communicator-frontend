import React, { useState } from 'react';
import './Feedback.css';

function Feedback({ title, onRatingChange, onCommentChange }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className="feedback-box">
      <h3>{title}</h3>
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <span
            key={starIndex}
            className={`star ${starIndex <= (hoverRating || rating) ? 'filled' : ''}`}
            onClick={() => handleRatingClick(starIndex)}
            onMouseEnter={() => setHoverRating(starIndex)}
            onMouseLeave={() => setHoverRating(0)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className="comment-box"
        placeholder="Optional: Add a comment..."
        onChange={(e) => onCommentChange(e.target.value)}
      />
    </div>
  );
}

export default Feedback;