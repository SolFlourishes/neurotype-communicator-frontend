import db from '../src/lib/firebaseAdmin.js';
import nodemailer from 'nodemailer';
import { version } from '../package.json' with { type: 'json' };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;
  
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_API_KEY,
    },
  });

  try {
    // 1. Send the email via Brevo
    await transporter.sendMail({
      from: `"${name}" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `<p>You have a new submission from ${name} (${email}):</p><p>${message}</p>`,
    });
    
    // 2. Save the submission to Firestore
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