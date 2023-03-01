'use client';
import { useState } from 'react';
import Link from 'next/link';
import getclient from '@utils/pb-client'
import toast from 'react-hot-toast'

export default function Home() {
    const [email, setEmail] = useState('');
    const pb = getclient();
    const changePassword = async () => {
        const res = await pb.collection('users').requestPasswordReset(email);
        toast.success('An link has been send to your email address. Follow the link to reset your password.', {
            duration: 8000,
        })
    }
    return (
        <div className=' py-10 ml-40 flex flex-col items-start gap-2'>
        <Link href="/" className='mb-24'><button className='btn btn-ghost capitalize text-lg text-primary gap-2'><i className="ri-arrow-left-s-line"></i>Back to Home</button></Link>

        <p className='text-xl mb-5'>Enter your email below. Then click the button to reset your password.</p>

        <form method="post" onSubmit={changePassword} className="flex flex-col gap-5">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="email" placeholder='Email' required className="input input-bordered " />
            <button type="submit" className="btn btn-primary">Reset Password</button>
        </form>

        <p>or</p>

        <Link href="/login" className='text-lg text-primary underline'>log in here</Link>
        </div>
    )
}