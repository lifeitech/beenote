'use client';
import getclient from "@utils/pb-client";
import toast from 'react-hot-toast';

export default function Save({editor, collection, id}:{editor:any, collection:string, id:string}) {

    const save = async () => {        
        const client = getclient();
        const json = editor.getJSON();
        const res = await client.collection(collection).update(id, {contentJSON: json})

        if (!res.code) {toast.success('Saved');}
        else {toast.error('Failed.')}
    }

    return (
        <>
        <div className="tooltip" data-tip="Save">
        <button onClick={save} className="btn btn-circle btn-lg text-xl"><i className="ri-download-2-line"></i></button>
        </div>
        </>
    )
}
