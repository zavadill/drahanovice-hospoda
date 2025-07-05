// app/api/oteviraci-doba/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth'; // Import auth function

export async function POST(request: Request, context: any) {
  const session = await auth(); // Get session for authorization

  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ message: "Přístup odepřen. Musíte být přihlášeni jako administrátor." }, { status: 403 });
  }

  const id = parseInt(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Bylo zadáno neplatné ID. ID musí být číslo.' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === 'update' && payload) {
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
  } catch (error: unknown) {
    console.error(`Chyba při zpracování záznamu otevírací doby s ID ${id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Nastala neznámá chyba.';
    return NextResponse.json(
      { message: `Chyba serveru při zpracování záznamu otevírací doby s ID ${id}`, error: errorMessage },
      { status: 500 }
    );
  }
}