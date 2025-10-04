import React from 'react';
import '../Content.css';

function ChangeLogPage() {
  return (
    <div className="content-page">
      <h1>Change Log</h1>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Version 2.0 (Alpha)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
          <li><strong>Major Architectural Change:</strong> Migrated all back-end logic from a separate Node.js server (on Render) to Vercel Serverless Functions. The entire application is now consolidated on the Vercel platform.</li>
          <li>Replaced Nodemailer/Gmail with Brevo for transactional emails to solve platform firewall issues.</li>
          <li>Replaced Brevo library with a direct API call for listserv signups to resolve module import errors.</li>
          <li>Switched to a "headless" Google Form for the listserv to radically simplify the architecture.</li>
        </ul>
      </div>
       <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Version 1.2 (Alpha)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
          <li>Added a welcoming "hero section" to the homepage to improve user orientation and engagement.</li>
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Version 1.1 (Alpha)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
          <li>Populated all static content pages (Roadmap, Enhancements, Credits).</li>
          <li>Added a "Practical Applications" section to the 'How to Use' page.</li>
          <li>Implemented an email listserv signup form in the footer.</li>
          <li>Added neurotype selectors to the 'Translate' modes for more tailored AI responses.</li>
          <li>Resolved all known deployment and production bugs.</li>
        </ul>
      </div>
      <div className="mt-6" style={{marginTop: '2rem'}}>
        <h2 className="text-2xl font-semibold text-gray-700">Version 1.0 (Alpha)</h2>
        <ul className="list-disc list-inside pl-4 mt-2 text-gray-600 space-y-2">
          <li>Initial release of the Neurotype Communicator.</li>
          <li>Established stable three-card homepage design ("Draft," "Analyze," "Coach").</li>
          <li>Implemented robust backend architecture for all modes.</li>
          <li>Added a 5-star rating and comment feedback system.</li>
          <li>Implemented a functional Contact Us form with email notifications.</li>
          <li>Added a dismissible "Alpha Notice" banner and a copyright footer.</li>
        </ul>
      </div>
    </div>
  );
}

export default ChangeLogPage;