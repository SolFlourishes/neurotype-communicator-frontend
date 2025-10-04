import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { history, message } = req.body;

    if (!Array.isArray(history) || typeof message !== 'string') {
        return res.status(400).json({ error: "Invalid request body." });
    }

    const historyString = history.map(turn => {
        const role = turn.role === 'user' ? 'User' : 'Coach';
        return `${role}: ${turn.content}`;
    }).join('\n');

    const currentConversation = historyString ? `${historyString}\nUser: ${message}` : `User: ${message}`;
    const personaPrompt = `Your tone should be that of a helpful, direct, and supportive coach. You are truthful but not harsh. Avoid platitudes, overly flowery language, and excessive praise. The primary goal is to empower the user by explaining the 'why' behind communication differences, helping them build skills so they become less dependent on this tool over time.`;
    const fullPrompt = `${personaPrompt} You are in a conversation. The history of the conversation is below. Your task is to provide the next response as the 'Coach'. Your response must be a single, cohesive paragraph that ends with a single question.
--- CONVERSATION HISTORY ---
${currentConversation}
Coach:`;
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
    const result = await model.generateContent(fullPrompt);
    const text = await result.response.text();
    
    return res.status(200).json({ response: text });
  } catch (error) {
    console.error('Error in /api/chat function:', error);
    return res.status(500).json({ error: 'An error occurred with the AI service.' });
  }
}