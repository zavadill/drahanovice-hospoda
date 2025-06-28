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
    const updated = await prisma.menuData.update({
      where: { id },
      data,
    });
    return Response.json(updated);
  } catch (error) {
    return new Response('Chyba při aktualizaci položky menu', { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return new Response('Nepovolený přístup', { status: 401 });
  }

  const id = parseInt(context.params.id, 10);

  try {
    await prisma.menuData.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response('Chyba při mazání položky menu', { status: 500 });
  }
}
