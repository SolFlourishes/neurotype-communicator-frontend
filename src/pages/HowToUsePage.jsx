import React from 'react';
import '../Content.css';

function HowToUsePage() {
  return (
    <div className="content-page">
      <h1>How to Use the Communicator</h1>
      <p className="mission">This guide will help you get the most out of the Beta version by explaining its new features and workflows with clear examples.</p>
      
      <h2>The "Four-Box" Layout</h2>
      <p>The core of the app is the new four-box layout, which helps you visualize the communication process. The top two boxes are for your input, and the bottom two are for the AI's output.</p>

      <div className="bg-gray-50 p-6 rounded-lg border">
          <h3>Draft a Message</h3>
          <p className="mb-4">Use this mode when you have a thought you need to share effectively.</p>
          <ul className="list-disc space-y-2">
            <li><strong>What I Mean (Intent):</strong> Enter the core goal of your message. What do you want the other person to know, feel, or do?</li>
            <li><strong>What I Wrote (Draft):</strong> Enter your raw thoughts or a rough draft of your message.</li>
            <li><strong>How They Might Hear It (Explanation):</strong> The AI will explain the potential misinterpretations of your draft and the reasoning behind its suggested changes.</li>
            <li><strong>The Translation (Suggested Draft):</strong> The AI's final, polished version of your message, tailored for your audience.</li>
          </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border">
          <h3>Analyze a Message</h3>
          <p className="mb-4">Use this mode when you receive a message that is confusing or has a hidden meaning.</p>
          <ul className="list-disc space-y-2">
            <li><strong>What They Wrote (Received Message):</strong> Paste the message you received.</li>
            <li><strong>How I Heard It (My Interpretation):</strong> Explain how the message made you feel or what you think it means.</li>
            <li><strong>What They Likely Meant (Explanation):</strong> The AI will analyze the subtext and likely intent behind the message.</li>
            <li><strong>The Translation (Suggested Response):</strong> The AI's suggestion for a clear, strategic reply.</li>
          </ul>
      </div>

      <h2>Choosing Your Communication Style</h2>
      <p>Above the four boxes, you'll see new selectors designed to be more inclusive and accurate.</p>
       <div className="bg-gray-50 p-6 rounded-lg border">
          <h3>"My Communication Style"</h3>
          <ul className="list-disc space-y-2">
            <li><strong>Direct & Literal:</strong> Choose this if you tend to say what you mean and focus on facts.</li>
            <li><strong>Indirect & Nuanced:</strong> Choose this if you often use context and subtext.</li>
            <li><strong>Let the AI Decide:</strong> The AI will analyze your writing in the input boxes to automatically determine your style. This is the recommended default.</li>
          </ul>
      </div>

      <h2>Using Advanced Mode</h2>
      <p>Click the "Show Advanced Options" checkbox to reveal more granular selectors that can further refine the AI's response, including options for Neurotype and Generation.</p>
      
      {/* --- RESTORED SECTION --- */}
      <h2 style={{ marginTop: '3rem' }}>Practical Applications: Real-World Scenarios 💡</h2>
      <p>Here are just a few ways the Neurotype Communicator can help you in your daily life:</p>
      
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h3 style={{color: '#a0a0ff'}}>When to use "Draft a Message":</h3>
        <ul className="list-disc space-y-2">
          <li>Preparing for a performance review or asking for a raise.</li>
          <li>Delegating a task to a colleague without sounding bossy or abrupt.</li>
          <li>Setting a difficult but necessary boundary with a friend or family member.</li>
          <li>Writing a delicate email to a client or customer that requires careful phrasing.</li>
          <li>Asking for accommodations or support at work or school.</li>
        </ul>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h3 style={{color: '#a0a0ff'}}>When to use "Analyze a Message":</h3>
        <ul className="list-disc space-y-2">
          <li>Decoding a short, ambiguous text or Slack message from your manager (e.g., "Let's chat tomorrow morning.").</li>
          <li>Understanding verbal feedback that felt vague or personal.</li>
          <li>Interpreting an email from a colleague that seems passive-aggressive or overly political.</li>
          <li>Figuring out what a friend or partner *really* means when they say "I'm fine."</li>
        </ul>
      </div>
    </div>
  );
}

export default HowToUsePage;