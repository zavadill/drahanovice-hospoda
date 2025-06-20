import React from 'react'
import CustomHeaderButtons from '../components/CustomHeaderButtons'

const page = () => {
  return (
    <div>
        <div className='header-card-nav center-text'>
            <h1 className='header-card-nadpis'>Prostory a akce</h1>
            <h2 className='header-card-podnadpis'>Kompletní zajištění svateb, rodinných oslav a firemních akcí na míru.</h2>
        </div>
        <div className='bg-[var(--white)]'>
          <div className='width-p-page'>
            <div className='center-text pb-20'>
              <h3 className='text-nadpis'>Svatební hostiny</h3>
              <p className='text-podnadpis'>Váš velký den si zaslouží dokonalý prostor a služby</p>
            </div>
            <div className='flex-col md:flex-row flex items-center gap-10'>
              <div className='space-y-5 flex-1/2'>
                <p>Hostinec Na Nové je ideálním místem pro uspořádání nezapomenutelné svatební hostiny. Náš velký salonek pojme až 50 hostů a nabízí příjemné prostředí s možností vlastní výzdoby dle vašich představ.</p>
                <p>V letních měsících můžete využít také naši prostornou zahradu, která je ideálním místem pro svatební fotografování nebo obřad pod širým nebem.</p>
                <p>Nabízíme komplexní služby včetně:</p>
                <div>
                  <ul className='space-y-2 pl-5 border-l-2'>
                    <li>Přípravy svatebního menu na míru</li>
                    <li>Výzdoby prostoru podle vašich přání</li>
                    <li>Zajištění svatebního dortu</li>
                    <li>Organizace celého dne</li>
                    <li>Možnosti ubytování pro hosty v blízkém okolí</li>
                  </ul>
                </div>
                <CustomHeaderButtons 
                  title='Nezávazná konzultace'
                  href=''
                  containerStyles='green-btn'
                />
              </div>
              <img className='flex-1/2 h-150 border-2 rounded-2xl' src="" alt="" />
            </div>
          </div>
        </div>
        <div className='bg-[var(--wheat)]'>
          <div className='width-p-page'>
            <div className='center-text pb-20'>
              <h4 className='text-nadpis'>Rodinné oslavy</h4>
              <p className='text-podnadpis'>Narozeniny, výročí nebo jen setkání s přáteli</p>
            </div>
            <div className='flex-col md:flex-row flex items-center gap-10'>
              <img className='flex-1/2 h-150 border-2 rounded-2xl' src="" alt="" />
              <div className='space-y-5 flex-1/2'>
                <p>Hostinec Na Nové je perfektním místem pro všechny typy rodinných oslav - od narozenin, přes oslavy výročí až po setkání s přáteli či rodinou.</p>
                <p>V závislosti na velikosti vaší společnosti můžete využít:</p>
                <ul className='space-y-2 pl-5 border-l-2'>
                  <li>Malý salonek (až 20 osob) - ideální pro menší oslavy</li>
                  <li>Velký salonek (až 50 osob) - vhodný pro větší společnost</li>
                  <li>Letní zahrádka (až 70 osob) - skvělá volba pro letní oslavy</li>
                </ul>
                <p>Pro vaši oslavu můžeme připravit:</p>
                <ul className='space-y-2 pl-5 border-l-2'>
                  <li>Slavnostní menu podle vašich představ</li>
                  <li>Rautové občerstvení</li>
                  <li>Narozeninový dort</li>
                  <li>Speciální výzdobu</li>
                </ul>
                <CustomHeaderButtons 
                  title='Rezervovat termín'
                  href=''
                  containerStyles='green-btn'
                />
              </div>
            </div>
          </div>
        </div> 
        <div className='bg-[var(--white)]'>
          <div className='width-p-page'>
            <div className='center-text pb-20'>
              <h5>Firemní akce</h5>
              <p>Teambuildingy, školení, firemní večírky</p>
            </div>
            <div className='space-y-10 flex flex-col'>
              <p className='max-w-2xl mx-auto center-text'>Hostinec Na Nové nabízí ideální prostory pro pořádání různých typů firemních akcí - od pracovních obědů a školení, přes teambuildingy až po firemní večírky a oslavy.</p>
              <div className='flex flex-col md:flex-row gap-10'>
                <div className='p-5 border-t-4 border-[var(--brown)] rounded-xl flex-1/3 space-y-2 shadow-sm'>
                  <img src="" alt="" className='h-50 w-full rounded-xl' />
                  <p className='nase-nadpis'>Pracovní obědy a večeře</p>
                  <p className='nase-podnadpis'>Klidné prostředí pro obchodní jednání s partnerem či klientem při kvalitním jídle a pití.</p>
                </div>
                <div className='p-5 border-t-4 border-[var(--brown)] rounded-xl flex-1/3 space-y-2 shadow-sm'>
                  <img src="" alt="" className='h-50 w-full rounded-xl' />
                  <p className='nase-nadpis'>Pracovní obědy a večeře</p>
                  <p className='nase-podnadpis'>Klidné prostředí pro obchodní jednání s partnerem či klientem při kvalitním jídle a pití.</p>
                </div>
                <div className='p-5 border-t-4 border-[var(--brown)] rounded-xl flex-1/3 space-y-2 shadow-sm'>
                  <img src="" alt="" className='h-50 w-full rounded-xl' />
                  <p className='nase-nadpis'>Pracovní obědy a večeře</p>
                  <p className='nase-podnadpis'>Klidné prostředí pro obchodní jednání s partnerem či klientem při kvalitním jídle a pití.</p>
                </div>
              </div>
              <CustomHeaderButtons 
                  title='Nezávazná poptávka'
                  href=''
                  containerStyles='green-btn mx-auto'
                />
            </div>
          </div>
        </div>
        <div className='bg-[var(--wheat)]'>
          <div className='width-p-page'>
            <div className='center-text pb-20'>
              <h6 className='text-nadpis'>Ceník akcí</h6>
              <p className='text-podnadpis'>Transparentní cenová politika bez skrytých poplatků</p>
            </div>
            <div className="overflow-x-auto p-5 md:p-10 bg-[var(--white)] rounded-xl shadow-sm">
              <table className="min-w-full text-left border-separate border-spacing-y-3">
                <thead className="text-base font-semibold text-[var(--black)]">
                  <tr className='border-2 border-black'>
                    <th className="pb-3">Typ akce</th>
                    <th className="pb-3">Malý salonek</th>
                    <th className="pb-3">Velký salonek</th>
                    <th className="pb-3">Zahrádka</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--gray)] text-sm">
                  <tr className="">
                    <td className="py-3">
                      <div className="font-semibold text-[var(--black)]">Pronájem prostoru</div>
                      <div className="text-xs">Pro soukromé akce</div>
                    </td>
                    <td className="py-3">2 000 Kč / den</td>
                    <td className="py-3">3 500 Kč / den</td>
                    <td className="py-3">4 000 Kč / den</td>
                  </tr>
                  <tr className="">
                    <td className="py-3">
                      <div className="font-semibold text-[var(--black)]">Svatební hostina</div>
                      <div className="text-xs">Kompletní zajištění včetně výzdoby</div>
                    </td>
                    <td className="py-3">od 790 Kč / osoba</td>
                    <td className="py-3">od 790 Kč / osoba</td>
                    <td className="py-3">od 890 Kč / osoba</td>
                  </tr>
                  <tr className="">
                    <td className="py-3">
                      <div className="font-semibold text-[var(--black)]">Rodinná oslava</div>
                      <div className="text-xs">Menu dle dohody</div>
                    </td>
                    <td className="py-3">od 590 Kč / osoba</td>
                    <td className="py-3">od 590 Kč / osoba</td>
                    <td className="py-3">od 650 Kč / osoba</td>
                  </tr>
                  <tr className="">
                    <td className="py-3">
                      <div className="font-semibold text-[var(--black)]">Firemní večírek</div>
                      <div className="text-xs">Rautové občerstvení</div>
                    </td>
                    <td className="py-3">od 650 Kč / osoba</td>
                    <td className="py-3">od 650 Kč / osoba</td>
                    <td className="py-3">od 750 Kč / osoba</td>
                  </tr>
                  <tr className="">
                    <td className="py-3">
                      <div className="font-semibold text-[var(--black)]">Raut</div>
                      <div className="text-xs">Studený a teplý bufet</div>
                    </td>
                    <td className="py-3">od 450 Kč / osoba</td>
                    <td className="py-3">od 450 Kč / osoba</td>
                    <td className="py-3">od 500 Kč / osoba</td>
                  </tr>
                </tbody>
              </table>
              <div className='text-xs text-[var(--gray)]'>
                <p>* Uvedené ceny jsou orientační a mohou se lišit v závislosti na konkrétních požadavcích.</p>
                <p>* Při konzumaci nad 20 000 Kč je pronájem prostoru zdarma.</p>
                <p>* Ceny nezahrnují nápoje, ty jsou účtovány separátně dle aktuálního ceníku.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-[var(--brown)]'>
          <div className='width-p-page space-y-10 center-text'>
            <p className='kontaktuje-nadpis'>Rezervace a poptávky</p>
            <p className='max-w-2xl mx-auto kontaktuje-podnadpis'>Máte zájem o uspořádání akce v našem hostinci? Kontaktujte nás pro nezávaznou konzultaci a rezervaci termínu.</p>
            <div className='flex flex-row justify-center gap-5'>
              <CustomHeaderButtons 
                      title='+420 585 949 482'
                      href='/kontakt'
                      containerStyles='brown-btn'
              />
              <CustomHeaderButtons 
                      title='Kontaktní formulář'
                      href='/kontakt'
                      containerStyles='brown-white-btn'
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default page
