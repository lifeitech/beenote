'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';

export function CreateCategory({lang}:{lang:string}) {
    const router = useRouter();
    const create = async () => {
      const pb = getclient();
      const userId = pb.authStore.model.id;
      const res = await pb.collection('alphabet').create({
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

  const router = useRouter();

  const updateTitle = async (e:React.FormEvent<HTMLFormElement>) => {
    try {
    const pb = getclient();
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const alphabets = await pb.collection('alphabet').getFullList(1, {filter: `lang="${lang}" && category="${title}"`});
    alphabets.map(async item => {
        const res = await pb.collection('alphabet').update(item.id, formData)  
    });
    toast.success('Success');
    } catch (error) {
      toast.error('Something bad happened')
      }
    setModifyTitle(false);
    router.refresh();
    }

    const deleteCategory = async () => {
      try {
        const pb = getclient();
        const alphabets = await pb.collection('alphabet').getFullList(1, {filter: `lang="${lang}" && category="${title}"`});
        alphabets.map(async item => {
        const res = await pb.collection('alphabet').delete(item.id);
    })
    toast.success('Deleted'); 
      } catch (error) {
        toast.error('Something bad happened')
      }
    router.refresh();
    }

  return (
    <div className='flex flex-row gap-2 items-center'>
    <div className='flex flex-row gap-8 items-center py-4'>
        {modifyTitle?
        <form className='flex flex-row gap-2' method='post' onSubmit={updateTitle}>
            <input type="text" name='category' defaultValue={title} className="input input-bordered text-2xl w-full" />
            <button type='submit' className="btn">Change</button>
            <button className="btn btn-ghost" onClick={()=>setModifyTitle(false)}>Cancel</button>
        </form>
        : 
        <h3 className="text-2xl mt-2 mb-2">{title}</h3>}
        
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




