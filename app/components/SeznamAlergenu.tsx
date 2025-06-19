import React from 'react'

const allergeny = [
  "Obiloviny obsahující lepek", "Korýši",
  "Vejce", "Ryby",
  "Arašídy", "Sójové boby",
  "Mléko", "Skořápkové plody",
  "Celer", "Hořčice",
  "Sezamová semena", "Oxid siřičitý a siřičitany",
  "Vlčí bob (lupina)", "Měkkýši"
];

const SeznamAlergenu = () => {
  return (
    <div className='p-5 m-5 rounded-lg bg-[var(--wheat)]'>
        <p className='py-2 mb-4 font-bold text-2xl'>Seznam alergenů</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            {allergeny.map((allergen, index) => (
                <div key={index} className="flex flex-row">
                    <p className="font-bold w-8">{index + 1}.</p>
                    <p className="font-normal">{allergen}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SeznamAlergenu;