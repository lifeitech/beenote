'use client';
import { useState, useEffect } from 'react'
import getclient from '@utils/pb-client'
import toast from 'react-hot-toast'

function display_key(key: string) {
    const display = key.slice(0, 5) + "*".repeat(10) + key.slice(-5)
    return display
}

export default function APIKey() {
    const pb = getclient();
    const [userId, setuserId] = useState("");
    const [apikey, setApiKey] = useState("");
    const [newkey, setNewKey] = useState("");

    useEffect(() => {
        setuserId(pb.authStore.model.id);
        setApiKey(pb.authStore.model.apikey);
    }, [])

    const handleClick = async () => {
        try {
            const updatedRecord = await pb.collection('users').update(userId, {"apikey":newkey});
            toast.success('Success');
            setApiKey(updatedRecord.apikey);
            setNewKey("");
        } catch (error) {
            toast.error('An error happened.');
        }  
    }

    return (
        <div className='flex flex-col gap-7'>
        <h3 className="font-bold text-xl">API Key</h3>
        <div>
          { apikey? <span>Your API key is <span className='font-bold'>{display_key(apikey)}.</span></span> : <span>You have not provided an API key.</span>}
        </div>
        <div>Add or update your API key below:</div>
        <input value={newkey} onChange={(e) => setNewKey(e.target.value)} className='input input-bordered w-full max-w-xs'/>
        <button onClick={handleClick} className='btn'>Add/Change</button>
        </div>
    )
}