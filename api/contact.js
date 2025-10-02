import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // --- TEMPORARY DEBUGGING LOGS ---
  console.log('--- Vercel Function Started: Checking Environment Variables ---');
  console.log('BREVO_USER variable being used:', process.env.BREVO_USER);

  if (process.env.BREVO_API_KEY) {
    const key = process.env.BREVO_API_KEY;
    console.log(`BREVO_API_KEY variable: Exists. Starts with "${key.substring(0, 4)}" and ends with "${key.substring(key.length - 4)}"`);
  } else {
    console.log('BREVO_API_KEY variable: IS MISSING OR UNDEFINED!');
  }
  // --- END DEBUGGING LOGS ---

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
    console.log('Attempting to send email...');
    await transporter.sendMail({
      from: `"${name}" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `<p>You have a new submission from ${name} (${email}):</p><p>${message}</p>`,
    });
    console.log('Email sent successfully.');

    // Temporarily disabling the database call to isolate the email issue.
    /*
    await fetch(`${process.env.RENDER_BACKEND_URL}/api/contact-save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });
    */

    return res.status(200).json({ message: 'Submission successful' });

  } catch (error) {
    console.error('CRITICAL ERROR in Vercel function:', error);
    return res.status(500).json({ error: 'Error processing your request.' });
  }
}