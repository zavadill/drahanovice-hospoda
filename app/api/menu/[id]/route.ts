// app/api/menu/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/menu/[id] - Handle update or delete operations for a specific menu item
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID provided' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === 'update' && payload) {
      // Handle update
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
      // Handle delete
      await prisma.menuData.delete({
        where: { id: id },
      });
      return NextResponse.json({ message: 'Menu item deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid action or missing payload' }, { status: 400 });
    }
  } catch (error: unknown) { // Explicitly type 'error' as unknown
    console.error(`Error processing menu item ${id}:`, error);

    // Type guard to check if error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';

    // Check if it's a "Record not found" error from Prisma
    if (errorMessage.includes('Record to update not found') || errorMessage.includes('Record to delete not found')) {
      return NextResponse.json({ message: 'Menu item not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: `Failed to process menu item ${id}`, error: errorMessage },
      { status: 500 }
    );
  }
}