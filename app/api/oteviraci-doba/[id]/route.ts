import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await req.json();

  try {
    const updated = await prisma.oteviraciDoba.update({
      where: { id },
      data,
    });
    return Response.json(updated);
  } catch (error) {
    return new Response('Chyba při aktualizaci dne', { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    await prisma.oteviraciDoba.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response('Chyba při mazání dne', { status: 500 });
  }
}
