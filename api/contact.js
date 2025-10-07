import nodemailer from 'nodemailer';
import pkg from '../package.json' with { type: 'json' };
import db from '../src/lib/firebaseAdmin.js';

const version = pkg.version;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // --- START DEBUGGING LOGS ---
  // These logs will show us what the function is actually seeing.
  console.log('Attempting to send email...');
  console.log(`Authenticating with User: ${process.env.BREVO_USER}`);
  console.log(`Is API Key present? ${!!process.env.BREVO_API_KEY}`);
  // --- END DEBUGGING LOGS ---

  const { name, email, subject, message } = req.body;
  
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, 
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_API_KEY,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `<p>You have a new submission from ${name} (${email}):</p><p>${message}</p>`,
    });
    
    const newSubmission = { 
      name, email, subject, message, 
      appVersion: version, 
      submittedAt: new Date().toISOString() 
    };
    await db.collection('contacts').add(newSubmission);

    return res.status(200).json({ message: 'Submission successful' });

  } catch (error) {
    // This will log the detailed authentication error
    console.error('Error in /api/contact function:', error);
    return res.status(500).json({ error: 'Error processing your request.' });
  }
}