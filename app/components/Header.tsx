import React from 'react'
import Image from 'next/image'
import CustomHeaderButtons from './CustomHeaderButtons'

const Header = () => {
  return (
    <section className="relative w-full h-screen max-h-[1000px] overflow-hidden">
      <Image
        src="/images/header-pozadi.webp"
        alt="Interiér restaurace Hostinec na Nové"
        fill
        priority
        quality={90}
        className="object-cover object-center -z-10"
      />

      <header className="relative z-10 text-center text-white px-4 h-full flex flex-col justify-center items-center space-y-5">
        <h1 className="text-4xl md:text-7xl font-[family-name:var(--font-playfair)]">
          Hostinec na Nové
        </h1>
        <p className="text-xl md:text-2xl">
          Rodinná česká kuchyně v srdci Hané od roku 1762
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <CustomHeaderButtons
            title="Prohlédnout menu"
            href="/menu"
            containerStyles="green-btn"
          />
          <CustomHeaderButtons
            title="Kde nás najdete"
            href="/kontakt"
            containerStyles="white-btn"
          />
        </div>
      </header>
    </section>
  )
}

export default Header
