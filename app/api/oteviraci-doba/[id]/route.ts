import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Nepovolený přístup", { status: 401 });
  }

  const id = parseInt(params.id, 10);
  const data = await req.json();

  try {
    const updated = await prisma.oteviraciDoba.update({
      where: { id },
      data,
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch {
    return new Response("Chyba při aktualizaci dne", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Nepovolený přístup", { status: 401 });
  }

  const id = parseInt(params.id, 10);

  try {
    await prisma.oteviraciDoba.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch {
    return new Response("Chyba při mazání dne", { status: 500 });
  }
}
