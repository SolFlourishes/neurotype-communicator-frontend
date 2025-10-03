import brevo from '@getbrevo/brevo';

export default async function handler(req, res) {
  // --- DETAILED DEBUGGING LOGS ---
  console.log('--- Vercel Function Started ---');
  console.log('BREVO_API_KEY is set:', !!process.env.BREVO_API_KEY);
  console.log('BREVO_LIST_ID is set:', process.env.BREVO_LIST_ID);
  // --- END DEBUGGING LOGS ---

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  let apiInstance = new brevo.ContactsApi();
  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  let createContact = new brevo.CreateContact();
  createContact.email = email;
  createContact.listIds = [parseInt(process.env.BREVO_LIST_ID)];

  try {
    await apiInstance.createContact(createContact);
    return res.status(201).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    // --- NEW, MORE DETAILED ERROR LOGGING ---
    console.error("CRITICAL ERROR in subscribe function. Full raw error object below:");
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during signup.' });
  }
}