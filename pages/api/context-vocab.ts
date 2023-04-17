import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const sysPrompt = `
You are a helpful assistant. You are helping with user's language learning.
`

export default async function POST(req, res) {

  const { chats } = await req.body || '';

  try {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "system", content: sysPrompt}].concat(chats),
        max_tokens: 3000,
      },
      // {
      //   proxy: {
      //     host: "127.0.0.1",
      //     port: Number(process.env.PROXY_PORT),
      //     protocol: "http",
      //   },
      // }
    );
    res.status(200).json({ message: completion.data.choices[0].message });
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