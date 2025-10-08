import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AlphaBanner from './components/AlphaBanner.jsx';
import { Analytics } from '@vercel/analytics/react';
import './AppLayout.css';

function App() {
  const [showBanner, setShowBanner] = useState(true);

  const handleDismissBanner = () => {
    setShowBanner(false);
  };

  return (
    <div className="app-layout">
      {showBanner && <AlphaBanner onDismiss={handleDismissBanner} />}
      <Header />
      <main className="app-main-content">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;