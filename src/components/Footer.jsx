import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { version } from '../../package.json'; // Import the version number
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Determine version name based on major version number
  const versionName = version.startsWith('1.') ? 'Alpha' : 'Beta';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const GOOGLE_FORM_ACTION_URL = "YOUR_GOOGLE_FORM_URL"; // Make sure this is filled in
    const GOOGLE_FORM_EMAIL_ENTRY_ID = "YOUR_ENTRY_ID"; // Make sure this is filled in

    const formData = new FormData();
    formData.append(GOOGLE_FORM_EMAIL_ENTRY_ID, email);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });
      setMessage('Thank you for subscribing!');
      setEmail('');
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
          <p>Sign up for notifications of new features and improvements.</p>
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
          {/* --- NEW VERSION NUMBER DISPLAY --- */}
          <p className="version-info">
            Version: {versionName} {version}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;