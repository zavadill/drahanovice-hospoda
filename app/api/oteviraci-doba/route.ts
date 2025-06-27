import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const dny = await prisma.oteviraciDoba.findMany({ orderBy: { id: 'asc' } });
  return Response.json(dny);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const created = await prisma.oteviraciDoba.create({ data });
    return Response.json(created, { status: 201 });
  } catch (error) {
    return new Response('Chyba při přidávání dne', { status: 500 });
  }
}
