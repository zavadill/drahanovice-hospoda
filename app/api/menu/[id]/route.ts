// app/api/menu/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/menu/[id] - Handle update or delete operations for a specific menu item
// Změna v definici argumentů: druhý argument se jmenuje 'context'
export async function POST(request: Request, context: { params: { id: string } }) {
  // Přístup k ID se změní z params.id na context.params.id
  const id = parseInt(context.params.id); 

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID provided' }, { status: 400 });
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
      return NextResponse.json({ message: 'Menu item deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid action or missing payload' }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error(`Error processing menu item ${id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    if (errorMessage.includes('Record to update not found') || errorMessage.includes('Record to delete not found')) {
      return NextResponse.json({ message: 'Menu item not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: `Failed to process menu item ${id}`, error: errorMessage },
      { status: 500 }
    );
  }
}