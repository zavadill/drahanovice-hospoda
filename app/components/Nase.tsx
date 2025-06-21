import { Utensils, Users, Calendar } from 'lucide-react';
import ClientRevealTwo from './ClientRevealTwo';

export default function Nase() {
  return (
    <div className='bg-[var(--wheat)]'>
      <ClientRevealTwo selector=".card-nase">
        <div className='width-p-page'>
          <div className='center-text'>
            <h3 className='text-nadpis pb-20'>Naše služby</h3>
          </div>
          <div className='flex flex-col gap-5 md:flex-row mx-5'>
            <div className='card-nase'>
              <div>
                <Utensils size={28} className='text-[var(--green)]' />
              </div>
              <p className='nase-nadpis'>Rodinná česká kuchyně</p>
              <p className='nase-podnadpis'>
                Nabízíme poctivé české pokrmy připravené podle tradičních receptur z kvalitních lokálních surovin.
              </p>
            </div>
            <div className='card-nase'>
              <div>
                <Users size={28} className='text-[var(--green)]' />
              </div>
              <p className='nase-nadpis'>Dokonalé prostory</p>
              <p className='nase-podnadpis'>
                Restaurace pro 50 osob, dva salonky (20 a 50 osob) a letní zahrádka až pro 70 hostů.
              </p>
            </div>
            <div className='card-nase'>
              <div>
                <Calendar size={28} className='text-[var(--green)]' />
              </div>
              <p className='nase-nadpis'>Svatby a oslavy</p>
              <p className='nase-podnadpis'>
                Kompletní zajištění svateb, rodinných oslav, firemních akcí i jiných společenských událostí.
              </p>
            </div>
          </div>
        </div>
      </ClientRevealTwo>
    </div>
  );
}
