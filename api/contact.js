import nodemailer from 'nodemailer';
import pkg from '../package.json' with { type: 'json' };
import db from '../src/lib/firebaseAdmin.js';

const version = pkg.version;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;
  
  // --- CONFIGURATION CHECK ---
  // The transporter object is correct, but the values it receives from
  // process.env must match your Brevo account exactly.
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, 
    auth: {
      // Vercel Environment Variable: BREVO_USER
      //      Value must be: Your Brevo account's login email address.
      user: process.env.BREVO_USER,
      
      // Vercel Environment Variable: BREVO_API_KEY
      //      Value must be: The full Brevo v3 API Key you generated.
      pass: process.env.BREVO_API_KEY,
    },
  });

  try {
    // Send the email via Brevo
    await transporter.sendMail({
      from: `"${name}" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `<p>You have a new submission from ${name} (${email}):</p><p>${message}</p>`,
    });
    
    // Save the submission to Firestore
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
    console.error('Error in /api/contact function:', error);
    return res.status(500).json({ error: 'Error processing your request.' });
  }
}