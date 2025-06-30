// File: app/api/oteviraci-doba/[id]/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';

// This is a placeholder for your actual database logic.
// You should replace this with your actual database client and logic.
const db = {
  openingHours: {
    findUnique: async (id: string) => { /*... find item in db... */ return { id, day: 'Monday', open: '09:00', close: '17:00' }; },
    update: async (id: string, data: { day?: string; open?: string; close?: string }) => { /*... update item in db... */ return { id, ...data }; },
    delete: async (id: string) => { /*... delete item from db... */ return { id }; },
  },
};

// Define a schema for validating the incoming request body for PUT/POST requests.
// Adjust the schema to match the actual data structure for your opening hours.
const openingHoursSchema = z.object({
  day: z.string().optional(),
  open: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format, expected HH:MM").optional(),
  close: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format, expected HH:MM").optional(),
}).strict();

// This line is crucial for Vercel to treat the route as dynamic.
export const dynamic = 'force-dynamic';

/**
 * Handles GET requests to /api/oteviraci-doba/[id]
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type updated to Promise
) {
  try {
    const { id } = await params; // Await params before accessing 'id'

    const openingTime = await db.openingHours.findUnique(id);

    if (!openingTime) {
      return NextResponse.json(
        { message: 'Opening hours not found for this ID' },
        { status: 404 }
      );
    }

    return NextResponse.json(openingTime, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}

/**
 * Handles PUT requests to /api/oteviraci-doba/[id]
 * (This is likely what you meant instead of POST for a specific ID)
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type updated to Promise
) {
  try {
    const { id } = await params; // Await params before accessing 'id'
    const body = await request.json();

    const validation = openingHoursSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid request body", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const updatedOpeningHours = await db.openingHours.update(id, validation.data);

    return NextResponse.json(updatedOpeningHours, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}

/**
 * Handles DELETE requests to /api/oteviraci-doba/[id]
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type updated to Promise
) {
  try {
    const { id } = await params; // Await params before accessing 'id'

    await db.openingHours.delete(id);

    return NextResponse.json(
      { message: 'Opening hours deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}

// Note: A POST request is typically used for creating a *new* resource on a collection route,
// like /api/oteviraci-doba/, not on a specific ID route like /api/oteviraci-doba/[id]/.
// If you truly need a POST handler here, it should also be updated like the others.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id:string }> }
) {
    const { id } = await params;
    // ... your logic for POST ...
    return NextResponse.json({ message: `POST request handled for id: ${id}` });
}