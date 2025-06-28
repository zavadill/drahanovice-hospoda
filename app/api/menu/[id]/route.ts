import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const id = parseInt(params.id, 10);
  const data = await req.json();

  try {
    const updated = await prisma.menuData.update({ where: { id }, data });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch {
    return new Response("Update error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const id = parseInt(params.id, 10);

  try {
    await prisma.menuData.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch {
    return new Response("Delete error", { status: 500 });
  }
}
