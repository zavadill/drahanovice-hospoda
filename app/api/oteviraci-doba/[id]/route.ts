// app/api/oteviraci-doba/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/oteviraci-doba/[id] - Handle update or delete for a specific opening hour entry
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
      const updatedOteviraciDen = await prisma.oteviraciDoba.update({
        where: { id: id },
        data: {
          den: payload.den,
          cas: payload.cas,
        },
      });
      return NextResponse.json(updatedOteviraciDen, { status: 200 });
    } else if (action === 'delete') {
      // Handle delete
      await prisma.oteviraciDoba.delete({
        where: { id: id },
      });
      return NextResponse.json({ message: 'Opening hour entry deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid action or missing payload' }, { status: 400 });
    }
  } catch (error: unknown) { // Explicitly type 'error' as unknown
    console.error(`Error processing opening hour entry ${id}:`, error);

    // Type guard to check if error is an instance of Error
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