'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';
import isValid from '@utils/validateURL';

export default function CreateVocabulary({lang}) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const router = useRouter();

    const handleTyping = (e)=> {
      setTitle(e.target.value);
      setUrl(e.target.value.toLowerCase().replaceAll(' ', '-'))
    }

    const create = async () => {
      if (!isValid(url)) {
        toast.error('Please enter valid URL!')
        return
      }
      const client = getclient();
      // const userId = JSON.parse(decodeURIComponent(document.cookie).substring(8)).model.id;
      const userId = client.authStore.model.id;
      const res = await client.collection('vocabulary_doc').create({
              userId: userId,
              lang: lang,
              title: title,
              url: url
          });

      router.refresh();
      router.push(`/u/${lang}/vocabulary/${url}`);
      
      if (!res.code) {toast.success('Created');}
      else {toast.error('Failed.')}
      }

    return (
      <>
      <label htmlFor="create-vocabulary" className="cursor-pointer">
        <div className="relative">
          {/* <div className="absolute w-56 h-56 rounded-lg -right-4 -bottom-4  bg-accent z-0"></div> */}
          <div className="flex flex-row gap-2 relative items-center justify-center box-border w-72 h-20 p-4 border-4 rounded-full border-slate-800 bg-primary z-10 active:translate-x-1 active:translate-y-1">
            <i className="ri-add-line text-3xl"></i><span className="text-2xl">Create</span>
          </div>
        </div>
      </label>
  
      <input type="checkbox" id="create-vocabulary" className="modal-toggle" />
      <label htmlFor="create-vocabulary" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
  
          <div className="flex flex-col gap-2 items-center">
  
          <h3 className="text-3xl font-bold mb-5">Create Vocabulary Notebook</h3>
          
          <div className='flex flex-col gap-4 items-center'>

            <div className='relative'>
            <span className='absolute -left-12 top-2 text-lg font-semibold'>Title:</span>
            <input type="text" value={title} onChange={handleTyping} placeholder="Title" className="input input-bordered input-accent w-60" />
            </div>
            
            <div className='relative'>
            <span className='absolute -left-20 top-2 text-lg font-semibold'>url path:</span>
            <input type="text" value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="/" className="input input-bordered input-accent w-60" />
            </div>

        </div>
  
          <div className="modal-action">
            <label htmlFor="create-vocabulary" onClick={create} className="btn btn-wide justify-center rounded-full">OK</label>
          </div>
          </div>
  
          </label>
        </label>
        </>
    )
}