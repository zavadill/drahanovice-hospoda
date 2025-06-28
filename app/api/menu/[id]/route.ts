import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return new Response("Nepovolený přístup", { status: 401 });
  }

  const id = parseInt(params.id, 10);
  const data = await req.json();

  try {
    const updated = await prisma.menuData.update({
      where: { id },
      data,
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response("Chyba při aktualizaci položky menu", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return new Response("Nepovolený přístup", { status: 401 });
  }

  const id = parseInt(params.id, 10);

  try {
    await prisma.menuData.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response("Chyba při mazání položky menu", { status: 500 });
  }
}
