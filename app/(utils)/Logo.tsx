'use client';
import { useTheme } from "./Theme";
import Image from "next/image";

export default function Logo({size}:{size:number}) {
    const theme = useTheme();
    if (theme == 'bubblebee') {
        return <Image src="/logo-light.svg" width={size} height={size} alt="logo"/>
    } else {
        return <Image src="/logo-dark.svg" width={size} height={size} alt="logo"/>
    }
    
}