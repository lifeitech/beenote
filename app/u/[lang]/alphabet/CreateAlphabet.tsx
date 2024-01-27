'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';

const CreateAlphabet = ({category, lang}) => {
    const [alphabet, setAlphabet] = useState('');
    const [pronun, setPronun] = useState('');

    const router = useRouter();

    const create = async () => {
      if (!alphabet && !pronun) {
        return
      }
      const client = getclient();
      const userId = client.authStore.model.id;
      const res = await client.collection('alphabet').create({
            userId: userId,
            lang: lang,
            category: category,
            alphabet: alphabet,
            pronun: pronun
        });

      router.refresh();

      setAlphabet('');
      setPronun('');

      if (!res.code) {toast.success('Created');}
      else {toast.error('Failed.')}

    }

    return (
    <div className="dropdown dropdown-right">
      <label tabIndex={0}>
      <div title="Create New Alphabet" className="box-border h-32 w-32 p-4 border-4 rounded-lg flex items-center justify-center cursor-pointer">
        <i className="ri-add-line text-3xl font-bold"></i>
      </div>
      </label>
      <div tabIndex={0} className="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content">
        <div className="card-body">
          <h3 className="card-title">Create Alphabet</h3>
          <input type="text" value={alphabet} onChange={(e)=>setAlphabet(e.target.value)} placeholder="Alphabet" className="input max-w-xs" />
          <input type="text" value={pronun} onChange={(e)=>setPronun(e.target.value)} placeholder="Pronunciation" className="input max-w-xs" />
          <button onClick={create} className="btn">OK</button>
        </div>
      </div>
    </div>
    )
}

export default CreateAlphabet;