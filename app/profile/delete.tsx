'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getclient from '@utils/pb-client'
import toast from 'react-hot-toast'

export default function DeleteAccount() {
    const router = useRouter();
    const pb = getclient();
    const [id, setId] = useState('');
    useEffect(() => {
        setId(pb.authStore.model.id)
    }, [])
    const deleteAccount = async () => {
        try {
            const res = await pb.collection('users').delete(id);
            toast.success('You have successfully deleted your account')
            pb.authStore.clear();
            router.push('/'); 
        } catch (error) {
            toast.error(error.message);
        }        
    }

    return (
        <div className="">
        <label htmlFor="delete-account-modal" className="btn btn-wide btn-error">Delete My Account</label>
        <input type="checkbox" id="delete-account-modal" className="modal-toggle" />
        <label htmlFor="delete-account-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
                <h3 className="font-bold text-lg">Are you sure you want to delete your account?</h3>
                <p className="py-4 mb-10">All of your language notebooks will be deleted.</p>
                <div className='flex flex-col -space-y-3'>
                    <button onClick={deleteAccount} className="btn btn-error btn-block">Confirm</button>
                    <div className="modal-action">
                    <label htmlFor="delete-account-modal" className="btn btn-block modal-action justify-center">Cancel</label>
                    </div>
                </div>
        </label>
        </label>
        </div>
    )
}