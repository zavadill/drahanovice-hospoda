import React from 'react'

const historieData = [
  {
    rok: 1762,
    nadpis: "Založení hostince",
    popis:
      "Hostinec byl založen jako zastávka pro povozy směřující z Olomouce na jih Moravy.",
  },
  {
    rok: 1843,
    nadpis: "Rozšíření hostince",
    popis:
      "K původní budově byl přistavěn salonek pro pořádání společenských událostí.",
  },
  {
    rok: 1921,
    nadpis: "Rekonstrukce po válce",
    popis:
      "Po první světové válce byl hostinec kompletně rekonstruován a modernizován.",
  },
  {
    rok: 1968,
    nadpis: "Změna majitelů",
    popis:
      "Hostinec převzala rodina Novákových, která jej provozuje až dodnes.",
  },
  {
    rok: 2005,
    nadpis: "Modernizace interiéru",
    popis:
      "Kompletní rekonstrukce interiéru s důrazem na zachování historického rázu.",
  },
  {
    rok: 2018,
    nadpis: "Rozšíření zahrady",
    popis:
      "Vybudování nové venkovní zahrádky s dětským hřištěm a jezírkem.",
  },
];

const tymData = [
  {
    jmeno: "Jan Novák",
    pozice: "Šéfkuchař",
    popis:
      "S více než 20 lety zkušeností v gastronomii vede naši kuchyni s důrazem na tradiční české pokrmy.",
    obrazek: "", // můžeš sem doplnit URL obrázku
  },
  {
    jmeno: "Marie Černá",
    pozice: "Manažerka",
    popis:
      "Stará se o hladký chod hostince a zajišťuje, aby každý host byl maximálně spokojen.",
    obrazek: "",
  },
  {
    jmeno: "Pavel Dvořák",
    pozice: "Provozní",
    popis:
      "Zajišťuje bezproblémový provoz restaurace a stará se o organizaci všech akcí a událostí.",
    obrazek: "",
  },
  {
    jmeno: "Tomáš Malý",
    pozice: "Sommeliér",
    popis:
      "Odborník na vína a nápoje, který vám poradí s výběrem ideálního doplňku k vašemu jídlu.",
    obrazek: "",
  },
];



const page = () => {
  return (
    <div>
        <div className='header-card-nav center-text'>
            <h1 className='header-card-nadpis'>O nás</h1>
            <h2 className='header-card-podnadpis'>Poznejte historii a příběh Hostince na Nové, tradičního českého pohostinství s bohatou historií sahající až do roku 1762.</h2>
        </div>
        <div className='width-p-page'>
            <div className='center-text pb-20'>
              <h3 className='text-nadpis'>Naše historie</h3>
              <h4 className='text-podnadpis'>Seznamte se s bohatou historií našeho hostince</h4>
            </div>
            <div className='space-y-3 max-w-4xl mx-auto'>
              <p>Hostinec Na Nové je jedním z nejstarších hostinců v oblasti Hané. Jeho historie sahá až do roku 1762, kdy byl založen jako zastávka pro povozy směřující z Olomouce na jih Moravy. Od té doby prošel mnoha změnami, ale vždy si zachoval svou autentičnost a tradici.</p>
              <p>Zajímavostí je, že pod hostincem se nachází podzemní chodby, které kdysi sloužily jako únikové cesty v dobách válek a nepokojů. Část těchto chodeb je dodnes zachována a při zvláštních příležitostech je možné si je prohlédnout.</p>
              <p>I přes svou dlouhou historii zůstává Hostinec Na Nové místem, kde se tradice snoubí s moderními přístupy v gastronomii, a kde každý host najde příjemné prostředí pro odpočinek a kvalitní jídlo a pití.</p>
            </div>
            <div className='space-y-10 max-w-4xl mx-auto py-20'>
              {historieData.map((item, index) => (
                <div
                  key={index}
                  className='border-l-4 border-[var(--brown)] shadow-sm p-2 rounded-lg flex flex-row justify-between items-center'
                >
                  <div>
                    <p className='nase-nadpis'>{item.nadpis}</p>
                    <p className='nase-podnadpis'>{item.popis}</p>
                  </div>
                  <p className='w-12 min-w-12 min-h-12 text-sm text-[var(--white)] h-12 justify-center items-center flex mx-2 border-2 bg-[var(--brown)] rounded-full'>
                    {item.rok}
                  </p>
                </div>
              ))}
            </div>
        </div>
        <div className='bg-[var(--wheat)]'>
          <div className='width-p-page flex flex-col md:flex-row gap-5'>
            {tymData.map((clen, index) => (
              <div key={index} className='space-y-2 p-5 bg-[var(--white)] center-text rounded-lg shadow-sm'>
                <img className='mx-auto border-4 border-[var(--green)] rounded-full border-2 w-30 h-30 flex justify-center items-center' src={clen.obrazek} alt={clen.jmeno} />
                <p className='font-semibold text-xl'>{clen.jmeno}</p>
                <p className='text-[var(--green)]'>{clen.pozice}</p>
                <p className='mt-2 text-[var(--gray)] text-sm'>{clen.popis}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default page
