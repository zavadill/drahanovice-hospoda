import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession();

  if (!session || !session.user || session.user.email !== process.env.ADMIN_EMAIL) {
    return new Response("Unauthorized", { status: 401 });
  }

  const id = parseInt(params.id, 10);
  const data = await req.json();

  if (data.action === "update") {
    try {
      const updated = await prisma.menuData.update({ where: { id }, data: data.payload });
      return new Response(JSON.stringify(updated), { status: 200 });
    } catch (error) {
      return new Response("Update error", { status: 500 });
    }
  } else if (data.action === "delete") {
    try {
      await prisma.menuData.delete({ where: { id } });
      return new Response(null, { status: 204 });
    } catch (error) {
      return new Response("Delete error", { status: 500 });
    }
  } else {
    return new Response("Invalid action", { status: 400 });
  }
}
