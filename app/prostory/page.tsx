import React from 'react'
import CustomHeaderButtons from '../components/CustomHeaderButtons'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prostory | Hostinec Na Nové",
  description:
    "Objevte všechny prostory Hostince Na Nové – hlavní restauraci, salonky a letní zahrádku. Ideální pro rodinné oslavy, svatby, firemní večírky i běžné posezení.",
  keywords: [
    "Prostory",
    "Hostinec Na Nové",
    "restaurace",
    "salonek",
    "zahrádka",
    "oslavy",
    "svatby",
    "firemní akce",
    "dětské hřiště",
    "venkovní posezení",
    "rezervace prostor",
    "Drahanovice",
  ],
  openGraph: {
    title: "Prostory | Hostinec Na Nové",
    description:
      "Hostinec Na Nové nabízí útulné prostory pro každou příležitost – od hlavní restaurace přes soukromé salonky až po letní zahrádku s dětským hřištěm.",
    url: "https://drahanovice-hospoda.vercel.app/prostory",
    siteName: "Hostinec Na Nové",
    images: [
      {
        url: "https://drahanovice-hospoda.vercel.app/images/og-prostory.jpg", // Nahraď fotkou interiéru/zahrádky
        width: 1200,
        height: 630,
        alt: "Interiér a prostory Hostince Na Nové",
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prostory | Hostinec Na Nové",
    description:
      "Poznejte všechny naše prostory – restauraci, salonky i letní zahrádku s dětským koutkem. Skvělé místo pro každou příležitost.",
    images: ["https://drahanovice-hospoda.vercel.app/images/og-prostory.jpg"],
  },
  authors: [{ name: "Adam Zavadil" }],
  creator: "Adam Zavadil",
  publisher: "Hostinec Na Nové",
};


const page = () => {
  return (
    <div>
        <div className='header-card-nav center-text'>
            <h1 className='header-card-nadpis'>Prostory</h1>
            <h2 className='header-card-podnadpis'>Poznejte všechny prostory našeho hostince, které jsou ideální pro každou příležitost.</h2>
        </div>
        <div className='bg-[var(--white)]'>
          <div className='width-p-page'>
            <div className='center-text pb-20'>
              <h3 className='text-nadpis'>Hlavní restaurace</h3>
              <p className='text-podnadpis'>Kapacita až 50 osob</p>
            </div>
            <div className='flex flex-col md:flex-row items-center gap-10'>
              <div className='flex-1/2 space-y-5'>
                <p>Hlavní prostor restaurace nabízí příjemné a útulné prostředí s kapacitou až 50 míst. Interiér je zařízen v tradičním venkovském stylu s dřevěnými prvky, které navozují domácí atmosféru.</p>
                <p>Restaurace je ideální pro běžnou návštěvu a stravování, ale také pro menší rodinné oslavy či firemní obědy. Prostor je plně klimatizovaný a nabízí výhled na naši krásnou zahradu.</p>
                <p>V hlavní restauraci vám nabízíme kompletní menu včetně denní nabídky obědů od úterý do neděle.</p>
              </div>
              <img className='flex-1/2 rounded-2xl border h-100' src="" alt="" />
            </div>
          </div>
        </div>
        <div className='bg-[var(--wheat)]'>
          <div className='width-p-page'>
            <div className='center-text'>
              <h4 className='text-nadpis'>Salonky</h4>
              <p className='text-podnadpis pb-20'>Malý salonek (20 osob) a velký salonek (50 osob)</p>
            </div>
            <div className='gap-10 flex flex-col md:flex-row items-center'>
              <img className='flex-1/2 h-100 border rounded-2xl' src="" alt="" />
              <div className='space-y-5 flex-1/2'>
                <p>Pro soukromé akce nabízíme dva samostatné salonky s různou kapacitou:</p>
                <ul className='space-y-2 pl-5 border-l-2'>
                  <li>Malý salonek s kapacitou až 20 osob je ideální pro menší rodinné oslavy, menší firemní setkání nebo pracovní obědy.</li>
                  <li>Velký salonek pro až 50 osob je vhodný pro větší oslavy, svatební hostiny, firemní večírky nebo prezentace.</li>
                </ul>
                <p>Oba salonky nabízejí soukromí a mohou být upraveny podle vašich představ a požadavků. K dispozici je vlastní sociální zařízení a možnost samostatného ozvučení.</p>
                <p>Salonky je nutné rezervovat předem, ideálně několik týdnů před plánovanou akcí.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-[var(--white)]'>
          <div className='width-p-page'>
            <div className='center-text'>
              <h4 className='text-nadpis'>Letní zahrádka</h4>
              <p className='text-podnadpis pb-20'>Kapacita až 70 osob</p>
            </div>
            <div className='gap-10 flex flex-col md:flex-row items-center'>
              <div className='space-y-5 flex-1/2'>
                <p>Naše prostorná letní zahrádka s kapacitou až 70 osob je otevřena od jara do podzimu (v závislosti na počasí) a nabízí příjemné posezení ve stínu vzrostlých stromů.</p>
                <p>Součástí zahrady je také:</p>
                <ul className='space-y-2 pl-5 border-l-2'>
                  <li>Dětské hřiště s houpačkami, skluzavkou a pískovištěm</li>
                  <li>Okrasné jezírko s rybkami</li>
                  <li>Krytá pergola pro posezení i za méně příznivého počasí</li>
                </ul>
                <p>Zahrádka je ideálním místem pro rodiny s dětmi, letní rodinné oslavy nebo jen příjemné posezení s přáteli u dobrého jídla a pití.</p>
              </div>
              <img className='flex-1/2 h-100 border rounded-2xl' src="" alt="" />
            </div>
          </div>
        </div>
        <div className='bg-[var(--brown)]'>
          <div className='width-p-page space-y-10 center-text'>
            <h5 className='kontaktuje-nadpis'>Rezervace prostorů</h5>
            <p className='max-w-2xl mx-auto kontaktuje-podnadpis'>Máte zájem o rezervaci některého z našich prostorů pro vaši akci? Neváhejte nás kontaktovat telefonicky nebo pomocí rezervačního formuláře.</p>
            <div className='flex flex-row justify-center gap-5'>
              <CustomHeaderButtons 
                      title='Zavolat'
                      href='/kontakt'
                      containerStyles='brown-btn'
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default page
