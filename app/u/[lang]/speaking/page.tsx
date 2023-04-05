"use client";
import { useState, useEffect } from "react";
import getclient from "@utils/pb-client";
// import { useRouter } from 'next/navigation';
import Image from "next/image";
import toast from "react-hot-toast";

import { Readable } from "stream";

const iso6391 = {
  english: "en",
  swedish: "sv",
  norwegian: "no",
  finnish: "fi",
  danish: "da",
  german: "de",
  dutch: "nl",
  french: "fr",
  italian: "it",
  spanish: "es",
  portuguese: "pt",
  croatian: "hr",
  ukrainian: "uk",
  polish: "pl",
  russian: "ru",
  japanese: "ja",
  korean: "ko",
  chinese: "zh",
  cantonese: "zh",
  thai: "th",
  vietnamese: "vi",
  indonesian: "id",
  malaysian: "ms",
};

export default function Home({ params }: any) {
  const [recording, setRecording] = useState(false);
  const [chats, setChats] = useState([]);
  const [reply, setReply] = useState("");
  const [userId, setUserId] = useState("");
  const [recordId, setRecordId] = useState("");
  const [avatarFilename, setAvatarFilename] = useState("");
  // const router = useRouter();
  const lang = params.lang;

  // retrieve chat history
  const pb = getclient();

  useEffect(() => {
    if (pb.authStore.isValid) {
      setUserId(pb.authStore.model.id);
      setAvatarFilename(pb.authStore.model.avatar);
      (async () => {
        const record = await pb
          .collection("speaking")
          .getFullList({ filter: `lang="${lang}"` });
        setChats(record[0].chats.chats);
        setRecordId(record[0].id);
        console.log(chats);
      })();
    }
  }, []);

  const record = () => {
    const startRecording = (stream: MediaStream) => {
      setRecording(true);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      const stop = document.getElementById(`stop-speaking`);
      stop!.onclick = () => {
        mediaRecorder.stop();
        setRecording(false);
      };
      let chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = async (e) => {
        console.log("recorder stopped");
        const blob = new Blob(chunks, { type: "audio/webm" });
        chunks = []; 

        // audio to text 
        const res_whisper = await fetch('/api/audio-to-text', {
            method: "POST",
            headers: {
              "Content-Type": "audio/webm",
              "language": lang,
            },
            body: blob,
          });
        const res_json = await res_whisper.json();
        const transcription = res_json.text;

        // add the transcription to chat history
        setChats([...chats, { role: "user", content: transcription }]);

        // return next chat given the current message and all chat history
        const res_chat = await fetch("/api/chat3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chats }),
        });

        // get chatGPT response. Add to chat history
        setReply("");
        const data = res_chat.body;
        if (!data) {
          return;
        }
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          setReply((prev) => prev + chunkValue);
        }
        setChats([...chats, { role: "assistant", content: reply }]);
      };
      mediaRecorder.start();
    };
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(startRecording);
  };

  const save = async () => {
    try {
      await pb
        .collection("speaking")
        .update(recordId, { chats: JSON.stringify({ chats: chats }) });
      toast.success("Saved");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold ml-3 lg:ml-5">
        Practice Speaking with ChatGPT
      </h2>
      <p className="text-red-500">Under construction</p>

      {/* Chat Room */}
      <div className="relative overflow-auto m-3 lg:m-5 p-5 h-3/4 rounded-lg border-2 border-base-300 flex flex-col gap-2 max-w-4xl">
        {chats.map((item) => {
          return (
            <div
              className={`chat ${
                item.role == "assistant" ? "chat-start" : "chat-end"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src={
                      item.role == "assistant"
                        ? `${process.env.NEXT_PUBLIC_POCKETBASE}/api/files/public/${process.env.NEXT_PUBLIC_DEFAULT_AVATAR}`
                        : `${process.env.NEXT_PUBLIC_POCKETBASE}/api/files/users/${userId}/${avatarFilename}`
                    }
                    width={40}
                    height={40}
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="chat-bubble">{item.content}</div>
            </div>
          );
        })}

        <div
          className="tooltip absolute bottom-2 right-2"
          data-tip="Save this conversation"
        >
          <button onClick={save} className="btn btn-circle btn-outline text-lg">
            <i className="ri-download-2-line"></i>
          </button>
        </div>
      </div>

      {/* Record Button */}
      <div className="mt-10 mb-5 flex flex-row gap-2 justify-center max-w-4xl">
        <div className="indicator">
          {recording ? (
            <span className="flex h-3 w-3 indicator-item">
              <span className="animate-ping absolute inline-flex w-3 h-3 rounded-full bg-secondary opacity-75"></span>
              <span className="inline-flex rounded-full h-3 w-3 bg-secondary-focus"></span>
            </span>
          ) : null}
          <div className="" onClick={record}>
            <i
              className="ri-mic-2-line text-3xl cursor-pointer p-6 rounded-full bg-primary text-primary-content"
              title="Record Audio"
            ></i>
          </div>
        </div>

        <div className="text-3xl cursor-pointer" id={`stop-speaking`}>
          {recording ? (
            <i className="ri-stop-circle-line text-red-500" title="Stop"></i>
          ) : null}
        </div>
      </div>
    </>
  );
}
