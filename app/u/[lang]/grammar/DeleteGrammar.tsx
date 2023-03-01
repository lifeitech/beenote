'use client';
import { useRouter } from 'next/navigation';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';

export default function DeleteGrammar({id}:{id:string}) {
  const router = useRouter();
  const deleteGrammar = async () => {
    try {
      const client = getclient();
      const res = await client.collection('grammar').delete(id);
      toast.success('Deleted');
      router.refresh();
    } catch (error) {
      toast.error('Failed')
    }
    }

    return (
      <div>
        <label htmlFor={`del-grammar-note-modal-${id}`} className="btn btn-block">Delete</label>
        <input type="checkbox" id={`del-grammar-note-modal-${id}`} className="modal-toggle" />
        <label htmlFor={`del-grammar-note-modal-${id}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
                <h3 className="font-bold text-lg">Are you sure you want to delete this grammar notebook?</h3>
                <div className="modal-action flex flex-row gap-5 items-baseline justify-center">
                <label htmlFor={`del-grammar-note-modal-${id}`} onClick={deleteGrammar} className="btn btn-error w-28 modal-action justify-center">Yes</label>
                <label htmlFor={`del-grammar-note-modal-${id}`} className="btn w-28 modal-action justify-center">No</label>
                </div>
        </label>
        </label>
        </div>
    )
}



