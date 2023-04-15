'use client';
// import { useState } from 'react';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import getclient from '@utils/pb-client';
import toast from 'react-hot-toast';
import RecordAudio from '@utils/RecordAudio';
import { useTheme } from '@utils/Theme';
// import Image from 'next/image';

const maketoast = (res) => {
  if (!res.code) {toast.success('Saved');}
  else {toast.error('Operation failed')}
}

export default function VocabularyItem({id, word, part, meaning, audio, image}) {
    // const [doubleclicked, setDoubleclicked] = useState(false);
    const theme = useTheme();
    const router = useRouter();
    const client = getclient();

    const updateWord = async (value) => {
    if (value != word){
      const res = await client.collection('vocabulary').update(id, {word: value});
      // maketoast(res);
      router.refresh();
    }
  }

  const updatePart = async (value) => {
    if (value != part){
      const res = await client.collection('vocabulary').update(id, {part: value});
      // maketoast(res);
      router.refresh();
    }
  }

  const updateMeaning = async (value) => {
    if (value != meaning){
      const res = await client.collection('vocabulary').update(id, {meaning: value});
      // maketoast(res);
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
    // const audio = document.getElementById(`audio-${id}`);
    const audio = new Audio(audio_url);
    audio.play();
  }

  // const image_url =  `${process.env.NEXT_PUBLIC_POCKETBASE}/api/files/vocabulary/${id}/${image}`;
  // const [hovering, setHovering] = useState(false);
//   const uploadImage = async (e:React.FormEvent<HTMLFormElement>)=> { 
//     e.preventDefault();
//     const form = e.currentTarget;
//     const formData = new FormData(form);
//     const res = await client.collection('vocabulary').update(id, formData)
//     toast.success('Successfully uploaded image')
//     router.refresh();
//     // setModifyAvatar(false);
// }

    return (
        <motion.div className='relative rounded-xl border-2 border-b-4 py-2 px-2 flex flex-row gap-2 items-center' 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        >
        <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-2 items-center'>
        <div className="font-bold text-3xl" contentEditable="true" onBlur={(e)=>updateWord(e.currentTarget.textContent)}>{word}</div>

        <div className={`text-sm ${theme == 'bubblebee' ? 'text-gray-300' : 'text-gray-400'}`} contentEditable="true" onBlur={(e)=>updatePart(e.currentTarget.textContent)}>{part}</div>
        </div>

        <div className="pl-2" contentEditable="true" onBlur={(e)=>updateMeaning(e.currentTarget.textContent)}>{meaning}</div>
        </div>

        <div className="flex flex-row gap-2 justify-center ml-auto">
          {audio? 
          <div onClick={playAudio} className="cursor-pointer">
              {/* <audio id={`audio-${id}`} src={audio_url}></audio> */}
              <i className="ri-volume-up-line"></i>
          </div> 
          : 
          <i className={`ri-volume-up-line ${theme == 'bubblebee' ? 'text-gray-300' : 'text-gray-600'} text-xl`}></i>
          }
          <RecordAudio id={id} collection='vocabulary'/>
        </div>

        <div title='delete' className='absolute right-1 bottom-0 cursor-pointer text-gray-400 hover:text-error z-30' onClick={deleteword}><i className="ri-close-circle-line"></i></div>
        </motion.div>

    )
}



{/* <div className="w-32 flex flex-row items-center justify-center gap-2">
  
  {image? 
  <div className='relative cursor-pointer'>
  <i onMouseOver={()=>setHovering(true)} onMouseOut={()=>setHovering(false)} className={`ri-image-fill text-xl`}></i>
  {hovering && 
  <div className='absolute -left-[350px] z-10'>
    <Image src={image_url} width={300} height={300} className="object-none overflow-visible" alt="visualization of this word"></Image>
  </div>}
  </div>
  :
  <i className={`ri-image-fill ${theme == 'bubblebee' ? 'text-gray-300' : 'text-gray-600'} text-xl`}></i>
}

  <label htmlFor={`img-input-${id}`} title='Upload Image' className='cursor-pointer'><i className="ri-upload-2-fill"></i></label>
  <form method="post" onChange={uploadImage} className='hidden'>
    <input id={`img-input-${id}`} type="file" name="image" required/>
  </form>
</div> */}

{/* <div title='delete' className='cursor-pointer ml-2 text-gray-400 hover:text-error' onClick={deleteword}><i className="ri-close-circle-line"></i></div> */}