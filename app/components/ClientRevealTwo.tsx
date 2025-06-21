"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ClientRevealTwoProps {
  selector: string; // CSS selector pro elementy, na které se animace aplikuje
  children: React.ReactNode;
}

const ClientRevealTwo: React.FC<ClientRevealTwoProps> = ({ selector, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(selector);
      if (!elements) return;

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              // markers: true, // Odkomentuj pro debugování pozic
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [selector]);

  return <div ref={containerRef}>{children}</div>;
};

export default ClientRevealTwo;
