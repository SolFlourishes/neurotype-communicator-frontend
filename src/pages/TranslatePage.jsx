import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
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
    const textForClassification = mode === 'draft' ? (context || text) : text;


    try {
      if (senderStyle === 'let-ai-decide') {
        if (!textForClassification) {
          setError("Please provide some text for the AI to analyze your style.");
          setLoading(false);
          return;
        }
        const classificationResponse = await axios.post('/api/classify-style', { text: textForClassification });
        finalSenderStyle = classificationResponse.data.style;
      }

      const requestBody = { mode, text, context, interpretation, sender: finalSenderStyle, receiver: receiverStyle };
      const translateResponse = await axios.post('/api/translate', requestBody);
      
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
    setText(''); setContext(''); setInterpretation(''); setError(null);
    setAiResponse(null); setFeedbackSuccess(null);
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
      await axios.post('/api/feedback', feedbackData);
      setFeedbackSuccess('Thank you for your feedback!');
    } catch (err) {
      console.error('Failed to submit feedback', err);
    }
  };
  
  const isDraftMode = mode === 'draft';

  const boxes = {
    draft: [
      { title: "What I Mean (Intent)", content: <textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="What is the goal of your message?" required />, isUserInput: true },
      { title: "What I Wrote (Draft)", content: <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What are your key points or raw thoughts?" required />, isUserInput: true },
      { title: "How They Might Hear It (Explanation)", content: <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse?.explanation }} /> },
      { title: "The Translation (Suggested Draft)", content: <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse?.response }} /> },
    ],
    analyze: [
      { title: "What They Wrote (Received Message)", content: <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the message you received." required />, isUserInput: true },
      { title: "How I Heard It (My Interpretation)", content: <textarea value={interpretation} onChange={(e) => setInterpretation(e.target.value)} placeholder="How did this message make you feel or what do you think it means?" required />, isUserInput: true },
      { title: "What They Likely Meant (Explanation)", content: <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse?.explanation }} /> },
      { title: "The Translation (Suggested Response)", content: <div className="ai-output" dangerouslySetInnerHTML={{ __html: aiResponse?.response }} /> },
    ]
  };
  const currentBoxes = boxes[mode] || [];

  return (
    <div className="translate-container">
      <Link to="/" className="back-link">‹ Back to Modes</Link>
      <h1>{isDraftMode ? 'Draft a Message' : 'Analyze a Message'}</h1>
      
      <div className="selectors-container">
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
      
      <div className="four-box-grid">
        {currentBoxes.map((box, index) => (
          <div key={index} className={`io-box ${box.isUserInput ? 'user-input' : ''}`}>
            <h3>{box.title}</h3>
            {box.content}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={handleSubmit} disabled={loading}>{loading ? 'Thinking...' : 'Translate'}</button>
        <button type="button" onClick={handleReset} className="reset-button">Reset</button>
      </div>

      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {aiResponse && (
        <div className="response-container">
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