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
// This ensures type safety and that only expected fields are processed.
const updateMenuSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long.").optional(),
  price: z.number().positive("Price must be a positive number.").optional(),
}).strict(); //.strict() ensures no unknown fields are allowed.

// This line is crucial for Vercel.
// It tells Next.js to treat this route as fully dynamic,
// ensuring it's executed as a serverless function on every request.
export const dynamic = 'force-dynamic';

/**
 * Handles GET requests to /api/menu/[id]
 * Fetches a single menu item by its ID.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; // Correctly access the dynamic 'id' parameter.

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
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; // Correctly access the dynamic 'id' parameter.
    const body = await request.json(); // Correctly parse the JSON body from the request.

    // Validate the request body against the Zod schema.
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
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; // Correctly access the dynamic 'id' parameter.

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