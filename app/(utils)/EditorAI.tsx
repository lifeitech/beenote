"use client";
import { useState, useEffect } from "react";
import getclient from "@utils/pb-client";
import Swal from 'sweetalert2'
import Link from 'next/link'

export default function EditorAI({ editor }: { editor: any }) {
  const [showInput, setShowInput] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [apikey, setApiKey] = useState("");
  const [waiting, setWaiting] = useState(false);
  const pb = getclient();
  const userId = pb.authStore.model.id;

  useEffect(() => {
    (async () => {
      const record = await pb.collection('users').getOne(userId);
      setApiKey(record.apikey);
    })();
  }, [])

  useEffect(() => {
    const PromptShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key == "/") {
        setShowInput(true);
      }
      if (event.key == "Escape") {
        setShowInput(false);
        setPrompt("");
        editor.commands.focus('end');
      }
    };
    document.addEventListener("keydown", PromptShortcut);

    return () => document.removeEventListener("keydown", PromptShortcut);
  }, []);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      event.preventDefault();
      generate(prompt);
    }
  };

  const generate = async (prompt: string) => {
    if (!prompt) {
      Swal.fire('Input cannot be empty');
      return;
    }
    if (!apikey) {
      Swal.fire('No API key provided');
      return;
    }

    try {
      setWaiting(true);
      setPrompt("");
      const res = await fetch("/api/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apikey: apikey, prompt: prompt }),
      });
      const data = res.body;
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
        editor.commands.insertContent(chunkValue);
      }
      // editor.commands.insertContent(data.result.trim());
      editor.commands.insertContent('\n');
      editor.commands.scrollIntoView();
      editor.commands.selectNodeBackward();
      setShowInput(false);
      setWaiting(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
      setWaiting(false);
    }
  };

  return (
    <div className="absolute -bottom-20 left-5 z-20">
      {showInput ? (
        <div className="flex flex-col gap-2 p-2 bg-primary rounded-xl appearfromBottom">
          
        {apikey ? null :
        <div className="flex flex-row gap-2 items-center">
          <div className="">Input your OpenAI API key: </div>
          <input type="text" className="input input-bordered input-sm w-full max-w-xs" value={apikey} onChange={(e) => setApiKey(e.target.value)}/>
          <Link className="underline" href='/profile'>configure</Link>
        </div> 
        }

        <div className="relative flex flex-row items-center">
          {waiting?
          <div className="ai-spinner absolute left-3 bottom-2">
            <div className="ai-bounce1 bg-accent"></div>
            <div className="ai-bounce2 bg-accent"></div>
            <div className="ai-bounce3 bg-accent"></div>
          </div> : null}

          <input
            autoFocus
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleEnter}
            placeholder={waiting? null : 'Ask AI to write anything...'}
            className="input input-bordered w-[800px] shadow-lg"
          />

          <div
            className={`absolute right-4 ${
              prompt ? "" : "hidden"
            }`}
            onClick={() => generate(prompt)}
          >
            <i title="Send to AI" className="cursor-pointer text-primary hover:text-primary-focus text-xl ri-arrow-up-circle-line"></i>
          </div>
        </div>
        </div>
      ) : null}
    </div>
  );
}
