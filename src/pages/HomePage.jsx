import React from 'react';
import ModeCard from '../components/ModeCard.jsx';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <h1>Choose a Mode</h1>
      <div className="cards-container">
        <ModeCard
          title="Draft a Message"
          description="I have a thought or feeling I need to share effectively."
          linkTo="/translate/draft"
        />
        <ModeCard
          title="Analyze a Message"
          description="I received a message I don't understand and need to decode."
          linkTo="/translate/analyze"
        />
        <ModeCard
          title="Coach My Response"
          description="I'm not sure where to start and need guided brainstorming."
          linkTo="/coach"
        />
      </div>
    </div>
  );
}

export default HomePage;