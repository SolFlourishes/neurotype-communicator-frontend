import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import TranslatePage from './pages/TranslatePage.jsx';
import CoachPage from './pages/CoachPage.jsx';

// Import the new static pages
import HowToUsePage from './pages/HowToUsePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import RoadmapPage from './pages/RoadmapPage.jsx';
import EnhancementsPage from './pages/EnhancementsPage.jsx';
import ChangeLogPage from './pages/ChangeLogPage.jsx';
import CreditsPage from './pages/CreditsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/translate/:mode', element: <TranslatePage /> },
      { path: '/coach', element: <CoachPage /> },
      // Add routes for the static pages
      { path: '/how-to-use', element: <HowToUsePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/roadmap', element: <RoadmapPage /> },
      { path: '/enhancements', element: <EnhancementsPage /> },
      { path: '/changelog', element: <ChangeLogPage /> },
      { path: '/credits', element: <CreditsPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);