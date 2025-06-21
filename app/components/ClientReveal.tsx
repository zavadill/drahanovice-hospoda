'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type ClientRevealProps = {
  children: React.ReactNode;
  selector: string; // např. ".card-speciality"
};

export default function ClientReveal({ children, selector }: ClientRevealProps) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      selector,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: containerRef });

  return <div ref={containerRef}>{children}</div>;
}
