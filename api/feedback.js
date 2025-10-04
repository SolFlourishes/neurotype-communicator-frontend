import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// Check if the app is already initialized to prevent errors in Vercel's hot-reloading environment
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { responseRating, responseComment, explanationRating, explanationComment, mode, version } = req.body;

    if (!responseRating && !explanationRating) {
      return res.status(400).json({ error: 'At least one rating is required.' });
    }

    const newFeedback = {
      responseRating: responseRating || null,
      responseComment: responseComment || null,
      explanationRating: explanationRating || null,
      explanationComment: explanationComment || null,
      mode: mode || null,
      appVersion: version || 'unknown',
      submittedAt: new Date().toISOString(),
    };

    await db.collection('feedback').add(newFeedback);

    return res.status(201).json({ message: 'Feedback submitted successfully.' });

  } catch (error) {
    console.error('Error in /api/feedback function:', error);
    return res.status(500).json({ error: 'An error occurred while saving feedback.' });
  }
}