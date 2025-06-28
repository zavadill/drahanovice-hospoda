//api/menu/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET() {
  const menu = await prisma.menuData.findMany({ orderBy: { id: "asc" } });
  return new Response(JSON.stringify(menu), { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await req.json();

  try {
    const created = await prisma.menuData.create({ data });
    return new Response(JSON.stringify(created), { status: 201 });
  } catch (error) {
    return new Response("Chyba při vytváření položky menu", { status: 500 });
  }
}
