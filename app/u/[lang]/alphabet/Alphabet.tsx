'use client';
import { useRouter } from 'next/navigation';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';
import RecordAudio from '@utils/RecordAudio';
import { useTheme } from '@utils/Theme';

export default function Alphabet({id, alphabet, pronun, audio}) {
  const theme = useTheme();
  const router = useRouter();

  const updateAlphabet = async (value:string) => {
    if (value != alphabet){
      const client = getclient();
      const res = await client.collection('alphabet').update(id, {alphabet: value});
      if (!res.code) {toast.success('Saved');}
      else {toast.error('Operation failed')}
      router.refresh();
    }
  }

  const updatePronun = async (value:string) => {
    if (value != pronun){
      const client = getclient();
      const res = await client.collection('alphabet').update(id, {pronun: value});
      if (!res.code) {toast.success('Saved');}
      else {toast.error('Operation failed')}
      router.refresh();
    }
  }

  const deleteAlphabet = async () => {
    const client = getclient();
    const res = await client.collection('alphabet').delete(id);
    if (res) {toast.success('Deleted');}
    else {toast.error('Operation failed')}
    router.refresh();
  }

  const audio_url =  `${process.env.NEXT_PUBLIC_POCKETBASE}/api/files/alphabet/${id}/${audio}`;
  const playaudio = () => {
    const audio = new Audio(audio_url);
    audio.play();
  }

  return (
    <>
    {(!alphabet && !pronun) ? null : 
    <div className="relative box-border h-32 w-32 p-4 border-4 border-accent rounded-l-lg rounded-br-lg text-center">

      <div title='Delete' onClick={deleteAlphabet} className='absolute right-0 top-0 w-5 h-5 bg-accent rounded-bl-lg text-center cursor-pointer'><i className="absolute right-0 top-0 ri-close-line text-accent-content"></i></div>

      <div contentEditable="true" onBlur={(e)=>updateAlphabet(e.currentTarget.textContent)} suppressContentEditableWarning={true} className="font-bold cursor-pointer text-3xl overflow-hidden">{alphabet}</div>

      <div className='flex flex-row gap-2 items-center justify-center align-middle mb-1'>

      <div contentEditable="true" onBlur={(e)=>updatePronun(e.currentTarget.textContent)} suppressContentEditableWarning={true} className='cursor-pointer text-2xl'>{pronun}</div>

      {audio? 
      <div onClick={playaudio} className="text-lg cursor-pointer" title='Play sound'>
          <i className="ri-volume-up-line"></i>
      </div> 

        : <i className={`ri-volume-up-line ${theme == 'bubblebee' ? 'text-gray-300' : 'text-gray-600'} text-lg`}></i>
        }
      </div>

      <RecordAudio id={id} collection='alphabet'/>
    
    </div>
    }
    </>
    )
}