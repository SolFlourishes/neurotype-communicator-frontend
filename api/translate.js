import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { mode, text, context, interpretation, sender, receiver } = req.body;
    const personaPrompt = `Your tone should be that of a helpful, direct, and supportive coach. You are truthful but not harsh. Avoid platitudes, overly flowery language, and excessive praise. The primary goal is to empower the user by explaining the 'why' behind communication differences, helping them build skills so they become less dependent on this tool over time.`;
    let fullPrompt = '';

    if (mode === 'draft') {
        fullPrompt = `${personaPrompt} The user wants to DRAFT a message. Their style is ${sender}, their audience's style is ${receiver}.
CONTEXT: "${context}"
DRAFT: "${text}"
Your Task: First, provide the rewritten message using HTML for formatting (like <p> and <h3> tags). Then, on a new line, provide the unique separator '|||'. Finally, on a new line, provide the explanation for your changes, also using HTML formatting.`;
    } else if (mode === 'analyze') {
        fullPrompt = `${personaPrompt} The user wants to ANALYZE a message. The message is from a ${sender} person for a ${receiver} user.
MESSAGE: "${text}"
USER'S INTERPRETATION: "${interpretation}"
Your Task: First, provide a multi-part analysis and suggested response as a single HTML string. Then, on a new line, provide the unique separator '|||'. Finally, on a new line, provide the explanation for your work, also using HTML formatting.`;
    } else {
        return res.status(400).json({ error: 'Invalid mode specified.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro-latest' });
    const result = await model.generateContent(fullPrompt);
    const responseText = await result.response.text();
    const parts = responseText.split('|||');

    if (parts.length < 2) {
       return res.status(500).json({ error: "AI response did not contain the expected separator." });
    }

    return res.status(200).json({
        response: parts[0].trim(),
        explanation: parts[1].trim()
    });
  } catch (error) {
    console.error('Error in /api/translate function:', error);
    return res.status(500).json({ error: 'An error occurred with the AI service.' });
  }
}