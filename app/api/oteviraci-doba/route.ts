// app/api/oteviraci-doba/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/oteviraci-doba - Fetch all opening hours
export async function GET() {
  try {
    const oteviraciDoba = await prisma.oteviraciDoba.findMany({
      orderBy: {
        id: 'asc', // Or based on your desired order
      },
    });
    return NextResponse.json(oteviraciDoba, { status: 200 });
  } catch (error) {
    console.error('Error fetching opening hours:', error);
    return NextResponse.json(
      { message: 'Failed to fetch opening hours', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST /api/oteviraci-doba - Create a new opening hour entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.den || !body.cas) {
      return NextResponse.json({ message: 'Missing required fields: den or cas' }, { status: 400 });
    }

    const newOteviraciDen = await prisma.oteviraciDoba.create({
      data: {
        den: body.den,
        cas: body.cas,
      },
    });
    return NextResponse.json(newOteviraciDen, { status: 201 });
  } catch (error) {
    console.error('Error creating opening hour entry:', error);
    return NextResponse.json(
      { message: 'Failed to create opening hour entry', error: (error as Error).message },
      { status: 500 }
    );
  }
}