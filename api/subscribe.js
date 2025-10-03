const brevo = require('@getbrevo/brevo');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  // Configure the Brevo API client
  let apiInstance = new brevo.ContactsApi();
  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  // Prepare the contact payload
  let createContact = new brevo.CreateContact();
  createContact.email = email;
  createContact.listIds = [parseInt(process.env.BREVO_LIST_ID)];

  try {
    // Call the Brevo API to create the contact
    await apiInstance.createContact(createContact);
    return res.status(201).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    // Check if the error is for a duplicate contact
    if (error.response && error.response.body.code === 'duplicate_parameter') {
        return res.status(200).json({ message: 'You are already subscribed.' });
    }
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during signup.' });
  }
}