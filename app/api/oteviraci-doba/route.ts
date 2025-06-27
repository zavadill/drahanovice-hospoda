import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const dny = await prisma.oteviraciDoba.findMany();
  return NextResponse.json(dny);
}

export async function POST(request: Request) {
  const data = await request.json();
  const novyDen = await prisma.oteviraciDoba.create({ data });
  return NextResponse.json(novyDen);
}
