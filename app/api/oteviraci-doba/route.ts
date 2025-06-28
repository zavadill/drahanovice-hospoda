// ZABEZPEČENÉ API /api/oteviraci-doba/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const dny = await prisma.oteviraciDoba.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json(dny);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Nepovolený přístup' }, { status: 401 });
  }

  const data = await req.json();

  try {
    const created = await prisma.oteviraciDoba.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return new NextResponse('Chyba při přidávání dne', { status: 500 });
  }
}