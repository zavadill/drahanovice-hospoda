import React from 'react';
import ClientRevealTwo from './ClientRevealTwo';
import DataMenu from './DataMenu';
import { prisma } from '@/lib/prisma';



const JidelniListek = async () => {
  const dataMenu = await prisma.menuData.findMany();

  return <DataMenu menuData={dataMenu}/>
};

export default JidelniListek;
