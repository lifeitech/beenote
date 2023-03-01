'use client';
import { useState, useEffect } from 'react';
import getclient from '@utils/pb-client'
import toast from 'react-hot-toast'

export default function Password() {
    const pb = getclient();
    const [emailAddress, setEmailAddress] = useState('');
    useEffect(() => {
        setEmailAddress(pb.authStore.model.email);
    }, [])
    // const email = pb.authStore.model.email;
    const changePassword = async () => {
        const res = await pb.collection('users').requestPasswordReset(emailAddress);
        toast.success('An link has been send to your email address. Follow the link to reset your password.', {
            duration: 8000,
        })
    }
    return (
        <div className='flex flex-col items-start gap-5'>
        <p className='text-xl'>Click the button below to reset your password.</p>
        <button onClick={changePassword} className="btn btn-primary btn-wide">Reset Password</button>
        </div>
    )
}