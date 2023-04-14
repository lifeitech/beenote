'use client';
// import { useState } from 'react';
import { useRouter } from 'next/navigation';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';

export default function DeleteCustom({id}:{id:string}) {

  const router = useRouter();
  
  const deleteCustom = async () => {
    try {
      const client = getclient();
      const res = await client.collection('custom').delete(id);
      toast.success('Deleted');
      router.refresh();
    } catch (error) {
      toast.error('Failed')
    }
    }

    return (
      <div>
        <label htmlFor={`del-custom-note-modal-${id}`} className="btn btn-circle"><i className="ri-delete-bin-6-line"></i></label>
        <input type="checkbox" id={`del-custom-note-modal-${id}`} className="modal-toggle" />
        <label htmlFor={`del-custom-note-modal-${id}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
                <h3 className="font-bold text-lg">Are you sure you want to delete this custom notebook?</h3>
                    <div className="modal-action flex flex-row gap-5 items-baseline justify-center">
                    <label htmlFor={`del-custom-note-modal-${id}`} onClick={deleteCustom} className="btn btn-error w-28 modal-action justify-center">Yes</label>
                    <label htmlFor={`del-custom-note-modal-${id}`} className="btn w-28 modal-action justify-center">No</label>
                    </div>
        </label>
        </label>
        </div>
    )
}



