import React from 'react';
import '../Content.css'; // Import shared styles

function HowToUsePage() {
  return (
    <div className="content-page">
      <h1>How to Use the Communicator</h1>
      <p className="mission">This guide will help you get the most out of the Neurotype Communicator by explaining its core features with clear examples.</p>

      <h2>Choosing Your Mode</h2>
      <p>The app has three primary modes. Use the homepage to choose the right tool for your specific challenge.</p>
      <div className="mt-6 space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg border">
              <h3>Draft a Message</h3>
              <p className="mb-4">Select this mode when you have a thought or idea and need help phrasing it effectively for a specific audience. It's your personal writing partner.</p>
              <div className="bg-white p-4 rounded-md border">
                  <h4>Example Scenario:</h4>
                  <p>You (ND) need to tell your NT manager you can't make a work retreat due to personal stress, but you're worried about sounding unprofessional.</p>
              </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border">
              <h3>Analyze a Message</h3>
              <p className="mb-4">This mode is your decoder ring for confusing conversations. It helps you see the subtext and craft a strategic reply.</p>
              <div className="bg-white p-4 rounded-md border">
                  <h4>Example Scenario:</h4>
                  <p>You (ND) pitched an idea to an NT colleague, and they replied with, "That's something to think about."</p>
              </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border">
              <h3>Coach My Response</h3>
              <p className="mb-4">This mode is for when you're not sure where to start, or want to explore an idea more deeply. It's a free-form chat where you can talk through your situation with the AI.</p>
          </div>
      </div>

      {/* --- NEW SECTION --- */}
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