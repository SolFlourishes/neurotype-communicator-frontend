import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Feedback from '../components/Feedback.jsx';
import { version } from '../../package.json';
import './TranslatePage.css';

function TranslatePage() {
  const { mode } = useParams();

  // UI State
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  // Basic Selectors State
  const [senderStyle, setSenderStyle] = useState('let-ai-decide');
  const [receiverStyle, setReceiverStyle] = useState('indirect');
  
  // Advanced Selectors State
  const [senderNeurotype, setSenderNeurotype] = useState('unsure');
  const [receiverNeurotype, setReceiverNeurotype] = useState('unsure');
  const [senderGeneration, setSenderGeneration] = useState('unsure');
  const [receiverGeneration, setReceiverGeneration] = useState('unsure');

  // Form & Response State
  const [text, setText] = useState('');
  const [context, setContext] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  
  // Feedback State
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

      const requestBody = {
        mode, text, context, interpretation,
        sender: finalSenderStyle,
        receiver: receiverStyle
      };

      if (isAdvancedMode) {
        requestBody.senderNeurotype = senderNeurotype;
        requestBody.receiverNeurotype = receiverNeurotype;
        requestBody.senderGeneration = senderGeneration;
        requestBody.receiverGeneration = receiverGeneration;
      }

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
      responseRating, responseComment, explanationRating,
      explanationComment, mode, version,
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
      { id: 'intent-label', title: "What I Mean (Intent)", required: true, content: <textarea id="intent-input" aria-labelledby="intent-label" value={context} onChange={(e) => setContext(e.target.value)} placeholder="What is the goal of your message?" required />, isUserInput: true },
      { id: 'draft-label', title: "What I Wrote (Draft)", required: true, content: <textarea id="draft-input" aria-labelledby="draft-label" value={text} onChange={(e) => setText(e.target.value)} placeholder="What are your key points or raw thoughts?" required />, isUserInput: true },
      { id: 'explanation-label', title: "How They Might Hear It (Explanation)", content: <div className="ai-output" role="region" aria-labelledby="explanation-label" dangerouslySetInnerHTML={{ __html: aiResponse?.explanation }} /> },
      { id: 'translation-label', title: "The Translation (Suggested Draft)", content: <div className="ai-output" role="region" aria-labelledby="translation-label" dangerouslySetInnerHTML={{ __html: aiResponse?.response }} /> },
    ],
    analyze: [
      { id: 'received-label', title: "What They Wrote (Received Message)", required: true, content: <textarea id="received-input" aria-labelledby="received-label" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the message you received." required />, isUserInput: true },
      { id: 'interpretation-label', title: "How I Heard It (My Interpretation)", required: true, content: <textarea id="interpretation-input" aria-labelledby="interpretation-label" value={interpretation} onChange={(e) => setInterpretation(e.target.value)} placeholder="How did this message make you feel or what do you think it means?" required />, isUserInput: true },
      { id: 'explanation-label-analyze', title: "What They Likely Meant (Explanation)", content: <div className="ai-output" role="region" aria-labelledby="explanation-label-analyze" dangerouslySetInnerHTML={{ __html: aiResponse?.explanation }} /> },
      { id: 'translation-label-analyze', title: "The Translation (Suggested Response)", content: <div className="ai-output" role="region" aria-labelledby="translation-label-analyze" dangerouslySetInnerHTML={{ __html: aiResponse?.response }} /> },
    ]
  };
  const currentBoxes = boxes[mode] || [];

  return (
    <div className="translate-container">
      <Link to="/" className="back-link">‹ Back to Modes</Link>
      <h1>{isDraftMode ? 'Draft a Message' : 'Analyze a Message'}</h1>

      <p className="page-description">
        {isDraftMode 
          ? "For the best results, please fill out both boxes below. Clearly defining your intent helps the AI create a more accurate and effective translation."
          : "Please fill out both boxes to help the AI understand the gap between the sender's message and your interpretation."
        }
      </p>
      
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

      <div className="advanced-mode-toggle">
        <label>
          <input 
            type="checkbox" 
            checked={isAdvancedMode} 
            onChange={() => setIsAdvancedMode(!isAdvancedMode)}
          />
          Show Advanced Options
        </label>
      </div>

      {isAdvancedMode && (
        <div className="advanced-options">
          <div className="selector-group">
            <label>My Neurotype (Advanced)</label>
            <div className="options">
              <label className={senderNeurotype === 'neurodivergent' ? 'selected' : ''}>
                <input type="radio" name="sender-nt" value="neurodivergent" checked={senderNeurotype === 'neurodivergent'} onChange={(e) => setSenderNeurotype(e.target.value)} />
                Neurodivergent
              </label>
              <label className={senderNeurotype === 'neurotypical' ? 'selected' : ''}>
                <input type="radio" name="sender-nt" value="neurotypical" checked={senderNeurotype === 'neurotypical'} onChange={(e) => setSenderNeurotype(e.target.value)} />
                Neurotypical
              </label>
              <label className={senderNeurotype === 'unsure' ? 'selected' : ''}>
                <input type="radio" name="sender-nt" value="unsure" checked={senderNeurotype === 'unsure'} onChange={(e) => setSenderNeurotype(e.target.value)} />
                Unsure
              </label>
            </div>
          </div>
          <div className="selector-group">
            <label>Audience's Neurotype (Advanced)</label>
            <div className="options">
              <label className={receiverNeurotype === 'neurodivergent' ? 'selected' : ''}>
                <input type="radio" name="receiver-nt" value="neurodivergent" checked={receiverNeurotype === 'neurodivergent'} onChange={(e) => setReceiverNeurotype(e.target.value)} />
                Neurodivergent
              </label>
              <label className={receiverNeurotype === 'neurotypical' ? 'selected' : ''}>
                <input type="radio" name="receiver-nt" value="neurotypical" checked={receiverNeurotype === 'neurotypical'} onChange={(e) => setReceiverNeurotype(e.target.value)} />
                Neurotypical
              </label>
              <label className={receiverNeurotype === 'unsure' ? 'selected' : ''}>
                <input type="radio" name="receiver-nt" value="unsure" checked={receiverNeurotype === 'unsure'} onChange={(e) => setReceiverNeurotype(e.target.value)} />
                Unsure
              </label>
            </div>
          </div>
          <div className="selector-group">
            <label>My Generation (Advanced)
              <span className="tooltip-container"> (i)
                <span className="tooltip-text">
                  <strong>Gen Alpha:</strong> ~2013 - Present<br/>
                  <strong>Gen Z:</strong> ~1997 - 2012<br/>
                  <strong>Millennial:</strong> ~1981 - 1996<br/>
                  <strong>Xennial:</strong> ~1977 - 1983<br/>
                  <strong>Gen X:</strong> ~1965 - 1980<br/>
                  <strong>Boomer:</strong> ~1946 - 1964
                </span>
              </span>
            </label>
            <div className="options">
              <label className={senderGeneration === 'Gen Alpha' ? 'selected' : ''}>
                <input type="radio" name="sender-gen" value="Gen Alpha" checked={senderGeneration === 'Gen Alpha'} onChange={(e) => setSenderGeneration(e.target.value)} />
                Gen Alpha
              </label>
              <label className={senderGeneration === 'Gen Z' ? 'selected' : ''}>
                <input type="radio" name="sender-gen" value="Gen Z" checked={senderGeneration === 'Gen Z'} onChange={(e) => setSenderGeneration(e.target.value)} />
                Gen Z
              </label>
              <label className={senderGeneration === 'Millennial' ? 'selected' : ''}>
                <input type="radio" name="sender-gen" value="Millennial" checked={senderGeneration === 'Millennial'} onChange={(e) => setSenderGeneration(e.target.value)} />
                Millennial
              </label>
              <label className={senderGeneration === 'Xennial' ? 'selected' : ''}>
                <input type="radio" name="sender-gen" value="Xennial" checked={senderGeneration === 'Xennial'} onChange={(e) => setSenderGeneration(e.target.value)} />
                Xennial
              </label>
              <label className={senderGeneration === 'Gen X' ? 'selected' : ''}>
                <input type="radio" name="sender-gen" value="Gen X" checked={senderGeneration === 'Gen X'} onChange={(e) => setSenderGeneration(e.target.value)} />
                Gen X
              </label>
              <label className={senderGeneration === 'Boomer' ? 'selected' : ''}>
                <input type="radio" name="sender-gen" value="Boomer" checked={senderGeneration === 'Boomer'} onChange={(e) => setSenderGeneration(e.target.value)} />
                Boomer
              </label>
               <label className={senderGeneration === 'unsure' ? 'selected' : ''}>
                <input type="radio" name="sender-gen" value="unsure" checked={senderGeneration === 'unsure'} onChange={(e) => setSenderGeneration(e.target.value)} />
                Unsure
              </label>
            </div>
          </div>
          <div className="selector-group">
            <label>Audience's Generation (Advanced)</label>
            <div className="options">
               <label className={receiverGeneration === 'Gen Alpha' ? 'selected' : ''}>
                <input type="radio" name="receiver-gen" value="Gen Alpha" checked={receiverGeneration === 'Gen Alpha'} onChange={(e) => setReceiverGeneration(e.target.value)} />
                Gen Alpha
              </label>
              <label className={receiverGeneration === 'Gen Z' ? 'selected' : ''}>
                <input type="radio" name="receiver-gen" value="Gen Z" checked={receiverGeneration === 'Gen Z'} onChange={(e) => setReceiverGeneration(e.target.value)} />
                Gen Z
              </label>
              <label className={receiverGeneration === 'Millennial' ? 'selected' : ''}>
                <input type="radio" name="receiver-gen" value="Millennial" checked={receiverGeneration === 'Millennial'} onChange={(e) => setReceiverGeneration(e.target.value)} />
                Millennial
              </label>
              <label className={receiverGeneration === 'Xennial' ? 'selected' : ''}>
                <input type="radio" name="receiver-gen" value="Xennial" checked={receiverGeneration === 'Xennial'} onChange={(e) => setReceiverGeneration(e.target.value)} />
                Xennial
              </label>
              <label className={receiverGeneration === 'Gen X' ? 'selected' : ''}>
                <input type="radio" name="receiver-gen" value="Gen X" checked={receiverGeneration === 'Gen X'} onChange={(e) => setReceiverGeneration(e.target.value)} />
                Gen X
              </label>
               <label className={receiverGeneration === 'Boomer' ? 'selected' : ''}>
                <input type="radio" name="receiver-gen" value="Boomer" checked={receiverGeneration === 'Boomer'} onChange={(e) => setReceiverGeneration(e.target.value)} />
                Boomer
              </label>
               <label className={receiverGeneration === 'unsure' ? 'selected' : ''}>
                <input type="radio" name="receiver-gen" value="unsure" checked={receiverGeneration === 'unsure'} onChange={(e) => setReceiverGeneration(e.target.value)} />
                Unsure
              </label>
            </div>
          </div>
        </div>
      )}
      
      <div className="four-box-grid">
        {currentBoxes.map((box) => (
          <div key={box.id} className={`io-box ${box.isUserInput ? 'user-input' : ''}`}>
            <h3 id={box.id}>
              {box.title}
              {box.required && <span className="required-asterisk"> *</span>}
            </h3>
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