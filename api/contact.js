import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Neurotype Communicator <onboarding@resend.dev>',
      to: [process.env.RECIPIENT_EMAIL],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>You have a new submission from ${name} (${email}):</h3>
        <p>${message}</p>
      `,
      reply_to: email,
    });

    if (error) {
      console.error({ error });
      return res.status(400).json(error);
    }

    // Save to the database after successful email send
    fetch(`${process.env.RENDER_BACKEND_URL}/api/contact-save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    }).catch(err => console.error("Failed to save to DB:", err));

    return res.status(200).json(data);

  } catch (error) {
    console.error('CRITICAL ERROR in Vercel function:', error);
    return res.status(500).json({ error: 'Error processing your request.' });
  }
}