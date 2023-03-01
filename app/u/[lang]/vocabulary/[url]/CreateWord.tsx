'use client';
import getclient from '@utils/pb-client';
import { useRouter } from 'next/navigation';

export default function CreateWord({lang, url}:{lang:string, url:string}) {

    const router = useRouter();
    const create = async () => {
        const client = getclient();
        // const userId = JSON.parse(decodeURIComponent(document.cookie).substring(8)).model.id;
        const userId = client.authStore.model.id;
        const res = await client.collection('vocabulary').create({
            userId: userId,
            lang: lang,
            url: url,
            word:'',
            pronun:'',
            part:'',
            meaning:'',
        })
        router.refresh();
      }

    return (
    <div className='p-6'>
        <button onClick={create} className="btn btn-primary capitalize">add</button>
    </div>
    )
}