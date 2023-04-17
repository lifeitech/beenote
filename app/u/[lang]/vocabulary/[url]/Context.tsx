'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import getclient from "@utils/pb-client";
import toast from "react-hot-toast";

export default function Context({id, close}) {
    const [lang, setLang] = useState("");
    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");
    const [chats, setChats] = useState([]);
    const [question, setQuestion] = useState("");
    const [waiting, setWaiting] = useState(false);

    const pb = getclient();

    const examples = [
      {text:`is it a common word in ${lang}? `, prompt:`Is "${word}" a commonly used word in ${lang}?`},
      {text:`Give me some examples`, prompt:`Give me some examples on how "${word}" is used in the ${lang} language`},
    ]

    useEffect(() => {
        (async () => {
          const record = await pb.collection('vocabulary').getOne(id);
          setLang(record.lang);
          setWord(record.word);
          setMeaning(record.meaning);
          setChats(record.chats.chats);
        })();
      }, [])

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") {
          event.preventDefault();
          const newchats = [...chats, { role: "user", content: question }];
          setChats(newchats);
          setWaiting(true);
          generate(newchats);
        }
      };

    const handleClick = (prompt)=> {
      const newchats = [...chats, { role: "user", content: prompt }];
      setChats(newchats);
      setWaiting(true);
      generate(newchats);
    }

    const generate = async (chats) => {
      const res = await fetch("/api/context-vocab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chats }),
      });

      const res_json = await res.json();
      setQuestion("");
      setWaiting(false);
      setChats([...chats, res_json.message]);
    }

    const save = async () => {
      try {
        await pb.collection("vocabulary").update(id, { chats: JSON.stringify({ chats: chats }) });
      } catch (error) {
        toast.error("An error occurred");
      }
    };

    return (
    <motion.div layoutId={id} className="relative bg-primary w-auto h-auto p-5 rounded-xl border-2 border-b-4 flex flex-col items-start">
        <button onClick={()=>{save();close()}} className="btn btn-circle btn-sm absolute right-2 top-2"><i className="ri-close-line"></i></button>
        <h2 className="font-bold text-2xl">{word}</h2>
        <h5 className="text-xl mb-5">{meaning}</h5>

        <div className="flex flex-row gap-2 items-center mb-2">
          <input
            autoFocus
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleEnter}
            placeholder='Ask about...'
            className="input input-bordered w-[600px] shadow-lg"
            />
            <button title="Send" onClick={()=>handleClick(question)} className="btn btn-square"><i className="ri-send-plane-line"></i></button>
          </div>

          <div>
            {examples.map((item, index) => {
              return (
                <div key={index} onClick={()=>handleClick(item.prompt)} className="mx-1 p-1 badge cursor-pointer">{item.text}</div>
              )
            })}
          </div>

        <div>
        {chats.map((item, index) => {
          return (
            <div key={index} className={`m-2 p-2 rounded-lg ${item.role == "user" ? "bg-success text-success-content" : "bg-base-200"}`}>
              <p className="whitespace-pre-wrap">{item.content}</p>
            </div>
          );
        })}
        </div>
        
      {waiting? 
      <div className="ai-spinner">
          <div className="ai-bounce1 bg-accent"></div>
          <div className="ai-bounce2 bg-accent"></div>
          <div className="ai-bounce3 bg-accent"></div>
      </div> : null}

    </motion.div>
    )
}