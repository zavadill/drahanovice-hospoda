import React from 'react'
import Image from 'next/image'
import CustomHeaderButtons from './CustomHeaderButtons'

const Header = () => {
  return (
    <section className="relative min-h-screen max-h-screen max-w-screen flex items-center justify-center">
      <Image
        src="/images/header-pozadi.webp"
        alt="Interiér restaurace Hostinec na Nové"
        fill
        priority
        quality={90}
        className="object-cover object-center -z-10"
      />

      <header className="width-page text-center space-y-5 text-[var(--white)]">
        <h1
          className="text-4xl md:text-7xl font-[family-name:var(--font-playfair)]"
        >
          Hostinec na Nové
        </h1>
        <p className="text-xl md:text-2xl">
          Rodinná česká kuchyně v srdci Hané od roku 1762
        </p>
        <div className="flex flex-row space-x-5 justify-center">
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
