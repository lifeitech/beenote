'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import getclient from '@utils/pb-client';
import { useRouter } from 'next/navigation';
import { useTheme, useToggleTheme } from './Theme';
import 'remixicon/fonts/remixicon.css'

export default function ProfileDrop ({drop='dropdown-end'}) {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const router = useRouter();
  const pb = getclient();
  const [loggedin, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [avatarFilename, setAvatarFilename] = useState('');

  useEffect(() => {
    if (pb.authStore.isValid) {
      setLoggedIn(true);
      setUserId(pb.authStore.model.id);
      setAvatarFilename(pb.authStore.model.avatar);
    }
  }, [])

  const logout = () => {
    pb.authStore.clear();
    setLoggedIn(false);
    router.push('/');
  }

  return (
    <>
    {loggedin?
    <div className={`dropdown ${drop}`}>
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="rounded-full">
            <Image src={`${process.env.NEXT_PUBLIC_POCKETBASE}/api/files/users/${userId}/${avatarFilename}`} width={40} height={40} alt="user avatar" />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-48">
          <li><Link href='/u'><i className="ri-booklet-line"></i>Notebooks</Link></li>
          <li><Link href='/profile'><i className="ri-user-line"></i>Profile</Link></li>
          <li><Link href='/'><i className="ri-home-line"></i>Home</Link></li>
          <li><span onClick={()=>toggleTheme(theme)} className="text-blue-600"><i className="ri-moon-clear-line"></i>Change Theme</span></li> 
          <li><span onClick={()=>logout()} className="text-red-500"><i className="ri-logout-box-line"></i>Logout</span></li>
        </ul>
      </div> : null}
      </>
    )
}
