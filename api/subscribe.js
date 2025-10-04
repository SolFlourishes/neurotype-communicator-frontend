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
    const { data, error } = await resend.contacts.create({
      email: email,
      audienceId: audienceId,
      unsubscribed: false, // Explicitly set to false to ensure they are subscribed
    });

    // If the Resend API itself returns an error object
    if (error) {
      // Check if it's the specific "already exists" error
      if (error.message && error.message.includes('already exists')) {
        return res.status(200).json({ message: 'You are already subscribed.' });
      }
      // For all other API errors, log it and return a 400 status
      console.error('Resend API Error:', error);
      return res.status(400).json({ error: error.message });
    }

    // If the call is successful
    return res.status(200).json({ message: 'Successfully subscribed!' });

  } catch (error) {
    // This catches network errors or other unexpected crashes
    console.error('Critical Error in subscribe function:', error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}