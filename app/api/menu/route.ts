import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const menu = await prisma.menuData.findMany({ orderBy: { id: 'asc' } });
  return Response.json(menu);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const data = await req.json();

  try {
    const created = await prisma.menuData.create({ data });
    return Response.json(created, { status: 201 });
  } catch (error) {
    return new Response('Chyba při vytváření položky menu', { status: 500 });
  }
}
