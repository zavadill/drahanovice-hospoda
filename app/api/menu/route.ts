import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma"; // Importujte si centralizovaného klienta
import { MenuData } from "@prisma/client";

// Získání všech položek menu (veřejně dostupné)
export async function GET() {
  try {
    const menu = await prisma.menuData.findMany();
    return NextResponse.json(menu);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Přidání nové položky (vyžaduje přihlášení)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = (await request.json()) as Omit<MenuData, "id">;
    const newItem = await prisma.menuData.create({
      data: {
        ...body
      },
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return new NextResponse("Error creating menu item", { status: 500 });
  }
}