import React from "react";
import JidleniListek from "../components/JidleniListek";
import SeznamAlergenu from "../components/SeznamAlergenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Hostinec Na Nové",
  description:
    "Prohlédněte si aktuální menu Hostince Na Nové. Nabízíme tradiční českou kuchyni z kvalitních surovin – předkrmy, polévky, hlavní jídla, dezerty i nápoje.",
  keywords: [
    "jídelní lístek",
    "menu",
    "Hostinec Na Nové",
    "česká kuchyně",
    "tradiční jídla",
    "dezerty",
    "nápoje",
    "Olomouc",
    "Drahanovice",
    "restaurace",
    "alergeny",
    "předkrmy",
    "hlavní jídla",
  ],
  openGraph: {
    title: "Menu | Hostinec Na Nové",
    description:
      "Ochutnejte klasická česká jídla, připravovaná s láskou a respektem k tradici. Prohlédněte si kompletní jídelní lístek včetně informací o alergenech.",
    url: "https://drahanovice-hospoda.vercel.app/menu",
    siteName: "Hostinec Na Nové",
    images: [
      {
        url: "https://drahanovice-hospoda.vercel.app/images/og-menu.jpg", // Přizpůsob, pokud jiný název
        width: 1200,
        height: 630,
        alt: "Jídelní lístek Hostinec Na Nové",
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu | Hostinec Na Nové",
    description:
      "Prohlédněte si jídelní lístek Hostince Na Nové – tradiční česká jídla, dezerty a nápoje.",
    images: ["https://drahanovice-hospoda.vercel.app/images/og-menu.jpg"],
  },
  authors: [{ name: "Adam Zavadil" }],
  creator: "Adam Zavadil",
  publisher: "Hostinec Na Nové",
};


const Page = () => {
    return (
        <div>
            <div className='header-card-nav center-text'>
                <h1 className='header-card-nadpis'>Naše menu</h1>
                <h2 className='header-card-podnadpis'>Ochutnejte tradiční českou kuchyni připravenou podle osvědčených receptur z kvalitních surovin.</h2>
            </div>

            <div className='width-p-page'>
                <div className='center-text'>
                    <h3 className='text-nadpis'>Jídelní lístek</h3>
                    <p className='text-podnadpis'>Vyberte si z našich specialit</p>
                </div>
                <JidleniListek />
                <SeznamAlergenu />     
            </div>
        </div>
    )
}

export default Page;