import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../lib/axiosClient.js'; // <-- THE FIX IS HERE
import './CoachPage.css';

function CoachPage() {
  const [history, setHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = { role: 'user', content: userInput };
    const updatedHistory = [...history, newUserMessage];

    setHistory(updatedHistory);
    setUserInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.post('/api/chat', {
        history: history,
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