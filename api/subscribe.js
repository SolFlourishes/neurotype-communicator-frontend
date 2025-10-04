import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    await resend.contacts.create({
      email: email,
      audienceId: audienceId,
    });
    return res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    // Handle cases where the user might already be subscribed
    if (error.message && error.message.includes('already exists')) {
        return res.status(200).json({ message: 'You are already subscribed.' });
    }
    console.error('Resend API Error:', error);
    return res.status(500).json({ error: 'An error occurred.' });
  }
}