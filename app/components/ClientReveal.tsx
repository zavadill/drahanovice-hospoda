// components/ClientReveal.tsx
"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

interface ClientRevealProps {
  children: React.ReactNode;
}

export default function ClientReveal({ children }: ClientRevealProps) {
  useEffect(() => {
    gsap.fromTo(
      "body > *", // nebo nějaký vhodný selector, který pokryje celý layout (třeba id root atp.)
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.2 }
    );
  }, []);

  return <>{children}</>;
}
