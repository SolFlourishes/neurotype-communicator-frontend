import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../lib/axiosClient.js';
import Feedback from '../components/Feedback.jsx';
import { version } from '../../package.json';
import './TranslatePage.css';

function TranslatePage() {
  const { mode } = useParams();

  const [senderStyle, setSenderStyle] = useState('let-ai-decide');
  const [receiverStyle, setReceiverStyle] = useState('indirect');
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

    let finalSenderStyle = senderStyle;

    try {
      if (senderStyle === 'let-ai-decide') {
        const classificationResponse = await axiosClient.post('/api/classify-style', { text });
        finalSenderStyle = classificationResponse.data.style;
      }

      const requestBody = { mode, text, context, interpretation, sender: finalSenderStyle, receiver: receiverStyle };
      const translateResponse = await axiosClient.post('/api/translate', requestBody);
      
      const cleanupString = (str) => {
        if (!str) return '';
        return str.replace(/['`]{3}html/g, '').replace(/['`]{3}/g, '').trim();
      };

      const cleanedData = {
        response: cleanupString(translateResponse.data.response),
        explanation: cleanupString(translateResponse.data.explanation)
      };
      setAiResponse(cleanedData);

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
    const feedbackData = {
      responseRating,
      responseComment,
      explanationRating,
      explanationComment,
      mode,
      version: version,
    };
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
            <label>My Communication Style tends to be:
              <span className="tooltip-container"> (i)
                <span className="tooltip-text">
                  <strong>Direct & Literal:</strong> You tend to say what you mean, focus on facts, and prefer clear language.<br/><br/>
                  <strong>Indirect & Nuanced:</strong> You often use context, social rapport, and subtext to convey meaning.
                </span>
              </span>
            </label>
            <div className="options">
              <label className={senderStyle === 'direct' ? 'selected' : ''}>
                <input type="radio" name="sender" value="direct" checked={senderStyle === 'direct'} onChange={(e) => setSenderStyle(e.target.value)} />
                Direct & Literal
              </label>
              <label className={senderStyle === 'indirect' ? 'selected' : ''}>
                <input type="radio" name="sender" value="indirect" checked={senderStyle === 'indirect'} onChange={(e) => setSenderStyle(e.target.value)} />
                Indirect & Nuanced
              </label>
               <label className={senderStyle === 'let-ai-decide' ? 'selected' : ''}>
                <input type="radio" name="sender" value="let-ai-decide" checked={senderStyle === 'let-ai-decide'} onChange={(e) => setSenderStyle(e.target.value)} />
                Let the AI Decide
              </label>
            </div>
          </div>
          <div className="selector-group">
            <label>My Audience's Style tends to be:</label>
            <div className="options">
              <label className={receiverStyle === 'direct' ? 'selected' : ''}>
                <input type="radio" name="receiver" value="direct" checked={receiverStyle === 'direct'} onChange={(e) => setReceiverStyle(e.target.value)} />
                Direct & Literal
              </label>
              <label className={receiverStyle === 'indirect' ? 'selected' : ''}>
                <input type="radio" name="receiver" value="indirect" checked={receiverStyle === 'indirect'} onChange={(e) => setReceiverStyle(e.target.value)} />
                Indirect & Nuanced
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