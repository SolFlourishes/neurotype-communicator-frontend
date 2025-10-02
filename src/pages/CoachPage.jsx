import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CoachPage.css';

function CoachPage() {
  // State for the conversation history and the current user input
  const [history, setHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // A ref to the end of the chat messages div to enable auto-scrolling
  const chatEndRef = useRef(null);

  // Automatically scroll to the latest message whenever the history changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return; // Don't send empty messages

    const newUserMessage = { role: 'user', content: userInput };
    const updatedHistory = [...history, newUserMessage];

    setHistory(updatedHistory);
    setUserInput('');
    setLoading(true);
    setError(null);

    try {
      // The backend expects the current message and the history *before* this turn
      const response = await axios.post('http://localhost:5001/api/chat', {
        history: history, // Send the history *before* the new user message
        message: userInput,
      });

      const coachResponse = { role: 'coach', content: response.data.response };
      setHistory([...updatedHistory, coachResponse]);

    } catch (err) {
      setError('An error occurred. Please check the backend server and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="coach-container">
      <Link to="/" className="back-link">‹ Back to Modes</Link>
      <h1>AI Coach</h1>
      <p>Brainstorm ideas and build your confidence for a tough conversation.</p>

      <div className="chat-window">
        {history.map((turn, index) => (
          <div key={index} className={`chat-message ${turn.role}`}>
            <p>{turn.content}</p>
          </div>
        ))}
        {loading && (
          <div className="chat-message coach">
            <p className="thinking">Thinking...</p>
          </div>
        )}
         {error && <div className="error-message">{error}</div>}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask your coach anything..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}

export default CoachPage;