import pkg from '@getbrevo/brevo';
const { ApiClient, ContactsApi, CreateContact } = pkg;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  // Configure the Brevo API client using the correctly imported classes
  let defaultClient = ApiClient.instance;
  let apiKey = defaultClient.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  let apiInstance = new ContactsApi();
  let createContact = new CreateContact();
  createContact.email = email;
  createContact.listIds = [parseInt(process.env.BREVO_LIST_ID)];

  try {
    await apiInstance.createContact(createContact);
    return res.status(201).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    if (error?.response?.body?.code === 'duplicate_parameter') {
        return res.status(200).json({ message: 'You are already subscribed.' });
    }
    console.error("Error from Brevo API:", error.response ? error.response.body : error);
    return res.status(500).json({ error: 'An error occurred during signup.' });
  }
}