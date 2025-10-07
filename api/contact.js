import { Resend } from 'resend';
import pkg from '../package.json' with { type: 'json' };
import db from '../src/lib/firebaseAdmin.js';

// Initialize Resend with your API key from Vercel Environment Variables
const resend = new Resend(process.env.RESEND_API_KEY);
const version = pkg.version;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  try {
    // Send the email via the Resend API
    await resend.emails.send({
      // IMPORTANT: This "from" address MUST be a domain you have verified in Resend.
      from: 'Neurotype Contact Form <sdlieb77@gmail.com>',
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Neurotype Contact Form Submission: ${subject}`,
      reply_to: email, // This sets the reply-to header correctly
      html: `<p>You have a new submission from ${name} (${email}):</p><p>${message}</p>`,
    });
    
    // Save the submission to Firestore (this part remains the same)
    const newSubmission = { 
      name, 
      email, 
      subject, 
      message, 
      appVersion: version, 
      submittedAt: new Date().toISOString() 
    };
    await db.collection('contacts').add(newSubmission);

    return res.status(200).json({ message: 'Submission successful' });

  } catch (error) {
    console.error('Error in /api/contact function with Resend:', error);
    return res.status(500).json({ error: 'Error processing your request.' });
  }
}