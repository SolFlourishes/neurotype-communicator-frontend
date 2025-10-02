import React from 'react';
import '../Content.css'; // Import shared styles

function ChangeLogPage() {
  return (
    <div className="content-page">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-3">Change Log</h1>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Version 1.0 (Alpha)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
          <li>Initial release of the Neurotype Communicator.</li>
          <li>Refactored UI to a stable three-card homepage design ("Draft," "Analyze," "Coach").</li>
          <li>Separated "Translate" and "Coach" modes into distinct, more stable components.</li>
          <li>Restored and populated all static pages (About, Enhancements, Contact, etc.).</li>
          <li>Implemented robust backend architecture for all modes, fixing all known connection bugs.</li>
          <li>Added a 5-star rating and comment feedback system, connected to a Firebase database.</li>
          <li>Added email notifications for the Contact Us form using secure OAuth 2.0.</li>
          <li>Added a dismissible "Alpha Notice" banner.</li>
          <li>Added "Credits & Attributions" page and a copyright footer.</li>
          <li>Implemented full accessibility (ARIA attributes, labels, etc.) across the application.</li>
        </ul>
      </div>
    </div>
  );
}

export default ChangeLogPage;