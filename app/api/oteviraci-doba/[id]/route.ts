// ZABEZPEČENÉ API /api/oteviraci-doba/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Nepovolený přístup' }, { status: 401 });
  }

  const id = parseInt(context.params.id, 10);
  const data = await req.json();

  try {
    const updated = await prisma.oteviraciDoba.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch {
    return new NextResponse('Chyba při aktualizaci dne', { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Nepovolený přístup' }, { status: 401 });
  }

  const id = parseInt(context.params.id, 10);

  try {
    await prisma.oteviraciDoba.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse('Chyba při mazání dne', { status: 500 });
  }
}
