import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const menu = await prisma.menuData.findMany();
  return NextResponse.json(menu);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newItem = await prisma.menuData.create({ data });
  return NextResponse.json(newItem);
}
