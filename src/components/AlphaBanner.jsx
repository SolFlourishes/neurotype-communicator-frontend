import React from 'react';
import './AlphaBanner.css';

function AlphaBanner({ onDismiss }) {
  return (
    <div className="alpha-banner">
      <p>
        🧪 This is an Alpha version of the Neurotype Communicator. Features may change, and we'd love your feedback!
      </p>
      <button onClick={onDismiss} className="dismiss-button" aria-label="Dismiss banner">&times;</button>
    </div>
  );
}

export default AlphaBanner;