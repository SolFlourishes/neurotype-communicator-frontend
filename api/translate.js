import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Destructure the new generational fields
    const { mode, text, context, interpretation, sender, receiver, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration } = req.body;

    const personaPrompt = `Your tone should be that of a helpful, direct, and supportive coach...`; // Full persona prompt

    let promptCore = '';
    if (mode === 'draft') {
        promptCore = `The user wants to DRAFT a message. Their style is ${sender}, their audience's style is ${receiver}.`;
    } else if (mode === 'analyze') {
        promptCore = `The user wants to ANALYZE a message. The message is from a ${sender} person for a ${receiver} user.`;
    } else {
        return res.status(400).json({ error: 'Invalid mode specified.' });
    }

    let advancedContext = '';
    if (senderNeurotype && senderNeurotype !== 'unsure') {
      advancedContext += ` The user explicitly identifies as ${senderNeurotype}.`;
    }
    if (receiverNeurotype && receiverNeurotype !== 'unsure') {
      advancedContext += ` The audience explicitly identifies as ${receiverNeurotype}.`;
    }
    // Conditionally add generational context
    if (senderGeneration && senderGeneration !== 'unsure') {
      advancedContext += ` The user is from the ${senderGeneration} generation.`;
    }
    if (receiverGeneration && receiverGeneration !== 'unsure') {
      advancedContext += ` The audience is from the ${receiverGeneration} generation.`;
    }

    let fullPrompt = `${personaPrompt} ${promptCore}${advancedContext}`;

    if (mode === 'draft') {
        fullPrompt += `
CONTEXT: "${context}"
DRAFT: "${text}"
Your Task: First, provide the rewritten message using HTML for formatting (like <p> and <h3> tags). Then, on a new line, provide the unique separator '|||'. Finally, on a new line, provide the explanation for your changes, also using HTML formatting.`;
    } else if (mode === 'analyze') {
        fullPrompt += `
MESSAGE: "${text}"
USER'S INTERPRETATION: "${interpretation}"
Your Task: First, provide a multi-part analysis and suggested response as a single HTML string. Then, on a new line, provide the unique separator '|||'. Finally, on a new line, provide the explanation for your work, also using HTML formatting.`;
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