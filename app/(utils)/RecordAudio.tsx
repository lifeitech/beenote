'use client';
import { useState } from 'react';
import getclient from '@utils/pb-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RecordAudio({id, collection}:{id:string, collection:string}) {
    const [recording, setRecording] = useState(false);
    const router = useRouter();
    const record = () => {
        const startRecording = (stream:MediaStream) => {
            setRecording(true);
            const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});
            const stop = document.getElementById(`stop-${id}`);
            stop!.onclick = () => {
                mediaRecorder.stop();
                setRecording(false);
            };           
            let chunks:BlobPart[] = [];
            mediaRecorder.ondataavailable = (e) => {chunks.push(e.data)};
            mediaRecorder.onstop = async (e) => {
                console.log("recorder stopped");
                const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                chunks = [];
                const pb = getclient();
                const formData = new FormData();
                formData.append('audio', blob);
                await pb.collection(collection).update(id, formData);
                toast.success('Successfully uploaded the audio file')
                router.refresh();
            }
            mediaRecorder.start();
        }
        navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(startRecording);
      }
    return (
    <div className='flex flex-row gap-2 justify-center'>
        <div className='indicator'>
        {recording ? 
        <span className="flex h-3 w-3 indicator-item">
            <span className="animate-ping absolute inline-flex w-3 h-3 rounded-full bg-secondary opacity-75"></span>
            <span className="inline-flex rounded-full h-3 w-3 bg-secondary-focus"></span>
        </span> : null}
         <div className="text-xl cursor-pointer" onClick={record}>
            <i className={`ri-mic-2-line`} title='Record Audio'></i>
        </div>
        </div>
        
        <div className="text-xl cursor-pointer" id={`stop-${id}`}>
            {recording ? <i className="ri-stop-circle-line text-red-500" title='Stop'></i> : null}
        </div>
    </div>
    )
}