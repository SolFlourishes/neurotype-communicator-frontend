import React from 'react';
import '../Content.css'; // Import shared styles

function CreditsPage() {
  return (
    <div className="content-page">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-3">Credits & Attributions</h1>
      <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-700">Founder & Visionary</h2>
      <p>The Neurotype Communicator was conceived, designed, and guided by the singular vision of <strong>Sol Roberts-Lieb, Ed.D.</strong> This application, including its core workflows for drafting and analyzing messages, the "intent-first" user interface, the concept of a conversational coach for neurotype communication, and the intellectual framework for translating between neurotypes, is the direct result of their insightful identification of a critical need and their dedication to building a tool that fosters empathy and understanding.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">Development Process</h2>
      <p>This application was developed in a unique, collaborative process where Sol Roberts-Lieb, Ed.D. served as the architect and product lead, providing the core concepts, user stories, real-world examples, and critical feedback that shaped the AI's logic and the application's user-focused design. Technical implementation was assisted by a large language model (Google's Gemini).</p>
      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">Intellectual Property Notice</h2>
      <p>The concepts, methodologies, user interface designs, and workflows presented in this application are the intellectual property of Sol Roberts-Lieb, Ed.D. This work is protected by copyright law. Unauthorized reproduction or distribution of this application, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">Scholarly Foundations</h2>
      <p>The AI's analysis is grounded in, and for future versions will be trained on, established academic concepts. This growing knowledge base ensures our responses are evidence-based. Key concepts include:</p>
      <ul className="list-disc list-inside pl-4 mt-2 text-gray-700 space-y-2">
          <li><strong>The Double Empathy Problem:</strong> A theory by Dr. Damian Milton.</li>
          <li><strong>High-Context and Low-Context Cultures:</strong> A framework by anthropologist Edward T. Hall.</li>
          <li><strong>Pragmatic Language Differences:</strong> Linguistic research into the unwritten social rules of language.</li>
          <li><strong>Theory of Mind & Central Coherence:</strong> Concepts from cognitive science (e.g., Uta Frith).</li>
          <li><strong>Executive Function in Communication:</strong> Research from the field of ADHD studies (e.g., Dr. Russell Barkley).</li>
      </ul>
    </div>
  );
}

export default CreditsPage;