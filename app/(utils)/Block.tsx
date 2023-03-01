import Link from "next/link"

export default function Block({link, children}: any) {
    return (
      <div className="relative">
      <Link href={link}>
      <div className="absolute w-56 h-56 rounded-lg -right-4 -bottom-4  bg-accent z-0">
      </div>
      <div className="relative flex items-center justify-center box-border w-56 h-56 border-4 rounded-lg border-slate-800 bg-primary z-10 active:translate-x-1 active:translate-y-1">
          <div className="text-3xl font-bold text-center">
            {children}
          </div>
      </div>
      </Link>
  </div>
    )
}

