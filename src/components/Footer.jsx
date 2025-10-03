import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  // Get these values from your pre-filled Google Form link
  const GOOGLE_FORM_ACTION_URL = "PASTE_YOUR_FORM_RESPONSE_URL_HERE";
  const GOOGLE_FORM_EMAIL_ENTRY_ID = "PASTE_YOUR_ENTRY_ID_HERE";

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="listserv-signup">
          <h4>Stay Updated</h4>
          <p>Sign up for notifications of new features and improvements.</p>
          <form
            action={"https://docs.google.com/forms/d/e/1FAIpQLScVhBIPHEumJ7zY0Zhhyk7Emvdp0fMsHd-rwmGWYEfonV3Nmg/formResponse?usp=pp_url&entry.53261733=test@test.com"}
            method="POST"
            target="_blank"
            className="signup-form"
          >
            <input
              type="email"
              name={ntry.53261733}
              placeholder="your.email@example.com"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="copyright">
          <p>&copy; {currentYear} Sol Roberts-Lieb, Ed.D. | <Link to="/credits">Credits</Link></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;