'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import getclient from '@utils/pb-client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';

export default function BasicInfo() {
    const router = useRouter();
    const pb = getclient();
    const [userId, setuserId] = useState('');
    const [name, setName] = useState('');
    const [avatarFilename, setAvatarFilename] = useState('');
    const [modifyName, setModifyName] = useState(false);
    useEffect(() => {
        setuserId(pb.authStore.model.id);
        setName(pb.authStore.model.name);
        setAvatarFilename(pb.authStore.model.avatar);
    }, [])    

    const updateAvatar = async (e:React.FormEvent<HTMLFormElement>)=> { 
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const updatedRecord = await pb.collection('users').update(userId, formData);
        toast.success('Successfully uploaded new avatar');
        router.refresh();
    }
    const updateName = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        try {
            const updatedRecord = await pb.collection('users').update(userId, formData);
            toast.success('Successfully updated your name');
            setName(formData.get('name').toString());
        } catch (error) {
            toast.error('An error happened. Please try again.');
        }     
        setModifyName(false);
    }

    return (
        <div className='flex flex-col gap-5 justify-center'>
        <div className='flex flex-col items-start gap-10'>
            <Image height={250} width={250} src={`${process.env.NEXT_PUBLIC_POCKETBASE}/api/files/users/${userId}/${avatarFilename}`} alt="avatar" className='rounded-md' />

            <form className='flex flex-row gap-2' method="post" onSubmit={updateAvatar}>
            <input type="file" name="avatar" required className="file-input file-input-bordered file-input-md w-full max-w-xs" />
            <button type="submit" className="btn">Change</button> 
            </form>
        </div>

        <div className='flex flex-row gap-5 items-end'>
            {modifyName?
            <form className='flex flex-row gap-2' method="post" onSubmit={updateName}>
                <input type="text" name="name" defaultValue={name} className="input input-bordered w-full max-w-xs" />
                <button type='submit' className="btn">Change</button>
                <button type="button" className="btn btn-ghost" onClick={()=>setModifyName(false)}>Cancel</button>
            </form>
            : 
            <div className="text-3xl font-bold">{name}</div>}
            
            {modifyName? null : <i onClick={()=>setModifyName(true)} className="text-2xl ri-edit-line cursor-pointer text-neutral-content hover:text-base-content"></i>}
        </div>
        </div>
    )
}