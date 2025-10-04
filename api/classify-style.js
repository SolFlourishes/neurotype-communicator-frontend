import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for classification.' });
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-latest' });

    const prompt = `Your task is to analyze the user's writing style from the provided text. Classify it as either "direct" or "indirect". "Direct" style is literal, fact-based, and unambiguous. "Indirect" style uses nuance, social context, and subtext. Respond with only one word: either "direct" or "indirect".
USER'S TEXT: "${text}"`;

    const result = await model.generateContent(prompt);
    const classification = (await result.response.text()).trim().toLowerCase();

    // Default to 'direct' if the AI gives an unexpected response
    return res.status(200).json({ style: classification === 'indirect' ? 'indirect' : 'direct' });
  } catch (error) {
    console.error('Error in /api/classify-style function:', error);
    // Default to 'direct' on error to ensure the app doesn't break
    return res.status(200).json({ style: 'direct' });
  }
}