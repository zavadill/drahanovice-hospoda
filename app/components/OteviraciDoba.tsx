import prisma from '@/lib/prisma';
import { Clock } from 'lucide-react';

const OteviraciDoba = async () => {
  const dny = await prisma.oteviraciDoba.findMany({
  });

  return (
    <div>
        {dny.map(({ id, den, cas }) => (
            <div key={id} className='flex flex-row justify-between items-center'>
                <div className='kontakt-podnadpis'>
                    <div><Clock size={20} /></div>
                    <p>{den}</p>
                </div>
                <p className='text-base'>{cas}</p>
            </div>
        ))}
    </div>
  );
};

export default OteviraciDoba;
