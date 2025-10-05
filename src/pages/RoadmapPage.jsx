import React from 'react';
import '../Content.css';

function RoadmapPage() {
  return (
    <div className="content-page">
      <h1>Application Roadmap</h1>
      <p className="mission">We believe in transparency. This page outlines the current state of our application and our vision for the future, so our testers know what to expect and how they can help us grow.</p>

      <div className="bg-blue-50 p-6 rounded-lg mt-8 border border-blue-200">
          <h2>Current Phase: Beta (v2.1)</h2>
          <p className="mb-4">The current version is focused on building a more intelligent and intuitive user experience with the introduction of the "Style, Not Label" approach, a full visual redesign, and advanced selectors.</p>
          <div>
            <h3 className="font-bold text-lg mb-2">Key Features Implemented</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>"Let the AI Decide" feature to automatically analyze a user's writing style.</li>
              <li>New "Four-Box" layout to visually represent the communication loop.</li>
              <li>"Advanced Mode" with functional selectors for Neurotype and Generation.</li>
            </ul>
          </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg mt-8 border border-green-200">
          <h2>Next Phase: Beta (v2.2)</h2>
          <p className="mb-4">The next major step is to build the "Golden Feedback Loop," which is the cornerstone of our strategy to create a world-class AI brain.</p>
          <div>
              <h3 className="font-bold text-lg mb-2">Key Enhancements</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                  <li><strong>Editable AI Responses:</strong> Allow users to directly edit the AI-generated text in the "Four-Box" model.</li>
                  <li><strong>"Save My Edit" System:</strong> Create a system to save these user-perfected translations, providing the highest quality training data for future AI improvements.</li>
              </ul>
          </div>
      </div>
    </div>
  );
}

export default RoadmapPage;