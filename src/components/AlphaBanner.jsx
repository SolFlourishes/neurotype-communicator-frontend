import React from 'react';
import './AlphaBanner.css';

function AlphaBanner({ onDismiss }) {
  return (
    <div className="alpha-banner">
      <p>
        🔬 This is a **Beta Development Version**. Features may be unstable. Your feedback is crucial for the next release!
      </p>
      <button onClick={onDismiss} className="dismiss-button" aria-label="Dismiss banner">&times;</button>
    </div>
  );
}

export default AlphaBanner;