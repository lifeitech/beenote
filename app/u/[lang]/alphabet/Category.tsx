'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';

export function CreateCategory({lang}:{lang:string}) {
    const router = useRouter();
    const create = async () => {
      const client = getclient();
      const userId = client.authStore.model.id;
      const res = await client.collection('alphabet').create({
            userId: userId,
            lang: lang,
            category: `Untitled-${crypto.randomUUID().substring(0, 5)}`,
            alphabet: '',
            pronun: ''
        });
      router.refresh();
      if (!res.code) {toast.success('Created');}
      else {toast.error('Failed.')}
    }
    return (
      <button onClick={create} className='btn btn-outline capitalize mt-10'>+ New Category</button>
    )
}


export function CategoryTitle({title, lang}:{title:string, lang:string}) {
  const [modifyTitle, setModifyTitle] = useState(false);
  const [newtitle, setNewtitle] = useState(title);
  const router = useRouter();
  const updateTitle = async () => {
    const client = getclient();
    const alphabets = await client.collection('alphabet').getFullList(1, {filter: `lang="${lang}" && category="${title}"`});
    alphabets.map(async item => {
      const res = await client.collection('alphabet').update(item.id, {'category':newtitle})
      if (res.code){toast.error('Something bad happened')}
    })
    toast.success('Success');
    setModifyTitle(false);
    router.refresh();
    }

    const deleteCategory = async () => {
      const client = getclient();
      const alphabets = await client.collection('alphabet').getFullList(1, {filter: `lang="${lang}" && category="${newtitle}"`});
      alphabets.map(async item => {
      const res = await client.collection('alphabet').delete(item.id);
    })
    toast.success('Deleted');
    router.refresh();
    }

  return (
    // <h2 contentEditable="true" onBlur={(e)=>update(e.currentTarget.textContent)} className="text-3xl font-bold m-4">{title}</h2>
    <div className='flex flex-row gap-2 items-center'>
    <div className='flex flex-row gap-8 items-center py-4'>
        {modifyTitle?
        <div className='flex flex-row gap-2'>
            <input type="text" value={newtitle} onChange={(e)=>setNewtitle(e.target.value)} className="input input-bordered text-2xl w-full" />
            <button onClick={updateTitle} className="btn">Change</button>
            <button className="btn btn-ghost" onClick={()=>setModifyTitle(false)}>Cancel</button>
        </div>
        : 
        <h3 className="text-2xl mt-2 mb-2">{newtitle}</h3>}
        
        {modifyTitle? null : <i title='Change category name' onClick={()=>setModifyTitle(true)} className="text-neutral-content hover:text-base-content text-xl ri-edit-line cursor-pointer"></i>}
    </div>

    <div>
        <label title='Delete this category' htmlFor={`delete-category-${title}`} className="text-xl hover:text-error text-neutral-content cursor-pointer">
          <i className="ri-delete-bin-line"></i>
        </label>
        <input type="checkbox" id={`delete-category-${title}`} className="modal-toggle" />
        <label htmlFor={`delete-category-${title}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
                <h3 className="font-bold text-lg">Are you sure you want to delete this category?</h3>
                <div className="modal-action flex flex-row gap-5 items-baseline justify-center">
                <label htmlFor={`delete-category-${title}`} onClick={deleteCategory} className="btn btn-error w-28 modal-action justify-center">Yes</label>
                <label htmlFor={`delete-category-${title}`} className="btn w-28 modal-action justify-center">No</label>
                </div>
        </label>
        </label>
        </div>
    </div>
)
}




