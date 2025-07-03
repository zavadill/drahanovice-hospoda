// app/api/menu/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path if necessary

// GET /api/menu - Fetch all menu items
export async function GET() {
  try {
    const menuItems = await prisma.menuData.findMany({
      orderBy: {
        id: 'asc', // Or by 'kategorie' if you prefer grouping from the DB
      },
    });
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { message: 'Failed to fetch menu items', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST /api/menu - Create a new menu item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate required fields (based on your schema, nazev, cena, kategorie are crucial)
    if (!body.nazev || !body.cena || !body.kategorie) {
      return NextResponse.json({ message: 'Missing required fields: nazev, cena, or kategorie' }, { status: 400 });
    }
    // Ensure 'kategorie' is a valid enum value
    const validCategories = ["PREDKRMY", "POLEVKY", "HLAVNI_JIDLA", "DEZERTY", "NAPOJE"];
    if (!validCategories.includes(body.kategorie)) {
      return NextResponse.json({ message: `Invalid kategorie value: ${body.kategorie}` }, { status: 400 });
    }

    const newMenuItem = await prisma.menuData.create({
      data: {
        nazev: body.nazev,
        popis: body.popis || null, // Allow null if not provided
        cena: parseInt(body.cena), // Ensure cena is an integer
        alergeny: body.alergeny || null, // Allow null if not provided
        gram: body.gram,
        kategorie: body.kategorie,
      },
    });
    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { message: 'Failed to create menu item', error: (error as Error).message },
      { status: 500 }
    );
  }
}