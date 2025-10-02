import React from 'react';
import '../Content.css'; // Import shared styles

function AboutPage() {
  return (
    <div className="content-page">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-3">About The Neurotype Communicator</h1>
      <p className="mission"><strong>Our Mission:</strong> To translate communication styles, not people. We believe that clearer communication builds more inclusive, effective, and compassionate workplaces and communities.</p>
      <div className="bg-gray-50">
        <h3 className="font-bold text-lg mb-2">The Challenge</h3>
        <p>Ever feel like you're speaking clearly but your message doesn't land? This often happens because we're running on different communication "operating systems"—one prioritizing directness and data, the other social rapport and context.</p>
      </div>
      <div className="bg-gray-50">
        <h3 className="font-bold text-lg mb-2">The Solution</h3>
        <p>This tool acts as a bridge, not a correction tool. It translates messages between communication styles, helping neurodivergent and neurotypical individuals understand each other more clearly without changing who they are.</p>
      </div>
      <h2 className="text-2xl font-semibold mt-10 mb-3 text-gray-700">Important Limitations & Our Guiding Philosophy</h2>
      <ul className="list-disc list-inside pl-4 space-y-2">
          <li><strong>Neurodiversity is a Spectrum:</strong> We use "ND" and "NT" to describe communication *styles*, not to rigidly label people.</li>
          <li><strong>Context is Everything:</strong> The tool analyzes text, but it cannot analyze the tone of a room or your relationship with the other person.</li>
          <li><strong>Verification is Key:</strong> The ultimate goal is better human connection. The AI can be wrong. Always verify understanding through direct conversation.</li>
      </ul>
    </div>
  );
}

export default AboutPage;