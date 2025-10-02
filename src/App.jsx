import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AlphaBanner from './components/AlphaBanner.jsx'; // Import the banner
import './AppLayout.css';

function App() {
  // State to control the banner's visibility
  const [showBanner, setShowBanner] = useState(true);

  const handleDismissBanner = () => {
    setShowBanner(false);
  };

  return (
    <div className="app-layout">
      {/* Conditionally render the banner based on state */}
      {showBanner && <AlphaBanner onDismiss={handleDismissBanner} />}

      <Header />
      <main className="app-main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;