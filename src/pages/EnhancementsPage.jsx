import React from 'react';
import '../Content.css'; // Import shared styles

function EnhancementsPage() {
  return (
    <div className="content-page">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-3">Proposed Future Enhancements</h1>
      <p className="mission"><strong>Our Goal:</strong> To evolve from a powerful communicator into a truly personalized, context-aware communication partner that learns and grows with you.</p>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-800">Pillar 1: Building the AI Brain</h2>
          <div className="info-card bg-white">
              <h3 className="font-bold text-lg mb-2">User-Improved Translations (The "Golden" Feedback Loop)</h3>
              <p>To solve the "garbage in, garbage out" problem, the Beta version will allow users to directly edit and improve the AI's suggestions. By submitting their "perfect" version, users will provide the highest quality training data possible, allowing us to build a world-class, nuanced AI brain.</p>
          </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-800">Pillar 2: Behavioral & Situational Decoding</h2>
          <div className="info-card bg-white"><h3 className="font-bold text-lg mb-2">The Behavioral Translator</h3><p>Communication is more than just words. This feature will help you decode actions and situations. You'll be able to describe a behavior (e.g., "The facilitator tapped their wrist at me when I tried to speak") and your interpretation ("I felt silenced and took it personally") to get an analysis of the likely intent.</p></div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-800">Pillar 3: Hyper-Personalization</h2>
          <div className="info-card bg-white" style={{marginBottom: '1rem'}}><h3 className="font-bold text-lg mb-2">Secure User Accounts</h3><p>Create a private account to save translation history and track your communication growth.</p></div>
          <div className="info-card bg-white"><h3 className="font-bold text-lg mb-2">"Key Contacts" Profiles</h3><p>Create profiles for people you talk to regularly, so the AI can tailor translations to their specific style.</p></div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-800">Pillar 4: Adding Context & Nuance</h2>
          <div className="info-card bg-white" style={{marginBottom: '1rem'}}><h3 className="font-bold text-lg mb-2">Mixed Audience Mode</h3><p>Communicate from one neurotype to a mixed audience of both NT and ND individuals, with explanations of potential pitfalls.</p></div>
          <div className="info-card bg-white" style={{marginBottom: '1rem'}}><h3 className="font-bold text-lg mb-2">DISC Profile Integration</h3><p>Incorporate the DISC personality assessment as an additional layer to tailor suggestions based on known communication styles.</p></div>
          <div className="info-card bg-white" style={{marginBottom: '1rem'}}><h3 className="font-bold text-lg mb-2">Full Conversation Context</h3><p>Upload or paste an entire email thread to get an analysis based on the flow of the conversation.</p></div>
          <div className="info-card bg-white"><h3 className="font-bold text-lg mb-2">Granular Neurotype Selections</h3><p>Specify a neurotype (e.g., Autism, ADHD) to get even more accurate and empathetic translations.</p></div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-gray-800">Pillar 5: Platform Expansion & Skill Building</h2>
          <div className="info-card bg-white" style={{marginBottom: '1rem'}}><h3 className="font-bold text-lg mb-2">Mobile App & Browser Extension</h3><p>Dedicated apps to bring the Communicator directly into your workflow on any device.</p></div>
          <div className="info-card bg-white"><h3 className="font-bold text-lg mb-2">Practice Conversation Simulator</h3><p>Practice real-time conversations with an AI persona in a safe, judgment-free environment to build confidence.</p></div>
      </div>
    </div>
  );
}

export default EnhancementsPage;