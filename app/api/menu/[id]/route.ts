// app/api/menu/[id]/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * Toto je JEDINÁ správná signatura pro dynamický Route Handler v Next.js,
 * která zaručeně projde přísnou typovou kontrolou při buildu na Vercelu.
 * @param request - Příchozí požadavek (typ Request)
 * @param context - Objekt obsahující parametry z URL (např. { params: { id: '123' } })
 */
export async function POST(request: Request, context: { params: { id:string } }) {
  
  // Z `context` objektu si bezpečně vytáhneme `params`.
  const { params } = context;

  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
      return new NextResponse("Invalid ID format", { status: 400 });
  }

  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === "update") {
      const updatedItem = await prisma.menuData.update({
        where: { id },
        data: payload,
      });
      return NextResponse.json(updatedItem);
    } else if (action === "delete") {
      await prisma.menuData.delete({
        where: { id },
      });
      return new NextResponse(null, { status: 204 });
    } else {
      return new NextResponse("Invalid action specified", { status: 400 });
    }
  } catch (error) {
    console.error(`Error processing action for menu item ${id}:`, error);
    return new NextResponse(`Error processing request for menu item ${id}`, { status: 500 });
  }
}