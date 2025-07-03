// app/api/oteviraci-doba/[id]/route.ts
import { NextResponse } from 'next/server'; // Importujeme NextResponse
import prisma from '@/lib/prisma';

// Definice typu pro parametry routy
type Params = {
  id: string;
};

// Vždy, když používáte dynamické routy, druhý argument je objekt 'context'
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
      // Před aktualizací si ověříme, zda záznam existuje
      const existingEntry = await prisma.oteviraciDoba.findUnique({ where: { id: id } });
      if (!existingEntry) {
        return NextResponse.json({ message: 'Záznam otevírací doby nebyl nalezen pro aktualizaci.' }, { status: 404 });
      }

      const updatedOteviraciDen = await prisma.oteviraciDoba.update({
        where: { id: id },
        data: {
          den: payload.den,
          cas: payload.cas,
        },
      });
      return NextResponse.json(updatedOteviraciDen, { status: 200 });
    } else if (action === 'delete') {
      // Před smazáním si ověříme, zda záznam existuje
      const existingEntry = await prisma.oteviraciDoba.findUnique({ where: { id: id } });
      if (!existingEntry) {
        return NextResponse.json({ message: 'Záznam otevírací doby nebyl nalezen pro smazání.' }, { status: 404 });
      }

      await prisma.oteviraciDoba.delete({
        where: { id: id },
      });
      return NextResponse.json({ message: 'Záznam otevírací doby byl úspěšně smazán.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Neplatná akce nebo chybějící data (payload).' }, { status: 400 });
    }
  } catch (error: unknown) { // Zajištění správného typování chyby
    console.error(`Chyba při zpracování záznamu otevírací doby s ID ${id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Nastala neznámá chyba.';
    return NextResponse.json(
      { message: `Chyba serveru při zpracování záznamu otevírací doby s ID ${id}`, error: errorMessage },
      { status: 500 }
    );
  }
}