// app/api/oteviraci-doba/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth'; // Import auth function

// GET /api/oteviraci-doba - Získání všech záznamů otevírací doby
export async function GET() {
  try {
    const oteviraciDoba = await prisma.oteviraciDoba.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return NextResponse.json(oteviraciDoba, { status: 200 });
  } catch (error: unknown) {
    console.error('Chyba při načítání otevírací doby:', error);
    const errorMessage = error instanceof Error ? error.message : 'Nastala neznámá chyba.';
    return NextResponse.json(
      { message: 'Nepodařilo se načíst otevírací dobu', error: errorMessage },
      { status: 500 }
    );
  }
}

// POST /api/oteviraci-doba - Vytvoření nového záznamu otevírací doby
export async function POST(request: Request) {
  const session = await auth(); // Get session for authorization

  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ message: "Přístup odepřen. Musíte být přihlášeni jako administrátor." }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.den || !body.cas) {
      return NextResponse.json({ message: 'Chybí povinná pole: den nebo čas' }, { status: 400 });
    }

    const newOteviraciDen = await prisma.oteviraciDoba.create({
      data: {
        den: body.den,
        cas: body.cas,
      },
    });
    return NextResponse.json(newOteviraciDen, { status: 201 });
  } catch (error: unknown) {
    console.error('Chyba při vytváření záznamu otevírací doby:', error);
    const errorMessage = error instanceof Error ? error.message : 'Nastala neznámá chyba.';
    return NextResponse.json(
      { message: 'Nepodařilo se vytvořit záznam otevírací doby', error: errorMessage },
      { status: 500 }
    );
  }
}