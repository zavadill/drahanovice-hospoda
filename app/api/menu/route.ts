// File: app/api/menu/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';

// Placeholder for database logic.
const db = {
  menu: {
    findMany: async () => { /*... find all items in db... */ return [{ id: '1', name: 'Item 1', price: 10 }]; },
    create: async (data: { name: string; price: number }) => { /*... create item in db... */ return { id: '2',...data }; },
  },
};

// Define a schema for creating a new menu item.
// Note that fields are not optional here.
const createMenuSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  price: z.number().positive("Price must be a positive number."),
}).strict();

export const dynamic = 'force-dynamic';

/**
 * Handles GET requests to /api/menu
 * Fetches all menu items.
 */
export async function GET(request: Request) {
  try {
    const menuItems = await db.menu.findMany();
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to /api/menu
 * Creates a new menu item.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the incoming data.
    const validation = createMenuSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid request body", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const newMenuItem = await db.menu.create(validation.data);

    return NextResponse.json(newMenuItem, { status: 201 }); // 201 Created
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}