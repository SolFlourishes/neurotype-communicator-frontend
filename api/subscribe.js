export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID);

  try {
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [BREVO_LIST_ID],
      }),
    });

    const data = await brevoResponse.json();

    if (!brevoResponse.ok) {
      // Handle the specific "duplicate" error from Brevo
      if (data.code === 'duplicate_parameter') {
        return res.status(200).json({ message: 'You are already subscribed.' });
      }
      // For other errors, throw to be caught by the catch block
      throw new Error(data.message || 'Brevo API request failed');
    }

    return res.status(201).json({ message: 'Successfully subscribed!' });

  } catch (error) {
    console.error("Error calling Brevo API:", error.message);
    return res.status(500).json({ error: 'An error occurred during signup.' });
  }
}