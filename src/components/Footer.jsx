import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { track } from '@vercel/analytics/react';
import { version } from '../../package.json';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const versionName = version.startsWith('1.') ? 'Alpha' : 'Beta';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/subscribe', { email });
      setMessage(response.data.message);
      setEmail('');

      // Only track if the signup was new and successful
      if (response.status < 300 && response.data.message.includes('Successfully')) {
        track('Listserv Subscribed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {message && <p className="signup-message">{message}</p>}
        </div>
        <div className="copyright">
          <p>
            &copy; {currentYear} Sol Roberts-Lieb, Ed.D. | <Link to="/credits">Credits</Link>
          </p>
          <p className="version-info">
            Version: {versionName} {version}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;