'use client';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Logo from '@utils/Logo';

const validateEmail = (email:string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const validatePass = (password:string) => {
  return password.length >= 8;
}


export default function SignUp() {
  const [email, setEmail] = useState({text:'', valid:false});
  const [password, setPassword] = useState({text:'', valid:false});
  const [confirm, setConfirm] = useState({text:'', valid:false});

  const handleEmail = (input:string) => {
    setEmail({text:input, valid:validateEmail(input)});
  }

  const handlePassword = (input:string) => {
    setPassword({text: input, valid: validatePass(input)});
    setConfirm({...confirm, valid: confirm.valid && input == confirm.text })
  }

  const handleConfirm = (input:string) => {
    setConfirm({text: input, valid: password.valid && input == password.text});
  }

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE);
    try {
      const res = await pb.collection('users').create({
        email: data.get('email'),
        password: data.get('password'),
        passwordConfirm: data.get('password-confirm'),
        name: data.get('profilename')
    });
    toast.success('Successfully created a new account. Log in now.', {duration:5000})
    pb.authStore.clear();
    router.push('/login')

    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">

    <div className="flex justify-center pt-32">
    <Link href="/"><button className="btn btn-ghost text-3xl capitalize gap-1"><Logo size={40}/> BeeNote</button></Link>
    </div>

    <div className="flex justify-center mt-10">
    <form action="#" method="POST" onSubmit={handleSubmit}>

      <div className="form-control w-full max-w-xs">
        <label className="label"><span className="label-text">Name</span></label>
        <input 
          id="profilename"
          name="profilename"
          type="text"
          autoComplete="name"
          placeholder="Profile Name"
          required
          className="input input-bordered w-full max-w-xs" />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label"><span className="label-text">Email*</span></label>
        <div className="flex items-center gap-2">
        <input 
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          required
          className="input input-bordered w-full max-w-xs flex-none"
          value={email.text}
          onChange={(e)=>handleEmail(e.target.value)} />
        {email.valid ? <span className="text-green-500"><i className="ri-checkbox-circle-fill"></i></span> : <></> }
        </div>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label"><span className="label-text">Password*</span></label>
        <div className="flex items-center gap-2">
        <input 
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          required 
          className={`input input-bordered ${password.valid ? '' : 'input-error'} w-full max-w-xs flex-none`}
          value={password.text}
          onChange={(e)=>handlePassword(e.target.value)} />
        {password.valid ? <span className="text-green-500"><i className="ri-checkbox-circle-fill"></i></span> : <div className="tooltip tooltip-open tooltip-right" data-tip="at least 8 characters"></div> }
        </div>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label"><span className="label-text">Confirm Password*</span></label>
        <div className="flex items-center gap-2">
        <input 
          id="password-confirm"
          name="password-confirm"
          type="password"
          autoComplete="current-password"
          placeholder="Confirm Password"
          required 
          className={`input input-bordered ${confirm.valid ? '' : 'input-error'} w-full max-w-xs flex-none`}
          value={confirm.text}
          onChange={(e)=>handleConfirm(e.target.value)} />
        {confirm.valid ? <span className="text-green-500"><i className="ri-checkbox-circle-fill"></i></span> : <></> }
        </div>
      </div>

      <button type="submit" disabled={!confirm.valid} className="btn btn-primary btn-wide mt-4">Sign Up</button>
      </form>
    </div>

    <div className="flex justify-center mt-10 mb-10"><Link href="/login" className="link link-info">Already have an account? Log in here</Link></div>
    </div>
    );
}