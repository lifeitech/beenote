'use client';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@utils/Logo';

export default function LogIn() {

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const email = data.get('email')!.toString();
  const password = data.get('password')!.toString();

  const client = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE);

  const res = await client.collection('users').authWithPassword(email, password);

  document.cookie = client.authStore.exportToCookie({ httpOnly: false });

  router.push('/u');
  };

  return (
    <div className="min-h-screen">

    <div className="flex justify-center pt-32">
    <Link href="/"><button className="btn btn-ghost text-3xl capitalize gap-1"><Logo size={40}/> BeeNote</button></Link>
    </div>

    <div className="flex justify-center mt-10"> 
    <form action="#" method="POST" onSubmit={handleSubmit}>
      <div className="form-control w-full max-w-xs">
        <label className="label"><span className="label-text">Email</span></label>
        <input 
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          required
          className="input input-bordered w-full max-w-xs" />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label"><span className="label-text">Password</span></label>
        <input 
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          required 
          className="input input-bordered w-full max-w-xs" />
          <label className="label">
          <span className='label-text-alt'></span>
          <span className='label-text-alt'><Link href="/reset" className="link link-info">Forgot Password?</Link></span>
          </label>
      </div>

      <button type="submit" className="btn btn-primary btn-wide mt-4">Log In</button>
      </form>
    </div>

    <div className="flex justify-center mt-10 mb-10">
      <Link href="/signup" className="link link-info">Don&apos;t have an account? Sign up here</Link>
    </div>

    </div>
    );
}