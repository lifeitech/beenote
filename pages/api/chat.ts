import { Configuration, OpenAIApi } from "openai";
// import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   runtime: "edge",
// }

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function POST(req, res) {

  const prompt = req.body.prompt || '';
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      }
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [
          {role:"system", content:"You are a helpful assistant who helps with language learning."},
          {role:"user", content:prompt},
        ],
        max_tokens: 3000,
      },
      {
        proxy: {
          host: "127.0.0.1",
          port: 65492,
          protocol: "http",
        },
      }
    );
    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}