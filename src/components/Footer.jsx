import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Subscribing...');
    try {
      const response = await axios.post('/api/subscribe', { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="listserv-signup">
          <h4>Stay Updated</h4>
          <p>Sign up to receive notifications of new features and improvements.</p>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {message && <p className="signup-message">{message}</p>}
        </div>
        <div className="copyright">
          <p>&copy; {currentYear} Sol Roberts-Lieb, Ed.D. | <Link to="/credits">Credits</Link></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;