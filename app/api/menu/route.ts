import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const menu = await prisma.menuData.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json(menu);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Nepovolený přístup' }, { status: 401 });
  }

  const data = await req.json();

  try {
    const created = await prisma.menuData.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return new NextResponse('Chyba při vytváření položky menu', { status: 500 });
  }
}