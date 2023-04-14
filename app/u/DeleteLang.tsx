'use client';
// import { useState } from 'react';
import { useRouter } from 'next/navigation';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';

export default function DeleteLang({id}:{id:string}) {

  const router = useRouter();
  
  const deleteLang = async () => {
    try {
      const client = getclient();
      const res = await client.collection('language').delete(id);
      toast.success('Deleted');
      router.refresh();
    } catch (error) {
      toast.error('Failed')
    }
    }

    return (
      <div>
        <label htmlFor={`del-language-modal-${id}`} className="btn btn-wide">Delete</label>
        <input type="checkbox" id={`del-language-modal-${id}`} className="modal-toggle" />
        <label htmlFor={`del-language-modal-${id}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
                <div className='flex flex-col gap-5 text-left'>
                <h3 className="font-bold text-xl">Are you sure you want to delete this language notebook?</h3>
                <p className='text-gray-400'>All of your alphabet, vocabulary and grammar notes will be deleted.</p>
                </div>
                <div className="modal-action flex flex-row gap-5 items-baseline justify-center">
                <label htmlFor={`del-language-modal-${id}`} onClick={deleteLang} className="btn btn-error w-28 modal-action justify-center">Yes</label>
                <label htmlFor={`del-language-modal-${id}`} className="btn w-28 modal-action justify-center">No</label>
                </div>
        </label>
        </label>
        </div>
    )
}



