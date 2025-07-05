// app/api/menu/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth'; // Import auth function

// GET /api/menu - Získání všech položek menu
export async function GET() {
  try {
    const menuItems = await prisma.menuData.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error: unknown) {
    console.error('Chyba při načítání položek menu:', error);
    const errorMessage = error instanceof Error ? error.message : 'Nastala neznámá chyba.';
    return NextResponse.json(
      { message: 'Nepodařilo se načíst položky menu', error: errorMessage },
      { status: 500 }
    );
  }
}

// POST /api/menu - Vytvoření nové položky menu
export async function POST(request: Request) {
  const session = await auth(); // Get session for authorization

  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ message: "Přístup odepřen. Musíte být přihlášeni jako administrátor." }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.nazev || !body.cena || !body.kategorie) {
      return NextResponse.json({ message: 'Chybí povinná pole: název, cena nebo kategorie' }, { status: 400 });
    }

    const validCategories = ["PREDKRMY", "POLEVKY", "HLAVNI_JIDLA", "DEZERTY", "NAPOJE"];
    if (!validCategories.includes(body.kategorie)) {
      return NextResponse.json({ message: `Neplatná hodnota kategorie: ${body.kategorie}` }, { status: 400 });
    }

    const newMenuItem = await prisma.menuData.create({
      data: {
        nazev: body.nazev,
        popis: body.popis || null,
        cena: parseInt(body.cena),
        alergeny: body.alergeny || null,
        gram: body.gram,
        kategorie: body.kategorie,
      },
    });
    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error: unknown) {
    console.error('Chyba při vytváření položky menu:', error);
    const errorMessage = error instanceof Error ? error.message : 'Nastala neznámá chyba.';
    return NextResponse.json(
      { message: 'Nepodařilo se vytvořit položku menu', error: errorMessage },
      { status: 500 }
    );
  }
}