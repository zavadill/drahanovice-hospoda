import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await request.json();
  const updatedDen = await prisma.oteviraciDoba.update({
    where: { id },
    data,
  });
  return NextResponse.json(updatedDen);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  await prisma.oteviraciDoba.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
