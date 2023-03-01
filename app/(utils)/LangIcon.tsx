import Image from "next/image"

export default function LangIcon({lang, size=50}:{lang:string, size:number}) {
    return <Image src={`/${lang}.png`} width={size} height={size} className="rounded-full" alt={`icon (country flag) for ${lang} language`}/>
}