import React from 'react';
import '../Content.css'; // Import shared styles

function HowToUsePage() {
  return (
    <div className="content-page">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-3">How to Use the Communicator</h1>
      <p className="mission">This guide will help you get the most out of the Neurotype Communicator by explaining its core features with clear examples.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">Choosing Your Mode</h2>
      <p>The app has three primary modes. Use the homepage to choose the right tool for your specific challenge.</p>
      <div className="mt-6 space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="flex items-center text-xl font-bold mb-3 text-gray-800">Draft a Message</h3>
              <p className="mb-4">Select this mode when you have a thought or idea and need help phrasing it effectively for a specific audience. It's your personal writing partner.</p>
              <div className="bg-white p-4 rounded-md border">
                  <h4 className="font-semibold text-gray-700 mb-2">Example Scenario:</h4>
                  <p className="text-sm text-gray-600">You (ND) need to tell your NT manager you can't make a work retreat due to personal stress, but you're worried about sounding unprofessional.</p>
              </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="flex items-center text-xl font-bold mb-3 text-gray-800">Analyze a Message</h3>
              <p className="mb-4">This mode is your decoder ring for confusing conversations. It helps you see the subtext and craft a strategic reply.</p>
              <div className="bg-white p-4 rounded-md border">
                  <h4 className="font-semibold text-gray-700 mb-2">Example Scenario:</h4>
                  <p className="text-sm text-gray-600">You (ND) pitched an idea to an NT colleague, and they replied with, "That's something to think about."</p>
              </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="flex items-center text-xl font-bold mb-3 text-gray-800">Coach My Response</h3>
              <p className="mb-4">This mode is for when you're not sure where to start, or want to explore an idea more deeply. It's a free-form chat where you can talk through your situation with the AI.</p>
          </div>
      </div>
    </div>
  );
}

export default HowToUsePage;