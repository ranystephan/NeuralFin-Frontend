import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

type ResponseData = {
  text: string;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prompt = req.body.prompt;

  if (!prompt || prompt === '') {
    res.status(400).json({ text: 'Please send your prompt' });
    return;
  }

  try {
    // Use the newer completions API
    const aiResult = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 2048,
      frequency_penalty: 0.5,
      presence_penalty: 0
    });

    const response = aiResult.choices[0].text?.trim() || 'Sorry, there was a problem!';
    res.status(200).json({ text: response });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ text: 'An unexpected error occurred' }); // Send a generic error message to the client
  }
}
