"use client";

import React, { useState } from 'react';
import ClientRevealTwo from './ClientRevealTwo';

const menuData = [
  // Předkrmy
  { id: 1, kategorie: 'Předkrmy', nazev: 'Topinka s vepřovou směsí', popis: 'Pikantní směs se sýrem na topince', cena: 119, alergeny: '1,7', gram: '50g' },
  { id: 2, kategorie: 'Předkrmy', nazev: 'Tatarský biftek', popis: 'Podávaný s 4 ks topinek', cena: 285, alergeny: '1,3,10', gram: '150g' },

  // Polévky
  { id: 3, kategorie: 'Polévky', nazev: 'Hovězí vývar', popis: 'S játrovými knedlíčky a nudlemi', cena: 55, alergeny: '1,3,9', gram: '0,33l' },
  { id: 4, kategorie: 'Polévky', nazev: 'Česnečka', popis: 'S vejcem a krutony', cena: 60, alergeny: '1,3', gram: '0,33l' },

  // Hlavní jídla
  { id: 5, kategorie: 'Hlavní jídla', nazev: 'Smažený kuřecí řízek', popis: 'S hranolky', cena: 125, alergeny: '1,3,7', gram: '75g + 100g' },
  { id: 6, kategorie: 'Hlavní jídla', nazev: 'Přírodní kuřecí řízek', popis: 'S hranolky', cena: 125, alergeny: '7', gram: '75g + 100g' },
  { id: 7, kategorie: 'Hlavní jídla', nazev: 'Smažený sýr', popis: 'S hranolky', cena: 125, alergeny: '1,3,7', gram: '50g + 100g' },
  { id: 8, kategorie: 'Hlavní jídla', nazev: 'Špagety se slaninou', popis: 'Rajčata, špenát, Gran Moravia', cena: 195, alergeny: '1,3,7', gram: '350g' },
  { id: 9, kategorie: 'Hlavní jídla', nazev: 'Špagety s kuřecím masem', popis: 'Nivová omáčka, kukuřice, pórek, bazalka', cena: 195, alergeny: '1,3,7', gram: '350g' },
  { id: 10, kategorie: 'Hlavní jídla', nazev: 'Gnocchi s panenkou', popis: 'V hříbkové omáčce', cena: 215, alergeny: '1,3,7', gram: '350g' },
  { id: 11, kategorie: 'Hlavní jídla', nazev: 'Smažený sýr', popis: '', cena: 139, alergeny: '1,3,7', gram: '100g' },
  { id: 12, kategorie: 'Hlavní jídla', nazev: 'Tvarůžky v těstíčku', popis: 'Se slaninou a salámem', cena: 189, alergeny: '1,3,7', gram: '130g' },
  { id: 13, kategorie: 'Hlavní jídla', nazev: 'Smažené tvarůžky', popis: 'Olomoucké tvarůžky', cena: 169, alergeny: '1,3,7', gram: '125g' },
  { id: 14, kategorie: 'Hlavní jídla', nazev: 'Grilovaná kuřecí prsa', popis: 'S nivovou omáčkou', cena: 189, alergeny: '7', gram: '150g' },
  { id: 15, kategorie: 'Hlavní jídla', nazev: 'Kuřecí Ondráš', popis: 'V bramboráku', cena: 189, alergeny: '1,3,7', gram: '150g' },
  { id: 16, kategorie: 'Hlavní jídla', nazev: 'Kuřecí kapsa', popis: 'Plněná šunkou a sýrem, smažená', cena: 189, alergeny: '1,3,7', gram: '150g' },
  { id: 17, kategorie: 'Hlavní jídla', nazev: 'Kotleta s játry', popis: 'Pikantní kuřecí játra s cibulkou', cena: 239, alergeny: '1', gram: '250g' },
  { id: 18, kategorie: 'Hlavní jídla', nazev: 'Vepřová kapsa', popis: 'Plněná šunkou a tvarůžky, smažená', cena: 189, alergeny: '1,3,7', gram: '150g' },
  { id: 19, kategorie: 'Hlavní jídla', nazev: 'Pikantní kuřecí směs', popis: '', cena: 195, alergeny: '', gram: '150g' },
  { id: 20, kategorie: 'Hlavní jídla', nazev: 'Kuřecí kapsa s nivou', popis: 'Grilovaná, plněná šunkou a nivou', cena: 189, alergeny: '7', gram: '150g' },
  { id: 21, kategorie: 'Hlavní jídla', nazev: 'Kuřecí medailonky', popis: 'S panenkou po provensálsku', cena: 239, alergeny: '', gram: '200g' },
  { id: 22, kategorie: 'Hlavní jídla', nazev: 'Katův šleh', popis: 'Pikantní vepřová směs', cena: 195, alergeny: '', gram: '150g' },
  { id: 23, kategorie: 'Hlavní jídla', nazev: 'Smažený řízek', popis: 'Kuřecí nebo vepřový', cena: 165, alergeny: '1,3,7', gram: '150g' },
  { id: 24, kategorie: 'Hlavní jídla', nazev: 'Řízek z krkovičky', popis: 'Smažený vepřový řízek', cena: 199, alergeny: '1,3,7', gram: '200g' },
  { id: 25, kategorie: 'Hlavní jídla', nazev: 'Vepřová panenka', popis: 'Grilovaná se slaninou', cena: 249, alergeny: '', gram: '200g' },
  { id: 26, kategorie: 'Hlavní jídla', nazev: 'Steak z krkovičky', popis: 'Na fazolových luskách', cena: 259, alergeny: '', gram: '250g' },
  { id: 27, kategorie: 'Hlavní jídla', nazev: 'Kuřecí steak', popis: 'Na smetanovo-žampionové omáčce', cena: 249, alergeny: '7', gram: '200g' },
  { id: 28, kategorie: 'Hlavní jídla', nazev: 'Kuřecí steak', popis: '', cena: 229, alergeny: '', gram: '200g' },
  { id: 29, kategorie: 'Hlavní jídla', nazev: 'Panenka na hříbkách', popis: 'Steak z panenky v hříbkové omáčce', cena: 249, alergeny: '7', gram: '200g' },
  { id: 30, kategorie: 'Hlavní jídla', nazev: 'Míchaný steak', popis: 'Panenka, kotleta, kuřecí prsa, slanina, dip', cena: 389, alergeny: '7,10', gram: '300g' },
  { id: 31, kategorie: 'Hlavní jídla', nazev: 'Losos na másle', popis: 'Grilovaný steak z lososa', cena: 259, alergeny: '4,7', gram: '200g' },
  { id: 32, kategorie: 'Hlavní jídla', nazev: 'Pstruh na bylinkách', popis: 'Dopočet ceny dle váhy 10g = 6 Kč', cena: 170, alergeny: '4', gram: '200g' },
  { id: 33, kategorie: 'Hlavní jídla', nazev: 'Candát na špenátu', popis: 'Filet na listovém špenátu', cena: 259, alergeny: '4', gram: '200g' },

  // Dezerty
  { id: 34, kategorie: 'Dezerty', nazev: 'Palačinka s ovocem', popis: 'Se šlehačkou a topingem', cena: 109, alergeny: '1,3,7', gram: '250g' },
  { id: 35, kategorie: 'Dezerty', nazev: 'Palačinka se zmrzlinou', popis: 'Ovoce, šlehačka, toping', cena: 139, alergeny: '1,3,7', gram: '350g' },
  { id: 36, kategorie: 'Dezerty', nazev: 'Domácí zákusek', popis: 'Dle denní nabídky', cena: 85, alergeny: '1,3,7,8', gram: '1 ks' },
  { id: 37, kategorie: 'Dezerty', nazev: 'Horké maliny', popis: 'S vanilkovou zmrzlinou a šlehačkou', cena: 110, alergeny: '7', gram: '200g' },
  { id: 38, kategorie: 'Dezerty', nazev: 'Ovocný pohár', popis: 'Se zmrzlinou a šlehačkou', cena: 95, alergeny: '7', gram: '200g' },

    // Nápoje
    { id: 39, kategorie: 'Nápoje', nazev: 'Voda neperlivá', popis: 'Chlazená neperlivá voda', cena: 35, alergeny: '', gram: '0,5l' },
    { id: 40, kategorie: 'Nápoje', nazev: 'Voda perlivá', popis: 'Chlazená perlivá voda', cena: 35, alergeny: '', gram: '0,5l' },
    { id: 41, kategorie: 'Nápoje', nazev: 'Coca-Cola', popis: 'Klasický sycený nápoj', cena: 45, alergeny: '', gram: '0,33l' },
    { id: 42, kategorie: 'Nápoje', nazev: 'Fanta', popis: 'Pomerančový sycený nápoj', cena: 45, alergeny: '', gram: '0,33l' },
    { id: 43, kategorie: 'Nápoje', nazev: 'Ledový čaj', popis: 'Chlazený ovocný ledový čaj', cena: 45, alergeny: '', gram: '0,4l' },
    { id: 44, kategorie: 'Nápoje', nazev: 'Espresso', popis: 'Malé silné espresso', cena: 45, alergeny: '', gram: '30ml' },
    { id: 45, kategorie: 'Nápoje', nazev: 'Cappuccino', popis: 'Espresso s mléčnou pěnou', cena: 55, alergeny: '7', gram: '150ml' },
    { id: 46, kategorie: 'Nápoje', nazev: 'Pilsner Urquell', popis: 'Točené pivo 12°', cena: 55, alergeny: '1', gram: '0,5l' },
];




const kategorieList = ['Předkrmy', 'Polévky', 'Hlavní jídla', 'Dezerty', 'Nápoje'];

const JidelniListek = () => {
  const [aktivniKategorie, setAktivniKategorie] = useState('Hlavní jídla');
  const filtrovanaJidla = menuData.filter((jidlo) => jidlo.kategorie === aktivniKategorie);

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

      <ClientRevealTwo selector=".jidlo-karta">
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {filtrovanaJidla.map((jidlo) => (
            <div key={jidlo.id} className="jidlo-karta">
              <div className="flex justify-between items-start">
                <p className="jidlo-nazev">{jidlo.nazev}</p>
                <p className="jidlo-cena">{jidlo.cena} Kč</p>
              </div>
              <p className="jidlo-popis">{jidlo.popis}</p>
              <div className="flex justify-between items-start text-[var(--gray)]/80 mt-4">
                <p className="text-sm">Alergeny: {jidlo.alergeny || '–'}</p>
                <p className="text-sm text-[var(--brown)]">{jidlo.gram}</p>
              </div>
            </div>
          ))}
        </div>
      </ClientRevealTwo>
    </div>
  );
};

export default JidelniListek;
