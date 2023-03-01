'use client';
// import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';
import LangIcon from '@utils/LangIcon';

const languages = [
    'english',
    'swedish',
    'norwegian',
    'finnish',
    'danish',
    'german',
    'dutch',
    'french',
    'italian',
    'spanish',
    'portuguese',
    'croatian',
    'ukrainian',
    'polish',
    'russian',
    'japanese',
    'korean',
    'chinese',
    'cantonese',
    'thai',
    'vietnamese',
    'indonesian',
    'malaysian',
]

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}


export default function CreateLanguage({created}:{created:string[]}) {

    const new_list = languages.filter(item => !created.includes(item));
    const [lang, setLang] = useState('');
    const handleClick = (item:string) => {
        setLang(item)
    }
    const router = useRouter();
    const create = async () => {
        if (lang == '') {
            toast.error('Please select a language')
            return undefined
        }
        const client = getclient();
        // const userId = JSON.parse(decodeURIComponent(document.cookie).substring(8)).model.id;
        const userId = client.authStore.model.id;
        const res = await client.collection('language').create({
            userId: userId,
            lang: lang,
            name: capitalize(lang),
        });

        router.refresh();

        if (!res.code) {toast.success('Created');}
        else {toast.error('Failed.')}
    }

    return (
    <div>
    <label htmlFor="modal-create-lang" className="relative cursor-pointer">
    <div className="absolute w-56 h-56 rounded-lg -right-4 -bottom-4  bg-accent z-0">
    </div>
    <div className="flex flex-col relative items-center justify-center box-border w-56 h-56 p-4 border-4 rounded-lg border-slate-800 bg-primary z-10 active:translate-x-1 active:translate-y-1">
    <i className="ri-add-line text-3xl"></i>
    <span className="text-2xl">Create Language</span>
    </div>
    </label>

    <input type="checkbox" id="modal-create-lang" className="modal-toggle" />
    <label htmlFor="modal-create-lang" className="modal cursor-pointer">
    <label className="modal-box relative" htmlFor="">

        {new_list.map(item => <div key={item} onClick={() => handleClick(item)} className={`flex flex-row items-center gap-5 p-2 rounded-md cursor-pointer hover:bg-primary ${item == lang ? 'bg-primary' : '' }`}><LangIcon lang={item} size={50}/><h3 className="text-lg font-bold text-info">{capitalize(item)}</h3></div>)}

        <div className="flex flex-col space-y-2">
            <label htmlFor="modal-create-lang" onClick={create} className="modal-action btn btn-primary btn-block justify-center">Create</label>
            <label htmlFor="modal-create-lang" className="modal-action btn btn-primary btn-block justify-center">Cancel</label> 
        </div>
    </label>
    </label>
    </div>
    )
}