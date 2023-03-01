'use client';
import { useState, useEffect } from 'react';
import getclient from '@utils/pb-client'
import toast from 'react-hot-toast'

export default function Email() {
    const pb = getclient();
    const [emailAddress, setEmailAddress] = useState('');
    useEffect(() => {
        setEmailAddress(pb.authStore.model.email);
    }, [])
    // const email_address = pb.authStore.model.email;
    const changeEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const new_email = event.currentTarget.value;
        const data = new FormData(event.currentTarget);
        const new_email = data.get('email')!.toString();
        const res = await pb.collection('users').requestEmailChange(new_email);
        toast.success('An link has been send to this email address. Click the link to reset your email.', {
            duration: 8000,
        })
    }

    return (
    <div className='flex flex-col items-start gap-5'>
        <p className='text-xl'>Your current email address is:</p>
        <p className='text-xl font-bold'>{emailAddress}</p>
        <p className='text-lg'>To change your email address, enter your new address below</p>

        <form method="post" onSubmit={changeEmail}>
        <div className="form-control">
            <label className="input-group">
                <span>New Email</span>
                <input type="email" name="email" autoComplete="email" required className="input input-bordered" />
            </label>
        </div>
        <button type="submit" className="btn btn-primary mt-10">Request email change</button>
        </form>

    </div>
    )
}