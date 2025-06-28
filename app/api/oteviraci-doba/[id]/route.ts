import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return new Response('Nepovolený přístup', { status: 401 });
  }

  const id = parseInt(context.params.id, 10);
  const data = await req.json();

  try {
    const updated = await prisma.oteviraciDoba.update({
      where: { id },
      data,
    });
    return Response.json(updated);
  } catch {
    return new Response('Chyba při aktualizaci dne', { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return new Response('Nepovolený přístup', { status: 401 });
  }

  const id = parseInt(context.params.id, 10);

  try {
    await prisma.oteviraciDoba.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch {
    return new Response('Chyba při mazání dne', { status: 500 });
  }
}
