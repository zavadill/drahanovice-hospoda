"use client";

import React, { useState } from 'react';
import ClientRevealTwo from './ClientRevealTwo';

const kategorieMap: Record<string, string> = {
  PREDKRMY: 'Předkrmy',
  POLEVKY: 'Polévky',
  HLAVNI_JIDLA: 'Hlavní jídla',
  DEZERTY: 'Dezerty',
  NAPOJE: 'Nápoje',
};

const kategorieList = ['Předkrmy', 'Polévky', 'Hlavní jídla', 'Dezerty', 'Nápoje'];

const DataMenu = ({ menuData }: { menuData: any[] }) => {
  const [aktivniKategorie, setAktivniKategorie] = useState('Hlavní jídla');

  // Přepis kategorií z ENUM hodnot na hezké názvy
  const upraveneMenuData = menuData.map((jidlo) => ({
    ...jidlo,
    kategorie: kategorieMap[jidlo.kategorie] || jidlo.kategorie,
  }));

  // Filtrování podle zvolené kategorie
  const filtrovanaJidla = upraveneMenuData.filter(
    (jidlo) => jidlo.kategorie === aktivniKategorie
  );

  return (
    <div className="py-20">
      <div className="flex flex-col justify-center md:flex-row flex-wrap gap-3 mb-10">
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

      <ClientRevealTwo selector=".jidlo-karta">
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {filtrovanaJidla.map((jidlo) => (
            <div
              key={jidlo.id}
              className="jidlo-karta flex flex-col justify-between h-full p-4 border border-[var(--gray)]/20 rounded-xl shadow-sm bg-white"
            >
              <div>
                <div className="flex justify-between items-start">
                  <p className="jidlo-nazev">{jidlo.nazev}</p>
                  <p className="jidlo-cena">{jidlo.cena} Kč</p>
                </div>
                <p className="jidlo-popis mt-2">{jidlo.popis}</p>
              </div>

              <div className="flex justify-between items-end text-[var(--gray)]/80 text-sm mt-6 pt-2 border-t border-[var(--gray)]/10">
                <p>Alergeny: {jidlo.alergeny || '–'}</p>
                <p className="text-[var(--brown)]">{jidlo.gram}</p>
              </div>
            </div>
          ))}
        </div>
      </ClientRevealTwo>
    </div>
  );
};

export default DataMenu;
