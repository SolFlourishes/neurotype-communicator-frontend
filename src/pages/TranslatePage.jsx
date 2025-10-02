import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient'; // Use the shared client
import Feedback from '../components/Feedback.jsx';
import './TranslatePage.css';

function TranslatePage() {
  const { mode } = useParams();

  const [senderType, setSenderType] = useState('neurodivergent');
  const [receiverType, setReceiverType] = useState('neurotypical');
  const [text, setText] = useState('');
  const [context, setContext] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [responseRating, setResponseRating] = useState(0);
  const [responseComment, setResponseComment] = useState('');
  const [explanationRating, setExplanationRating] = useState(0);
  const [explanationComment, setExplanationComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setAiResponse(null);
    setFeedbackSuccess(null);

    const requestBody = {
      mode,
      text,
      context,
      interpretation,
      sender: senderType,
      receiver: receiverType,
    };

    try {
      const response = await axiosClient.post('/api/translate', requestBody);
      setAiResponse(response.data);
    } catch (err) {
      setError('An error occurred. Please check the backend server and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText('');
    setContext('');
    setInterpretation('');
    setError(null);
    setAiResponse(null);
    setFeedbackSuccess(null);
  };

  const handleFeedbackSubmit = async () => {
    const feedbackData = { responseRating, responseComment, explanationRating, explanationComment, mode };
    try {
      await axiosClient.post('/api/feedback', feedbackData);
      setFeedbackSuccess('Thank you for your feedback!');
    } catch (err) {
      console.error('Failed to submit feedback', err);
    }
  };
  
  const isDraftMode = mode === 'draft';

  return (
    <div className="translate-container">
      <Link to="/" className="back-link">‹ Back to Modes</Link>
      
      <h1>{isDraftMode ? 'Draft a Message' : 'Analyze a Message'}</h1>
      
      <form onSubmit={handleSubmit} className="translate-form">
        <div className="neurotype-selectors">
          <div className="selector-group">
            <label>My Communication Style</label>
            <div className="options">
              <label className={senderType === 'neurodivergent' ? 'selected' : ''}>
                <input type="radio" name="sender" value="neurodivergent" checked={senderType === 'neurodivergent'} onChange={(e) => setSenderType(e.target.value)} />
                Neurodivergent
              </label>
              <label className={senderType === 'neurotypical' ? 'selected' : ''}>
                <input type="radio" name="sender" value="neurotypical" checked={senderType === 'neurotypical'} onChange={(e) => setSenderType(e.target.value)} />
                Neurotypical
              </label>
               <label className={senderType === 'unsure' ? 'selected' : ''}>
                <input type="radio" name="sender" value="unsure" checked={senderType === 'unsure'} onChange={(e) => setSenderType(e.target.value)} />
                Unsure
              </label>
            </div>
          </div>
          <div className="selector-group">
            <label>My Audience's Style</label>
            <div className="options">
              <label className={receiverType === 'neurodivergent' ? 'selected' : ''}>
                <input type="radio" name="receiver" value="neurodivergent" checked={receiverType === 'neurodivergent'} onChange={(e) => setReceiverType(e.target.value)} />
                Neurodivergent
              </label>
              <label className={receiverType === 'neurotypical' ? 'selected' : ''}>
                <input type="radio" name="receiver" value="neurotypical" checked={receiverType === 'neurotypical'} onChange={(e) => setReceiverType(e.target.value)} />
                Neurotypical
              </label>
              <label className={receiverType === 'unsure' ? 'selected' : ''}>
                <input type="radio" name="receiver" value="unsure" checked={receiverType === 'unsure'} onChange={(e) => setReceiverType(e.target.value)} />
                Unsure
              </label>
            </div>
          </div>
        </div>

        {isDraftMode ? (
          <>
            <label htmlFor="context">Context / Goal</label>
            <textarea id="context" value={context} onChange={(e) => setContext(e.target.value)} placeholder="e.g., I need to ask my boss for a deadline extension." required />
            <label htmlFor="text">Your Draft or Key Points</label>
            <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g., need more time on report" required />
          </>
        ) : (
          <>
            <label htmlFor="text">Message You Received</label>
            <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g., Hey, can we talk for a minute?" required />
            <label htmlFor="interpretation">Your Interpretation</label>
            <textarea id="interpretation" value={interpretation} onChange={(e) => setInterpretation(e.target.value)} placeholder="e.g., I think they are mad at me for the last project." required />
          </>
        )}
        <div className="button-group">
          <button type="submit" disabled={loading}>{loading ? 'Thinking...' : 'Translate'}</button>
          <button type="button" onClick={handleReset} className="reset-button">Reset</button>
        </div>
      </form>

      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {aiResponse && (
        <div className="response-container">
          <div className="response-section">
            <h2>Suggested Response</h2>
            <div dangerouslySetInnerHTML={{ __html: aiResponse.response }} />
          </div>
          <div className="response-section">
            <h2>Explanation</h2>
            <div dangerouslySetInnerHTML={{ __html: aiResponse.explanation }} />
          </div>

          {!feedbackSuccess && (
            <div className="feedback-container">
              <Feedback title="Rate the 'Suggested Response'" onRatingChange={setResponseRating} onCommentChange={setResponseComment} />
              <Feedback title="Rate the 'Explanation'" onRatingChange={setExplanationRating} onCommentChange={setExplanationComment} />
              <button onClick={handleFeedbackSubmit} className="submit-feedback-button">Submit Feedback</button>
            </div>
          )}
          {feedbackSuccess && <div className="success-message">{feedbackSuccess}</div>}
        </div>
      )}
    </div>
  );
}

export default TranslatePage;