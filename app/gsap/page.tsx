"use client"
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Page() {

    const box = useRef<HTMLDivElement|null>(null)


    useGSAP(()=>{
        gsap.to(box.current,{
            x:500,
            scrollTrigger: {
                trigger: box.current,
                markers: true,
                start: "top bottom",
            }
        })
    })



    return (
        <main className="w-screen h-1000">
        <div className='h-screen'></div>
        <div className="size-52 bg-red-500" ref={box}>

        </div>
        </main>
    );
}