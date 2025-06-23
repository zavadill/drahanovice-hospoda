import React from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import CustomHeaderButtons from '../components/CustomHeaderButtons';
import MapWrapper from '../components/MapWrapper';

const page = () => {
  return (
    <div>
        <div className='header-card-nav center-text'>
            <h1 className='header-card-nadpis'>Kontakt</h1>
            <h2 className='header-card-podnadpis px-3'>Spojte se s námi a naplánujte si návštěvu nebo se zeptejte na cokoliv.</h2>
        </div>   
        <div className='bg-[var(--white)]'>
          <div className='width-p-page'>
            <div className='center-text'>
              <h3 className='text-nadpis'>Kontaktní údaje</h3>
              <p className='text-podnadpis'>Jsme vám k dispozici na těchto kontaktech</p>
            </div>
            <div className='py-20 flex flex-col gap-10'>
              <div className='max-w-2xl w-full mx-auto'>
                <p className='kontakt-nadpis'>Hostinec na Nové</p>
                <div className='w-auto'>
                  <div className='kontakt-podnadpis'>
                    <MapPin size={20} />
                    <p>Drahanovice 92, 783 43 Drahanovice</p>
                  </div>
                  <div className='kontakt-podnadpis'>
                    <Phone size={20} />
                    <a href="tel:+420585949482">+420 585 949 482</a>
                  </div>
                  <div className='kontakt-podnadpis'>
                    <Phone size={20} />
                    <a href="tel:+420776224953">+420 776 224 953</a>
                  </div>
                  <div className='kontakt-podnadpis'>
                    <Mail size={20} />
                    <a href="mailto:hostinecnanove@seznam.cz">hostinecnanove@seznam.cz</a>
                  </div>
                </div>
              </div>
              <div className='max-w-2xl w-full mx-auto'>
                <p className='kontakt-nadpis'>Otevírací doba</p>
                <div>
                  <div className='flex flex-row justify-between'>
                    <div className='kontakt-podnadpis'>
                      <div><Clock size={20} /></div>
                      <p>Pondělí</p>
                    </div>
                    <p className='text-base'>Zavřeno</p>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div className='kontakt-podnadpis'>
                      <div><Clock size={20} /></div>
                      <p>Úterý - Čtvrtek</p>
                    </div>
                    <p className='text-base'>11:00 - 21:00</p>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div className='kontakt-podnadpis'>
                      <div><Clock size={20} /></div>
                      <p>Pátek - Sobota</p>
                    </div>
                    <p className='text-base'>11:00 - 22:00</p>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div className='kontakt-podnadpis'>
                      <div><Clock size={20} /></div>
                      <p>Neděle</p>
                    </div>
                    <p className='text-base'>11:00 - 20:00</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-row space-x-5 max-w-2xl mx-auto w-full '>
                    <CustomHeaderButtons 
                        title='Zavolat nám'
                        href='tel:+420 585 949 482'
                        containerStyles='green-btn'
                    />
                    <CustomHeaderButtons 
                        title='Napsat e-mail'
                        href='mailto:hostinecnanove@seznam.cz'
                        containerStyles='white-btn'
                    />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-[var(--wheat)]'>
          <div className='width-p-page'>
            <div className='center-text pb-20 gap-2'>
              <h4 className='text-nadpis'>Jak nás najdete</h4>
              <h5 className='text-podnadpis'>Jsme v centru obce Drahanovice</h5>
            </div>
            <div>
              <MapWrapper />
            </div>
          </div>
        </div>
    </div>
  )
}

export default page
