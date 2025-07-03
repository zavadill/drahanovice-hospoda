// app/api/menu/[id]/route.ts
import { NextResponse } from 'next/server'; // Importujeme NextResponse
import prisma from '@/lib/prisma';

// Definice typu pro parametry routy
type Params = {
  id: string;
};

// Vždy, když používáte dynamické routy, druhý argument je objekt 'context'
// Zde mu dáváme explicitní typ pro jistotu.
export async function POST(
  request: Request, // Standardní Request objekt
  context: { params: Params } // Typování pro kontext, který obsahuje params
) {
  const id = parseInt(context.params.id); // Přistupujeme k ID přes context.params.id

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Bylo zadáno neplatné ID. ID musí být číslo.' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === 'update' && payload) {
      // Před aktualizací si ověříme, zda položka existuje
      const existingItem = await prisma.menuData.findUnique({ where: { id: id } });
      if (!existingItem) {
        return NextResponse.json({ message: 'Položka menu nebyla nalezena pro aktualizaci.' }, { status: 404 });
      }

      const updatedMenuItem = await prisma.menuData.update({
        where: { id: id },
        data: {
          nazev: payload.nazev,
          popis: payload.popis,
          cena: parseInt(payload.cena), // Zajistíme, že cena je číslo
          alergeny: payload.alergeny,
          gram: payload.gram,
        },
      });
      return NextResponse.json(updatedMenuItem, { status: 200 });
    } else if (action === 'delete') {
      // Před smazáním si ověříme, zda položka existuje
      const existingItem = await prisma.menuData.findUnique({ where: { id: id } });
      if (!existingItem) {
        return NextResponse.json({ message: 'Položka menu nebyla nalezena pro smazání.' }, { status: 404 });
      }

      await prisma.menuData.delete({
        where: { id: id },
      });
      return NextResponse.json({ message: 'Položka menu byla úspěšně smazána.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Neplatná akce nebo chybějící data (payload).' }, { status: 400 });
    }
  } catch (error: unknown) { // Zajištění správného typování chyby
    console.error(`Chyba při zpracování položky menu s ID ${id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Nastala neznámá chyba.';
    return NextResponse.json(
      { message: `Chyba serveru při zpracování položky menu s ID ${id}`, error: errorMessage },
      { status: 500 }
    );
  }
}