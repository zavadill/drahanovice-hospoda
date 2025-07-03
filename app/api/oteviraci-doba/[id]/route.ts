// app/api/oteviraci-doba/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/oteviraci-doba/[id] - Zpracování operací aktualizace nebo smazání pro konkrétní záznam otevírací doby
export async function POST(request: Request, context: { params: { id: string } }) { // Oprava typu argumentu 'context'
  const id = parseInt(context.params.id); // Přístup k ID přes context.params.id

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Bylo zadáno neplatné ID.' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === 'update' && payload) {
      const updatedOteviraciDen = await prisma.oteviraciDoba.update({
        where: { id: id },
        data: {
          den: payload.den,
          cas: payload.cas,
        },
      });
      return NextResponse.json(updatedOteviraciDen, { status: 200 });
    } else if (action === 'delete') {
      await prisma.oteviraciDoba.delete({
        where: { id: id },
      });
      return NextResponse.json({ message: 'Záznam otevírací doby byl smazán.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Neplatná akce nebo chybějící data.' }, { status: 400 });
    }
  } catch (error: unknown) { // Oprava typu chyby
    console.error(`Chyba při zpracování záznamu otevírací doby ${id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Nastala neznámá chyba.';
    if (errorMessage.includes('Record to update not found') || errorMessage.includes('Record to delete not found')) {
      return NextResponse.json({ message: 'Záznam otevírací doby nebyl nalezen.' }, { status: 404 });
    }
    return NextResponse.json(
      { message: `Chyba při zpracování záznamu otevírací doby ${id}`, error: errorMessage },
      { status: 500 }
    );
  }
}