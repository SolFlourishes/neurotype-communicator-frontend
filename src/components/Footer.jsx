import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="app-footer">
      <p>&copy; {currentYear} Sol Roberts-Lieb, Ed.D. | <Link to="/credits">Credits</Link></p>
    </footer>
  );
}

export default Footer;