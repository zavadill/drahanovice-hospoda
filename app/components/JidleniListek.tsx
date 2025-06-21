"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const menuData = [
    { id: 1, kategorie: 'Předkrmy', nazev: 'Škvarková pomazánka', popis: 'Domácí škvarková pomazánka s chlebem a cibulí', cena: 85, alergeny: '1, 3' },
    { id: 2, kategorie: 'Předkrmy', nazev: 'Nakládaný hermelín', popis: 'Pikantní hermelín naložený v oleji, podávaný s chlebem', cena: 95, alergeny: '1, 7' },
    { id: 3, kategorie: 'Předkrmy', nazev: 'Tatarský biftek (100g)', popis: 'Míchaný z pravé hovězí svíčkové, 4 ks topinek', cena: 195, alergeny: '1, 3, 10' },
    { id: 4, kategorie: 'Předkrmy', nazev: 'Utopenec', popis: 'Tradiční špekáček v kyselém nálevu s cibulí', cena: 75, alergeny: '1' },
    { id: 5, kategorie: 'Polévky', nazev: 'Hovězí vývar', popis: 'Silný hovězí vývar s játrovými knedlíčky a nudlemi', cena: 75, alergeny: '1, 3, 9' },
    { id: 6, kategorie: 'Polévky', nazev: 'Česnečka', popis: 'Česneková polévka se sýrem, šunkou a chlebovými krutony', cena: 70, alergeny: '1, 3, 7' },
    { id: 7, kategorie: 'Polévky', nazev: 'Kulajda', popis: 'Jihočeská krémová polévka s houbami, koprem a zastřeným vejcem', cena: 80, alergeny: '1, 3, 7' },
    { id: 8, kategorie: 'Hlavní jídla', nazev: 'Svíčková na smetaně', popis: 'Hovězí pečeně na smetaně s houskovým knedlíkem a brusinkami', cena: 245, alergeny: '1, 3, 7, 9, 10' },
    { id: 9, kategorie: 'Hlavní jídla', nazev: 'Vepřo knedlo zelo', popis: 'Pečené vepřové maso, dušené zelí a houskový knedlík', cena: 225, alergeny: '1, 3' },
    { id: 10, kategorie: 'Hlavní jídla', nazev: 'Hovězí guláš', popis: 'Hovězí guláš s cibulí a majoránkou, podávaný s houskovým knedlíkem', cena: 235, alergeny: '1, 3' },
    { id: 11, kategorie: 'Hlavní jídla', nazev: 'Smažený sýr', popis: 'Smažený eidam (150g) s vařeným bramborem a naší tatarskou omáčkou', cena: 215, alergeny: '1, 3, 7, 10' },
    { id: 12, kategorie: 'Hlavní jídla', nazev: 'Pečená kachna', popis: 'Čtvrtka pečené kachny s červeným zelím a bramborovým knedlíkem', cena: 295, alergeny: '1, 3' },
    { id: 13, kategorie: 'Dezerty', nazev: 'Jablečný závin', popis: 'Domácí jablečný závin s vlašskými ořechy a šlehačkou', cena: 85, alergeny: '1, 3, 7, 8' },
    { id: 14, kategorie: 'Dezerty', nazev: 'Medovník', popis: 'Tradiční medový dort se zakysanou smetanou', cena: 95, alergeny: '1, 3, 7' },
    { id: 15, kategorie: 'Dezerty', nazev: 'Palačinky', popis: 'Dvě palačinky s horkým lesním ovocem, tvarohem a šlehačkou', cena: 115, alergeny: '1, 3, 7' },
    { id: 16, kategorie: 'Nápoje', nazev: 'Pivo 12° (0,5l)', popis: 'Čepované pivo z lokálního pivovaru', cena: 55, alergeny: '1' },
    { id: 17, kategorie: 'Nápoje', nazev: 'Kofola (0,5l)', popis: 'Čepovaná Kofola originál', cena: 50, alergeny: '' },
    { id: 18, kategorie: 'Nápoje', nazev: 'Domácí limonáda (0,5l)', popis: 'Podle denní nabídky (bezová, malinová, ...)', cena: 70, alergeny: '' },
];

const kategorieList = ['Předkrmy', 'Polévky', 'Hlavní jídla', 'Dezerty', 'Nápoje'];

const JidelniListek = () => {
    const [aktivniKategorie, setAktivniKategorie] = useState('Hlavní jídla');
    const filtrovanaJidla = menuData.filter(jidlo => jidlo.kategorie === aktivniKategorie);
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".jidlo-karta",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    }
                }
            );
        },
        { scope: containerRef, dependencies: [aktivniKategorie] }
    );

    return (
        <div className="py-20">
            <div className="flex flex-col justify-center md:flex-row">
                {kategorieList.map((kat) => (
                    <button
                        key={kat}
                        className={`button-menu ${aktivniKategorie === kat ? 'button-menu-active' : ''}`}
                        onClick={() => setAktivniKategorie(kat)}
                    >
                        {kat}
                    </button>
                ))}
            </div>

            <div ref={containerRef} className="m-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {filtrovanaJidla.map((jidlo) => (
                    <div key={jidlo.id} className="jidlo-karta">
                        <div className="flex justify-between items-start">
                            <p className="text-xl font-semibold text-[var(--black)]">{jidlo.nazev}</p>
                            <p className="text-xl font-semibold text-[var(--brown)]">{jidlo.cena} Kč</p>
                        </div>
                        <p className="mt-1 text-base text-[var(--gray)]">{jidlo.popis}</p>
                        <p className="text-sm text-[var(--gray)]/80 mt-4">Alergeny: {jidlo.alergeny}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JidelniListek;
