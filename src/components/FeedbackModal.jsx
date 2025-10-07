import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackModal.css';

function FeedbackModal({ isOpen, onClose }) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // We reuse the existing contact form function
      await axios.post('/api/contact', {
        name: 'General Feedback',
        email: email || 'anonymous@feedback.com',
        subject: 'General App Feedback',
        message: message,
      });
      setStatus('success');
      setMessage('');
      setEmail('');
    } catch (err) {
      setStatus('error');
      console.error(err);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>General Feedback</h2>

        {status === 'success' ? (
          <div className="success-message">
            <p>Thank you for your feedback!</p>
            <button onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p>Have a suggestion or found a bug? Let us know!</p>
            <textarea
              placeholder="Your feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Submit Feedback'}
            </button>
            {status === 'error' && <p className="error-text">Failed to send feedback. Please try again.</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default FeedbackModal;