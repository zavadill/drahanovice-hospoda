import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie | Hostinec Na Nové",
  description:
    "Prohlédněte si naši galerii fotografií – atmosféra hostince, tradiční pokrmy a akce, které jsme u nás pořádali.",
  keywords: [
    "galerie",
    "fotky",
    "Hostinec Na Nové",
    "fotografie",
    "akce",
    "svatby",
    "oslavy",
    "restaurace",
    "jídelna",
    "zahrádka",
  ],
  openGraph: {
    title: "Galerie | Hostinec Na Nové",
    description:
      "Fotogalerie hostince Na Nové – interiér, exteriér, pokrmy i společenské události. Nechte se nalákat.",
    url: "https://drahanovice-hospoda.vercel.app/galerie",
    siteName: "Hostinec Na Nové",
    images: [
      {
        url: "https://drahanovice-hospoda.vercel.app/images/og-galerie.jpg", // nahraď reálnou fotkou z galerie
        width: 1200,
        height: 630,
        alt: "Galerie hostince – interiér, jídla, akce",
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie | Hostinec Na Nové",
    description:
      "Prohlédněte si atmosféru našeho hostince a nahlédněte, jak to u nás vypadá.",
    images: ["https://drahanovice-hospoda.vercel.app/images/og-galerie.jpg"],
  },
  authors: [{ name: "Adam Zavadil" }],
  creator: "Adam Zavadil",
  publisher: "Hostinec Na Nové",
};


const page = () => {
  return (
    <div>
        <div className='header-card-nav center-text'>
            <h1 className='header-card-nadpis'>Galerie</h1>
            <h2 className='header-card-podnadpis'>Prohlédněte si fotografie našeho hostince, jídel a proběhlých akcí.</h2>
        </div>
        <div className='bg-[var(--white)]'>
          <div className='width-p-page'>

          </div>
        </div>  
    </div>
  )
}

export default page
