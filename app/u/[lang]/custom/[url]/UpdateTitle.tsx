'use client';
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import getclient from '@utils/pb-client'
import toast from 'react-hot-toast'
import isValid from '@utils/validateURL'


export default function Title({id, title, url, lang}:{id:string, title:string, url:string, lang:string}) {
    const [newtitle, setNewTitle] = useState(title);
    const [newurl, setNewUrl] = useState(url);
    const router = useRouter();
    const pb = getclient();

    const updateTitle = async () => {
        if (!isValid(newurl)) {
          alert('Please enter valid URL!')
          return
        }
        const updatedRecord = await pb.collection('custom').update(id, {
            'title': newtitle,
            'url': newurl
        });
        toast.success('Successfully updated the title');
        router.push(`/u/${lang}/custom/${newurl}`);

    }
    return (
    <div className='flex flex-row gap-2 items-baseline'>
    <h2 className="text-3xl font-bold mt-0 mx-4 mb-4 bg-base-100">{title}</h2>
    
    <div className="dropdown dropdown-right">
      <label tabIndex={0}>
        <i className="text-xl text-gray-500 ri-edit-line cursor-pointer"></i>
      </label>
      <div tabIndex={0} className="dropdown-content card card-compact w-72 p-5 shadow bg-primary text-primary-content">
        <div className="card-body">
          <h3 className="card-title">Modify title and url</h3>
          <label>Title: <input type="text" value={newtitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Title" className="input max-w-xs" /></label>
          <label>url: <input type="text" value={newurl} onChange={(e)=>setNewUrl(e.target.value)} placeholder="url: /" className="input max-w-xs" /></label>
          <button onClick={updateTitle} className="btn">OK</button>
        </div>
      </div>
    </div>
    </div>
    )
}