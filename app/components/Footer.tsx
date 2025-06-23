import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Egg from './Egg';

const Footer = () => {
  return (
    <div className='bg-[var(--green)] text-[var(--wheat)]'>
      <div className='max-w-7xl mx-auto py-5'>
        <div className='flex flex-col md:flex-row'>
          <div className='footer-card'>
            <p className='footer-nadpis'>Hostinec na Nové</p>
            <p>Rodinná česká kuchyně v srdci Hané od roku 1762. Příjemné prostředí pro rodinné oslavy, svatby a firemní akce.</p>
          </div>
          <div className='footer-card'>
            <p className='footer-nadpis'>Kontakt</p>
            <div>
              <div className='footer-podnadpis'>
                <MapPin size={20} />
                <p>Drahanovice 92, 783 43 Drahanovice</p>
              </div>
              <div className='footer-podnadpis'>
                <Phone size={20} />
                <a href="tel:+420585949482">+420 585 949 482</a>
              </div>
              <div className='footer-podnadpis'>
                <Phone size={20} />
                <a href="tel:+420776224953">+420 776 224 953</a>
              </div>
              <div className='footer-podnadpis'>
                <Mail size={20} />
                <a href="mailto:hostinecnanove@seznam.cz">hostinecnanove@seznam.cz</a>
              </div>
            </div>
          </div>
          <div className='footer-card'>
            <p className='footer-nadpis'>Otevírací doba</p>
            <div>
              <div className='footer-podnadpis'>
                <Clock size={20} />
                <p>Út – Čt: 11:00 – 21:00</p>
              </div>
              <div className='footer-podnadpis'>
                <Clock  size={20} />
                <p>Pá – So: 11:00 – 22:00</p>
              </div>
              <div className='footer-podnadpis'>
                <Clock  size={20} />
                <p>Ne: 11:00 – 20:00</p>
              </div>
              <div className='footer-podnadpis'>
                <Clock  size={20} />
                <p>Po: Zavřeno</p>
              </div>
            </div>
          </div>
          <div className='footer-card'>
            <p className='footer-nadpis'>Odkazy</p>
            <div className='flex flex-col'>
              <Link className='footer-podnadpis-without' href="/">Domů</Link>
              <Link className='footer-podnadpis-without' href="/menu">Menu</Link>
              <Link className='footer-podnadpis-without' href="/galerie">Galerie</Link>
              <Link className='footer-podnadpis-without' href="/rezervace">Rezervace</Link>
            </div>
          </div>
        </div>
        <div className='center-text pt-5 border-t border-[var(--wheat)]'>
          <p className='text-sm'>© {new Date().getFullYear()} Hostinec na Nové. Všechna práva vyhrazena.</p>
        </div>
      </div>
      <Egg />
    </div>
  );
};

export default Footer;