import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET() {
  const menu = await prisma.menuData.findMany({ orderBy: { id: "asc" } });
  return new Response(JSON.stringify(menu), { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user || session.user.email !== process.env.ADMIN_EMAIL) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await req.json();

  // action: "create"
  if (data.action === "create") {
    try {
      const created = await prisma.menuData.create({ data: data.payload });
      return new Response(JSON.stringify(created), { status: 201 });
    } catch (error) {
      return new Response("Chyba při vytváření položky menu", { status: 500 });
    }
  } else {
    return new Response("Invalid action", { status: 400 });
  }
}
