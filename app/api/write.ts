// OPenAI API with data streaming
// reference: https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions
// credit: Hassan El Mghari

import { OpenAIStream, OpenAIStreamPayload } from "@utils/OpenAIStream";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { apikey, prompt } = (await req.json()) as {
    apikey?: string,
    prompt?: string
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
        {role:"system", content:"You are a helpful assistant who helps with language learning."},
        { role: "user", content: prompt },
    ],
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(apikey, payload);
  return new Response(stream);
};

export default handler;