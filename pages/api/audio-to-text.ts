import { Readable } from "stream";
import { Configuration, OpenAIApi } from "openai";
// import { NextRequest, NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const iso6391 = {
  "english": "en",
  "swedish": "sv",
  "norwegian": "no",
  "finnish": "fi",
  "danish": "da",
  "german": "de",
  "dutch": "nl",
  "french": "fr",
  "italian": "it",
  "spanish": "es",
  "portuguese": "pt",
  "croatian": "hr",
  "ukrainian": "uk",
  "polish": "pl",
  "russian": "ru",
  "japanese": "ja",
  "korean": "ko",
  "chinese": "zh",
  "cantonese": "zh",
  "thai": "th",
  "vietnamese": "vi",
  "indonesian": "id",
  "malaysian": "ms"
};

export default async function handler(req, res) {

  const language = iso6391[req.headers.language];
  // const blob = await req.blob();
  // const audio = new File([blob], 'input.webm')
  const audio = req.body;
  
  try {
    const resp = await openai.createTranscription(
        audio,  // file
        "whisper-1",  // model
        '',  // prompt
        'json',  // response_format
        0,  // temperature
        language,  // language
        {
        proxy: {
          host: "127.0.0.1",
          port: Number(process.env.PROXY_PORT),
          protocol: "http",
        },
      }
    );
    res.status(200).json({ text: resp.data.text });
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