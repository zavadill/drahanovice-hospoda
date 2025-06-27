import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const menuData = [
  // Předkrmy
  { id: 1, kategorie: "PREDKRMY", nazev: 'Topinka s vepřovou směsí', popis: 'Pikantní směs se sýrem na topince', cena: 119, alergeny: '1,7', gram: '50g' },
  { id: 2, kategorie: "PREDKRMY", nazev: 'Tatarský biftek', popis: 'Podávaný se 4 ks topinek', cena: 285, alergeny: '1,3,10', gram: '150g' },

  // Polévky
  { id: 3, kategorie: "POLEVKY", nazev: 'Hovězí vývar', popis: 'S játrovými knedlíčky a nudlemi', cena: 55, alergeny: '1,3,9', gram: '0,33l' },
  { id: 4, kategorie: "POLEVKY", nazev: 'Česnečka', popis: 'Se šunkou, sýrem, vejcem a krutony', cena: 60, alergeny: '1,3,7', gram: '0,33l' },

  // Hlavní jídla
  { id: 5, kategorie: "HLAVNI_JIDLA", nazev: 'Smažený sýr', popis: 'Eidam 30%', cena: 139, alergeny: '1,3,7', gram: '100g' },
  { id: 6, kategorie: "HLAVNI_JIDLA", nazev: 'Smažené tvarůžky', popis: 'Olomoucké tvarůžky', cena: 169, alergeny: '1,3,7', gram: '125g' },
  { id: 7, kategorie: "HLAVNI_JIDLA", nazev: 'Tvarůžky v těstíčku', popis: 'Se slaninou a salámem', cena: 189, alergeny: '1,3,7', gram: '130g' },
  { id: 8, kategorie: "HLAVNI_JIDLA", nazev: 'Smažený kuřecí řízek', popis: 'Kuřecí prsní řízek', cena: 165, alergeny: '1,3,7', gram: '150g' },
  { id: 9, kategorie: "HLAVNI_JIDLA", nazev: 'Smažený vepřový řízek', popis: 'Řízek z vepřové krkovičky', cena: 199, alergeny: '1,3,7', gram: '200g' },
  { id: 10, kategorie: "HLAVNI_JIDLA", nazev: 'Kuřecí Ondráš', popis: 'Kuřecí řízek v bramborákovém těstě', cena: 189, alergeny: '1,3,7', gram: '150g' },
  { id: 11, kategorie: "HLAVNI_JIDLA", nazev: 'Kuřecí kapsa smažená', popis: 'Plněná šunkou a sýrem', cena: 189, alergeny: '1,3,7', gram: '150g' },
  { id: 12, kategorie: "HLAVNI_JIDLA", nazev: 'Vepřová kapsa smažená', popis: 'Plněná šunkou a tvarůžky', cena: 189, alergeny: '1,3,7', gram: '150g' },
  { id: 13, kategorie: "HLAVNI_JIDLA", nazev: 'Grilovaná kuřecí prsa', popis: 'S nivovou omáčkou', cena: 189, alergeny: '7', gram: '150g' },
  { id: 14, kategorie: "HLAVNI_JIDLA", nazev: 'Kuřecí kapsa s nivou', popis: 'Grilovaná, plněná šunkou a nivou', cena: 189, alergeny: '7', gram: '150g' },
  { id: 15, kategorie: "HLAVNI_JIDLA", nazev: 'Katův šleh', popis: 'Pikantní vepřová směs se zeleninou', cena: 195, alergeny: '', gram: '150g' },
  { id: 16, kategorie: "HLAVNI_JIDLA", nazev: 'Pikantní kuřecí směs', popis: 'Kousky masa se zeleninou v pikantní omáčce', cena: 195, alergeny: '', gram: '150g' },
  { id: 17, kategorie: "HLAVNI_JIDLA", nazev: 'Kotleta s játry', popis: 'Vepřová kotleta s pikantními kuřecími játry a cibulkou', cena: 239, alergeny: '1', gram: '250g' },
  { id: 18, kategorie: "HLAVNI_JIDLA", nazev: 'Kuřecí steak', popis: 'Grilovaný kuřecí steak', cena: 229, alergeny: '', gram: '200g' },
  { id: 19, kategorie: "HLAVNI_JIDLA", nazev: 'Kuřecí steak na žampionech', popis: 'Na smetanovo-žampionové omáčce', cena: 249, alergeny: '7', gram: '200g' },
  { id: 20, kategorie: "HLAVNI_JIDLA", nazev: 'Vepřová panenka', popis: 'Grilovaná panenka se slaninou', cena: 249, alergeny: '', gram: '200g' },
  { id: 21, kategorie: "HLAVNI_JIDLA", nazev: 'Vepřová panenka na hříbkách', popis: 'Steak z panenky v hříbkové omáčce', cena: 249, alergeny: '7', gram: '200g' },
  { id: 22, kategorie: "HLAVNI_JIDLA", nazev: 'Steak z krkovičky', popis: 'Na fazolových luskách se slaninou', cena: 259, alergeny: '', gram: '250g' },
  { id: 23, kategorie: "HLAVNI_JIDLA", nazev: 'Míchaný steak', popis: 'Panenka, kotleta, kuřecí prsa, slanina, dip', cena: 389, alergeny: '7,10', gram: '300g' },
  { id: 24, kategorie: "HLAVNI_JIDLA", nazev: 'Špagety se slaninou', popis: 'Rajčata, špenát, Gran Moravia', cena: 195, alergeny: '1,3,7', gram: '350g' },
  { id: 25, kategorie: "HLAVNI_JIDLA", nazev: 'Špagety s kuřecím masem', popis: 'Nivová omáčka, kukuřice, pórek, bazalka', cena: 195, alergeny: '1,3,7', gram: '350g' },
  { id: 26, kategorie: "HLAVNI_JIDLA", nazev: 'Gnocchi s panenkou', popis: 'Vepřová panenka v hříbkové omáčce', cena: 215, alergeny: '1,3,7', gram: '350g' },
  { id: 27, kategorie: "HLAVNI_JIDLA", nazev: 'Losos na másle', popis: 'Grilovaný steak z lososa', cena: 259, alergeny: '4,7', gram: '200g' },
  { id: 28, kategorie: "HLAVNI_JIDLA", nazev: 'Candát na špenátu', popis: 'Filet na listovém špenátu', cena: 259, alergeny: '4', gram: '200g' },
  { id: 29, kategorie: "HLAVNI_JIDLA", nazev: 'Pstruh na bylinkách', popis: 'Cena dle váhy, 10g = 6 Kč', cena: 170, alergeny: '4', gram: 'cca 200g' },

  // Dezerty
  { id: 30, kategorie: "DEZERTY", nazev: 'Palačinka s ovocem', popis: 'Se šlehačkou a topingem', cena: 109, alergeny: '1,3,7', gram: '250g' },
  { id: 31, kategorie: "DEZERTY", nazev: 'Palačinka se zmrzlinou', popis: 'Ovoce, šlehačka, toping', cena: 139, alergeny: '1,3,7', gram: '350g' },
  { id: 32, kategorie: "DEZERTY", nazev: 'Domácí zákusek', popis: 'Dle denní nabídky', cena: 85, alergeny: '1,3,7,8', gram: '1 ks' },
  { id: 33, kategorie: "DEZERTY", nazev: 'Horké maliny', popis: 'S vanilkovou zmrzlinou a šlehačkou', cena: 110, alergeny: '7', gram: '200g' },
  { id: 34, kategorie: "DEZERTY", nazev: 'Ovocný pohár', popis: 'Se zmrzlinou a šlehačkou', cena: 95, alergeny: '7', gram: '200g' },

  // Nápoje
  { id: 35, kategorie: "NAPOJE", nazev: 'Voda neperlivá', popis: 'Chlazená neperlivá voda', cena: 35, alergeny: '', gram: '0,5l' },
  { id: 36, kategorie: "NAPOJE", nazev: 'Voda perlivá', popis: 'Chlazená perlivá voda', cena: 35, alergeny: '', gram: '0,5l' },
  { id: 37, kategorie: "NAPOJE", nazev: 'Coca-Cola', popis: 'Klasický sycený nápoj', cena: 45, alergeny: '', gram: '0,33l' },
  { id: 38, kategorie: "NAPOJE", nazev: 'Fanta', popis: 'Pomerančový sycený nápoj', cena: 45, alergeny: '', gram: '0,33l' },
  { id: 39, kategorie: "NAPOJE", nazev: 'Ledový čaj', popis: 'Chlazený ovocný ledový čaj', cena: 45, alergeny: '', gram: '0,4l' },
  { id: 40, kategorie: "NAPOJE", nazev: 'Espresso', popis: 'Malé silné espresso', cena: 45, alergeny: '', gram: '30ml' },
  { id: 41, kategorie: "NAPOJE", nazev: 'Cappuccino', popis: 'Espresso s mléčnou pěnou', cena: 55, alergeny: '7', gram: '150ml' },
  { id: 42, kategorie: "NAPOJE", nazev: 'Pilsner Urquell', popis: 'Točené pivo 12°', cena: 55, alergeny: '1', gram: '0,5l' },
];

async function main() {

  console.log('Mazání starých položek...');
  await prisma.menuData.deleteMany(); // 🧹 smaže vše

  for (const item of menuData) {
    await prisma.menuData.create({
      data: {
        kategorie: item.kategorie as any,
        nazev: item.nazev,
        popis: item.popis,
        cena: item.cena,
        alergeny: item.alergeny,
        gram: item.gram
      }
    });
  }
}

main()
  .then(() => {
    console.log("✅ Data byla úspěšně vložena.");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Chyba při vkládání dat:", e);
    prisma.$disconnect();
    process.exit(1);
  });
