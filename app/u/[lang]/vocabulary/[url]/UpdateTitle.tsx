'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import getclient from "@utils/pb-client";
import toast from 'react-hot-toast';

export default function Title({title, id}:{title:string, id:string}) {
    const [modifyTitle, setModifyTitle] = useState(false);
    const router = useRouter();

    const updateTitle = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const client = getclient();
        const res = await client.collection('vocabulary_doc').update(id, formData);
        if (!res.code) {toast.success('Success');}
        else {toast.error('Operation failed')}
        setModifyTitle(false);
        
        router.refresh();
    }

    return (
        // <h2 contentEditable="true" onBlur={(e)=>update(e.currentTarget.textContent)} className="text-3xl font-bold m-4">{title}</h2>
        <div className='flex flex-row gap-5 items-center'>
            {modifyTitle?
            <form className='flex flex-row gap-2 p-4' method="post" onSubmit={updateTitle}>
                <input type="text" name="title" defaultValue={title} className="input input-bordered text-3xl font-bold w-full" />
                <button type="submit" className="btn">Change</button>
                <button type="button" className="btn btn-ghost" onClick={()=>setModifyTitle(false)}>Cancel</button>
            </form>
            : 
            <h2 className="text-3xl font-bold p-4">{title}</h2>}
            
            {modifyTitle? null : <i onClick={()=>setModifyTitle(true)} title="Modify title" className="text-2xl ri-edit-line cursor-pointer text-neutral-content hover:text-base-content"></i>}
        </div>
    )
    
}