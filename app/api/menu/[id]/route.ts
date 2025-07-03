// app/api/menu/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/menu/[id] - Zpracování operací aktualizace nebo smazání pro konkrétní položku menu
export async function POST(request: Request, context: { params: { id: string } }) { // Oprava typu argumentu 'context'
  const id = parseInt(context.params.id); // Přístup k ID přes context.params.id

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Bylo zadáno neplatné ID.' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === 'update' && payload) {
      const updatedMenuItem = await prisma.menuData.update({
        where: { id: id },
        data: {
          nazev: payload.nazev,
          popis: payload.popis,
          cena: parseInt(payload.cena),
          alergeny: payload.alergeny,
          gram: payload.gram,
        },
      });
      return NextResponse.json(updatedMenuItem, { status: 200 });
    } else if (action === 'delete') {
      await prisma.menuData.delete({
        where: { id: id },
      });
      return NextResponse.json({ message: 'Položka menu byla smazána.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Neplatná akce nebo chybějící data.' }, { status: 400 });
    }
  } catch (error: unknown) { // Oprava typu chyby
    console.error(`Chyba při zpracování položky menu ${id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Nastala neznámá chyba.';
    if (errorMessage.includes('Record to update not found') || errorMessage.includes('Record to delete not found')) {
      return NextResponse.json({ message: 'Položka menu nebyla nalezena.' }, { status: 404 });
    }
    return NextResponse.json(
      { message: `Chyba při zpracování položky menu ${id}`, error: errorMessage },
      { status: 500 }
    );
  }
}