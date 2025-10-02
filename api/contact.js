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
    // First, try to send the email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `<p>You have a new submission from ${name} (${email}):</p><p>${message}</p>`,
    });

    // If email is successful, then save to the database.
    // This uses the NEW environment variable.
    await fetch(`${process.env.RENDER_BACKEND_URL}/api/contact-save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });

    return res.status(200).json({ message: 'Submission successful' });

  } catch (error) {
    console.error('Error in Vercel function:', error);
    return res.status(500).json({ error: 'Error processing your request.' });
  }
}