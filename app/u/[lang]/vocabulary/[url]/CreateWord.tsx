'use client';
import getclient from '@utils/pb-client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateWord({lang, url}:{lang:string, url:string}) {
    const [word, setWord] = useState('');
    const [part, setPart] = useState('');
    const [meaning, setMeaning] = useState('');
    const router = useRouter();
    const create = async () => {
        const client = getclient();
        const userId = client.authStore.model.id;
        const res = await client.collection('vocabulary').create({
            userId: userId,
            lang: lang,
            url: url,
            word: word,
            part: part,
            meaning: meaning,
            chats: {
                "chats": []
              },
        })
        setWord("");
        setPart("");
        setMeaning("");
        router.refresh();
      }

    return (
        <div className="dropdown dropdown-right">
        <label tabIndex={0}>
        <button title="Create word" className="btn btn-primary capitalize m-6">add</button>
        </label>
        <div tabIndex={0} className="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content">
          <div className="card-body">
            <h3 className="card-title">Add word</h3>
            <input type="text" value={word} onChange={(e)=>setWord(e.target.value)} placeholder="Word" className="input max-w-xs" />
            <input type="text" value={part} onChange={(e)=>setPart(e.target.value)} placeholder="Part" className="input max-w-xs" />
            <input type="text" value={meaning} onChange={(e)=>setMeaning(e.target.value)} placeholder="Meaning" className="input max-w-xs" />
            <button onClick={create} className="btn">OK</button>
          </div>
        </div>
      </div>
    )
}