'use client';
import 'remixicon/fonts/remixicon.css'
import Link from 'next/link'

export default function Error() {
    return (
        <div className='py-20 ml-20 text-left'>
            <h2 className='text-4xl font-bold mb-10' >An error happened when you visit this page.</h2>
            
            <p className='text-3xl mb-10'>
                If you have not logged in, <Link href="/login" className='text-primary underline'>Log in here</Link>.
            </p>

            <Link href="/">
                <button className='btn btn-outline btn-ghost capitalize gap-2'>
                <i className="ri-arrow-left-s-line"></i> Return to Homepage
                </button>
            </Link>
        </div>
    )
}
