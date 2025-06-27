import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    await prisma.menuData.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response('Chyba při mazání položky menu', { status: 500 });
  }
}
