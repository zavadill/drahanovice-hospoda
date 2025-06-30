// File: app/api/menu/[id]/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';

// This is a placeholder for your actual database logic.
// Replace with your database client (e.g., Prisma, Drizzle, MongoDB driver).
const db = {
  menu: {
    findUnique: async (id: string) => { /*... find item in db... */ return { id, name: 'Example Item', price: 9.99 }; },
    update: async (id: string, data: { name?: string; price?: number }) => { /*... update item in db... */ return { id,...data }; },
    delete: async (id:string) => { /*... delete item from db... */ return { id }; },
  },
};

// Define a schema for validating the incoming request body for PUT requests.
const updateMenuSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long.").optional(),
  price: z.number().positive("Price must be a positive number.").optional(),
}).strict();

// This line is crucial for Vercel.
export const dynamic = 'force-dynamic';

/**
 * Handles GET requests to /api/menu/[id]
 * Fetches a single menu item by its ID.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type updated to Promise
) {
  try {
    const { id } = await params; // Await params before accessing 'id'

    const menuItem = await db.menu.findUnique(id);

    if (!menuItem) {
      return NextResponse.json(
        { message: 'Menu item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(menuItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}

/**
 * Handles PUT requests to /api/menu/[id]
 * Updates an existing menu item.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type updated to Promise
) {
  try {
    const { id } = await params; // Await params before accessing 'id'
    const body = await request.json();

    const validation = updateMenuSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid request body", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const updatedMenuItem = await db.menu.update(id, validation.data);

    return NextResponse.json(updatedMenuItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}

/**
 * Handles DELETE requests to /api/menu/[id]
 * Deletes a menu item by its ID.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type updated to Promise
) {
  try {
    const { id } = await params; // Await params before accessing 'id'

    await db.menu.delete(id);

    return NextResponse.json(
      { message: 'Menu item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}