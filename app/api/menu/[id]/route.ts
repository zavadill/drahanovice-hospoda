import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string } }) {
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
      return new NextResponse(null, { status: 204 }); // No Content
    } else {
      return new NextResponse("Invalid action specified", { status: 400 });
    }
  } catch (error) {
    console.error(`Error processing action for menu item ${id}:`, error);
    return new NextResponse(`Error processing request for menu item ${id}`, { status: 500 });
  }
}