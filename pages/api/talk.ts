// OPenAI API with data streaming
// reference: https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions
// credit: Hassan El Mghari

import { OpenAIStream, OpenAIStreamPayload, ChatGPTMessage } from "@utils/OpenAIStream";

export const config = {
  runtime: "edge",
};

const sysPrompt = `
You are a helpful assistant. You are helping with user's language learning.
`

const handler = async (req: Request): Promise<Response> => {
  const { chats } = (await req.json()) as {
    chats?: ChatGPTMessage[];
  };
  if (!chats) {
    return new Response("No chats in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: sysPrompt}].concat(chats),
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;