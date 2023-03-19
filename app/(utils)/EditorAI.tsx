"use client";
import { useState, useEffect } from "react";
import getclient from "@utils/pb-client";
import Swal from 'sweetalert2'


export default function EditorAI({ editor }: { editor: any }) {
  const [showInput, setShowInput] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [point, setPoint] = useState(0);
  const [quota, setQuota] = useState(0);
  const pb = getclient();
  const userId = pb.authStore.model.id;
  
  useEffect(() => {
    (async () => {
      const record = await pb.collection('users').getOne(userId);
      setPoint(record.point);
      setQuota(record.quota);
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
    if (point == 0) {
      Swal.fire({
        title: 'Free usage limit reached.',
        text: 'You have used all your free AI responses. Upgrade to pro account for unlimited access!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
      setWaiting(true);
      setPrompt("");
      const res = await fetch("/api/chat2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, }),
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
      await pb.collection('users').update(userId, {point:point-1});
      setPoint(point => point - 1);
    } catch (error) {
      console.error(error);
      alert(error.message);
      setWaiting(false);
    }
  };

  return (
    <div className="absolute -bottom-20 left-5 z-20">
      {showInput ? (
        <div className="flex flex-col gap-2">
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
        <div className="flex flex-row gap-2">
        <progress className="progress progress-secondary w-[750px]" value={quota-point} max={quota}></progress>
        <div className="tooltip tooltip-bottom" data-tip="free AI responses used">
          <p className="text-sm ">{quota-point}/{quota}</p>
        </div>
        </div>
        </div>
      ) : null}
    </div>
  );
}
