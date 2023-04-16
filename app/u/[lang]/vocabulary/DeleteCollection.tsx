'use client';
import { useRouter } from 'next/navigation';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';

export default function DeleteCollection({id}:{id:string}) {
  const router = useRouter();
  const deleteCollection = async () => {
    const client = getclient();
    const res = await client.collection('vocabulary_doc').delete(id);
    // TODO: batch delete all words in the vocabulary table
    if (res) {toast.success('Deleted');}
    else {toast.error('Failed')}
    router.refresh();
    }

    return (
      <div>
        <label htmlFor={`del-vocabulary-note-modal-${id}`} className="btn btn-circle"><i className="ri-delete-bin-6-line"></i></label>
        <input type="checkbox" id={`del-vocabulary-note-modal-${id}`} className="modal-toggle" />
        <label htmlFor={`del-vocabulary-note-modal-${id}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
                <h3 className="font-bold text-lg">Are you sure you want to delete this vocabulary notebook?</h3>
                <div className="modal-action flex flex-row gap-5 items-baseline justify-center">
                <label htmlFor={`del-vocabulary-note-modal-${id}`} onClick={deleteCollection} className="btn btn-error w-28 modal-action justify-center">Yes</label>
                <label htmlFor={`del-vocabulary-note-modal-${id}`} className="btn w-28 modal-action justify-center">No</label>
                </div>
        </label>
        </label>
        </div>
    )
}

