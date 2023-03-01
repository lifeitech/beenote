import Link from 'next/link';
import Image from 'next/image';
import ProfileDrop from '@utils/ProfileDrop'
import Footer from '@utils/footer';
import styles from './page.module.css';
// fixed top-2 right-5 z-50
// style={{ backgroundImage: `url("/florence.jpg")` }}

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
      <div className='absolute bottom-0 z-10 h-28 w-full bg-gradient-to-t from-base-200 to-transparent'></div>
    </div>   

    <div className="hero h-auto py-40 bg-base-200">
      <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
        <Image width={300} height={300} src="/sample.png" alt='app illustration' className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-4xl font-bold">Taking language notes has never been easier</h1>
          <p className="py-6 text-xl">No hustle. Just focus on your language learning.</p>
          <Link href='/signup'><button className="btn btn-primary">Get Started</button></Link>
        </div>
      </div>
    </div>

    <div className="hero h-auto py-32 bg-base-200">
      <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Create an account today</h1>
          <p className="py-6 text-xl">It is free, forever.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" placeholder="email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="text" placeholder="password" className="input input-bordered" />
            </div>
            <div className="form-control mt-6">
              <Link href="/signup"><button className="btn btn-primary btn-block">Sign Up</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </div>  
    )
}



{/* <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
</div> */}