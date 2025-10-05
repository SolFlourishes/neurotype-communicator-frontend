import React from 'react';
import '../Content.css';

function ChangeLogPage() {
  return (
    <div className="content-page">
      <h1>Change Log</h1>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Version 2.1 (Beta)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
          <li>Redesigned the Translate/Analyze page to use a more intuitive "Four-Box" layout.</li>
          <li>Added an "Advanced Mode" toggle to reveal more granular communication style selectors.</li>
          <li>Implemented and connected selectors for Neurotype and Generation in Advanced Mode.</li>
          <li>Added instructional text and info-icon tooltips to guide users.</li>
        </ul>
      </div>
      <div className="mt-6" style={{marginTop: '2rem'}}>
        <h2 className="text-2xl font-semibold text-gray-700">Version 2.0 (Beta)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
          <li><strong>Major Architectural Change:</strong> Migrated all back-end logic from a separate Node.js server (on Render) to Vercel Serverless Functions. The entire application is now consolidated on the Vercel platform.</li>
          <li>Switched to a "Style, Not Label" UI with "Direct & Literal" vs. "Indirect & Nuanced" selectors.</li>
          <li>Implemented the "Let the AI Decide" feature to automatically classify user communication style.</li>
        </ul>
      </div>
      <div className="mt-6" style={{marginTop: '2rem'}}>
        <h2 className="text-2xl font-semibold text-gray-700">Version 1.3 (Alpha)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
            <li>Replaced the manual Google Form listserv with a fully automated, seamless signup form powered by the Resend API.</li>
        </ul>
      </div>
      <div className="mt-6" style={{marginTop: '2rem'}}>
        <h2 className="text-2xl font-semibold text-gray-700">Version 1.2 (Alpha)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
          <li>Added a welcoming "hero section" to the homepage to improve user orientation and engagement.</li>
        </ul>
      </div>
      <div className="mt-6" style={{marginTop: '2rem'}}>
        <h2 className="text-2xl font-semibold text-gray-700">Version 1.1 (Alpha)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
          <li>Populated all static content pages (Roadmap, Enhancements, Credits).</li>
          <li>Added a "Practical Applications" section to the 'How to Use' page.</li>
          <li>Added neurotype selectors to the 'Translate' modes.</li>
        </ul>
      </div>
      <div className="mt-6" style={{marginTop: '2rem'}}>
        <h2 className="text-2xl font-semibold text-gray-700">Version 1.0 (Alpha)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
          <li>Initial release of the Neurotype Communicator.</li>
          <li>Established stable three-card homepage design ("Draft," "Analyze," "Coach").</li>
          <li>Implemented robust backend architecture and all core features.</li>
          <li>Added Feedback, Contact, and Alpha Banner systems.</li>
        </ul>
      </div>
    </div>
  );
}

export default ChangeLogPage;