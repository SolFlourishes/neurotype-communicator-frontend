import React from 'react';
import '../Content.css';

function EnhancementsPage() {
  return (
    <div className="content-page">
      <h1>Proposed Future Enhancements</h1>
      <p className="mission"><strong>Our Goal:</strong> To evolve from a powerful communicator into a truly personalized, context-aware communication partner that learns and grows with you.</p>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2>Pillar 1: Content-First Intelligence</h2>
          <div className="bg-white" style={{marginBottom: '1rem'}}>
              <h3 className="font-bold text-lg mb-2">The "Style, Not Label" Approach</h3>
              <p>The Beta will evolve from a "Label-First" model to a more intelligent "Content-First" model. The UI will focus on communication styles ("Direct & Literal" vs. "Indirect & Nuanced") rather than identity labels for a more inclusive and accurate experience.</p>
          </div>
          <div className="bg-white">
              <h3 className="font-bold text-lg mb-2">Let the AI Decide: AI as a Style Analyst</h3>
              <p>The flagship feature of the Beta. The AI will first analyze your text to determine its communication style, then use that analysis to provide a more accurate translation. The explanation will transparently state what style it detected, offering a powerful moment of self-reflection.</p>
          </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2>Pillar 2: Building the AI Brain</h2>
          <div className="bg-white">
              <h3 className="font-bold text-lg mb-2">User-Improved Translations (The "Golden" Feedback Loop)</h3>
              <p>The Beta version will allow users to directly edit and improve the AI's suggestions, providing the highest quality training data to build a world-class AI brain.</p>
          </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2>Pillar 3: Behavioral & Situational Decoding</h2>
          <div className="bg-white"><h3 className="font-bold text-lg mb-2">The Behavioral Translator</h3><p>Communication is more than just words. This feature will help you decode actions and situations by describing a behavior (e.g., "The facilitator tapped their wrist at me") and your interpretation to get an analysis of the likely intent.</p></div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2>Pillar 4: Hyper-Personalization</h2>
          <div className="bg-white" style={{marginBottom: '1rem'}}><h3 className="font-bold text-lg mb-2">Secure User Accounts & History</h3><p>Create a private, secure profile where all translations, analyses, and coaching conversations are saved, allowing you to track your progress and review past insights.</p></div>
          <div className="bg-white"><h3 className="font-bold text-lg mb-2">"Key Contacts" Profiles</h3><p>Create profiles for people you communicate with regularly (e.g., "My Boss - NT, values brevity"). The AI will use these profiles to generate hyper-personalized and contextually aware translations.</p></div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2>Pillar 5: Adding Context & Nuance</h2>
          <div className="bg-white" style={{marginBottom: '1rem'}}><h3 className="font-bold text-lg mb-2">Generational & Age-Aware Communication</h3><p>Adds selectors for the sender's and receiver's generation (e.g., Gen Z, Millennial, Boomer). The AI will tailor not just the translation, but also the explanation's reading level to be most effective for the user.</p></div>
          <div className="bg-white" style={{marginBottom: '1rem'}}><h3 className="font-bold text-lg mb-2">DISC Profile Integration</h3><p>Incorporate the popular DISC personality assessment as an additional layer to tailor suggestions based on known communication styles.</p></div>
          <div className="bg-white" style={{marginBottom: '1rem'}}><h3 className="font-bold text-lg mb-2">Full Conversation Context</h3><p>Upload or paste an entire email thread to get an analysis based on the flow of the conversation.</p></div>
          <div className="bg-white"><h3 className="font-bold text-lg mb-2">Granular Neurotype Selections</h3><p>Specify a neurotype (e.g., Autism, ADHD) to get even more accurate and empathetic translations.</p></div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8 border">
          <h2>Pillar 6: Platform Expansion & Skill Building</h2>
          <div className="bg-white" style={{marginBottom: '1rem'}}><h3 className="font-bold text-lg mb-2">Mobile App & Browser Extension</h3><p>Dedicated apps to bring the Communicator directly into your workflow on any device.</p></div>
          <div className="bg-white"><h3 className="font-bold text-lg mb-2">Practice Conversation Simulator</h3><p>Engage in a real-time, back-and-forth conversation with a custom AI persona to practice a difficult conversation in a safe, judgment-free environment. Receive a detailed performance report afterward with actionable tips.</p></div>
      </div>
    </div>
  );
}

export default EnhancementsPage;