import React from 'react';
import '../Content.css';

function RoadmapPage() {
  return (
    <div className="content-page">
      <h1>Application Roadmap</h1>
      <p className="mission">We believe in transparency. This page outlines the current state of our application and our vision for the future, so our alpha testers know what to expect and how they can help us grow.</p>
      <div className="bg-blue-50 p-6 rounded-lg mt-8 border border-blue-200">
          <h2>Current Phase: Alpha Version</h2>
          <p className="mb-4">The version you are using now is an early, functional release. Its primary purpose is to test the core mechanics and gather essential user feedback.</p>
          <div>
            <h3 className="font-bold text-lg mb-2">Strengths</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>Core translation and analysis features are live.</li>
              <li>The "intent-first" UI is in place.</li>
              <li>Feedback system is actively collecting data.</li>
            </ul>
          </div>
          <div style={{marginTop: '1rem'}}>
            <h3 className="font-bold text-lg mb-2">Limitations</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>The AI's responses are good, but can feel generic.</li>
              <li>The Coach Mode has a "short-term memory."</li>
              <li>No user accounts or personalization features yet.</li>
            </ul>
          </div>
      </div>
      <div className="bg-green-50 p-6 rounded-lg mt-8 border border-green-200">
          <h2>Next Phase: Beta Version</h2>
          <p className="mb-4">The Beta version will be a major leap forward in intelligence and accuracy, powered by the feedback and research gathered during the Alpha phase.</p>
          <div>
            <h3 className="font-bold text-lg mb-2">Key Enhancements</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li><strong>A Smarter AI Brain:</strong> We will implement a Retrieval Augmented Generation (RAG) system.</li>
              <li><strong>Personalization:</strong> Introduction of secure user accounts and "Key Contacts" profiles.</li>
              <li><strong>Conversation Practice Simulator:</strong> Practice real-time conversations with a custom AI persona.</li>
              <li><strong>Deeper Nuance:</strong> Addition of granular neurotype and cross-cultural selections.</li>
            </ul>
          </div>
      </div>
    </div>
  );
}

export default RoadmapPage;