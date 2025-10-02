import nodemailer from 'nodemailer';

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
    await transporter.sendMail({
      from: `"${name}" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `<p>You have a new submission from ${name} (${email}):</p><p>${message}</p>`,
    });

    // Also save to Firestore from the original backend
    // This is a "fire and forget" call, we don't wait for its response
    fetch(`${process.env.VITE_API_BASE_URL}/api/contact-save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    }).catch(err => console.error("Failed to save to DB:", err));

    return res.status(200).json({ message: 'Submission successful' });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Error sending email.' });
  }
}