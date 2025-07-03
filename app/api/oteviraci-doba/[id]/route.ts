// app/api/oteviraci-doba/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
      return NextResponse.json({ message: 'Opening hour entry deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid action or missing payload' }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error(`Error processing opening hour entry ${id}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    if (errorMessage.includes('Record to update not found') || errorMessage.includes('Record to delete not found')) {
      return NextResponse.json({ message: 'Opening hour entry not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: `Failed to process opening hour entry ${id}`, error: errorMessage },
      { status: 500 }
    );
  }
}