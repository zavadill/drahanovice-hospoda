import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { OteviraciDoba } from "@prisma/client";

// Získání otevírací doby (veřejně dostupné)
export async function GET() {
  try {
    const oteviraciDoba = await prisma.oteviraciDoba.findMany();
    return NextResponse.json(oteviraciDoba);
  } catch (error) {
    console.error("Error fetching opening hours:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Přidání dne (vyžaduje přihlášení)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = (await request.json()) as Omit<OteviraciDoba, "id">;
    const newDay = await prisma.oteviraciDoba.create({
      data: {
        ...body
      },
    });
    return NextResponse.json(newDay, { status: 201 });
  } catch (error) {
    console.error("Error creating opening day:", error);
    return new NextResponse("Error creating opening day", { status: 500 });
  }
}