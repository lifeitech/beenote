import Link from 'next/link';
import Image from 'next/image';
import ProfileDrop from '@utils/ProfileDrop'
import Footer from '@utils/footer';
import styles from './page.module.css';

export default function Home() {
    return (
    <div className="flex flex-col relative">
    <div className="absolute top-5 right-5 z-50">
      <ProfileDrop />
    </div>
    <div className={`relative hero min-h-screen bg-base-200 ${styles.hero}`}>
      <div className="hero-content text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-base-100">BeeNote - Your Next Generation Language Notebook</h1>
          <p className="py-6 text-2xl text-base-100">Carry the world with you. Never worry about losing your notes.</p>
          
          <div className="flex justify-center space-x-4">
            <Link href='/login'><button className="btn btn-primary">Log In</button></Link>
            <Link href='/signup'><button className="btn btn-primary">Sign Up</button></Link>
        </div>
        </div>
      </div>
      {/* <div className='absolute bottom-0 z-10 h-28 w-full bg-gradient-to-t from-primary to-transparent'></div> */}
    </div>   
    <Footer/>
    </div>  
    )
}