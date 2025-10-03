import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  // State for the form
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Your Google Form details remain here
  const GOOGLE_FORM_ACTION_URL = "PASTE_YOUR_FORM_RESPONSE_URL_HERE";
  const GOOGLE_FORM_EMAIL_ENTRY_ID = "PASTE_YOUR_ENTRY_ID_HERE";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Subscribing...');

    const formData = new FormData();
    formData.append(GOOGLE_FORM_EMAIL_ENTRY_ID, email);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // This is required for Google Forms, it will cause a CORS error in the console which is expected
      });
    } catch (error) {
      // This catch block will likely run due to the expected CORS error, which is fine.
      console.error('Error submitting to Google Form (this is expected):', error);
    } finally {
      // We assume success and give the user positive feedback.
      setMessage('Thank you for subscribing!');
      setEmail('');
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