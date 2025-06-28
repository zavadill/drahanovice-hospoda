import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const menu = await prisma.menuData.findMany({ orderBy: { id: 'asc' } });
  return Response.json(menu);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return new Response('Nepovolený přístup', { status: 401 });
  }

  const data = await req.json();

  try {
    const created = await prisma.menuData.create({ data });
    return Response.json(created, { status: 201 });
  } catch (error) {
    return new Response('Chyba při vytváření položky menu', { status: 500 });
  }
}
