'use client';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';
import RecordAudio from '@utils/RecordAudio';
import { useTheme } from '@utils/Theme';

const maketoast = (res) => {
  if (!res.code) {toast.success('Saved');}
  else {toast.error('Operation failed')}
}

export default function VocabularyItem({id, word, part, meaning, audio, image, onclick}) {
    const theme = useTheme();
    const router = useRouter();
    const client = getclient();

    const updateWord = async (value) => {
    if (value != word){
      const res = await client.collection('vocabulary').update(id, {word: value});
      router.refresh();
    }
  }

  const updatePart = async (value) => {
    if (value != part){
      const res = await client.collection('vocabulary').update(id, {part: value});
      router.refresh();
    }
  }

  const updateMeaning = async (value) => {
    if (value != meaning){
      const res = await client.collection('vocabulary').update(id, {meaning: value});
      router.refresh();
    }
  }

  const deleteword = async () => {
    const res = await client.collection('vocabulary').delete(id);
    maketoast(res);
    router.refresh();

  }
  const audio_url =  `${process.env.NEXT_PUBLIC_POCKETBASE}/api/files/vocabulary/${id}/${audio}`;
  const playAudio = () => {
    const audio = new Audio(audio_url);
    audio.play();
  }

    return (
        <div className='relative cursor-pointer rounded-xl border-2 border-b-4 p-4 flex flex-row gap-2 items-center' 
        // layoutId={id}
        onClick={onclick}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        // transition={{ duration: 0 }}
        >
        <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-2 items-center'>
        <div className="font-bold text-3xl z-10" contentEditable="true" onClick={(e)=>e.stopPropagation()} onBlur={(e)=>updateWord(e.currentTarget.textContent)}>{word}</div>

        <div className={`text-sm ${theme == 'bubblebee' ? 'text-gray-300' : 'text-gray-400'}`} contentEditable="true" onClick={(e)=>e.stopPropagation()} onBlur={(e)=>updatePart(e.currentTarget.textContent)}>{part}</div>
        </div>

        <div className="pl-2 z-10" contentEditable="true" onClick={(e)=>e.stopPropagation()} onBlur={(e)=>updateMeaning(e.currentTarget.textContent)}>{meaning}</div>
        </div>

        <div onClick={(e)=>e.stopPropagation()} className="flex flex-row gap-2 ml-auto z-10">
          {audio? 
          <div onClick={playAudio} className="cursor-pointer">
              {/* <audio id={`audio-${id}`} src={audio_url}></audio> */}
              <i className="ri-volume-up-line text-xl"></i>
          </div> 
          : 
          <i className={`ri-volume-up-line ${theme == 'bubblebee' ? 'text-gray-300' : 'text-gray-600'} text-xl`}></i>
          }
          <RecordAudio id={id} collection='vocabulary'/>
        </div>

        <div title="Delete" onClick={(e)=>{e.stopPropagation();deleteword()}} className='absolute right-1 bottom-0 text-lg cursor-pointer text-gray-400 hover:text-error z-10' >       
          <i className="ri-close-circle-line"></i>
        </div>
        </div>

    )
}