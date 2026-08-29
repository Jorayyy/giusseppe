import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json({ data: photos });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, alt } = body;
    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }
    const maxSort = await prisma.photo.aggregate({ _max: { sortOrder: true } });
    const photo = await prisma.photo.create({
      data: { url, alt: alt ?? null, sortOrder: (maxSort._max.sortOrder ?? 0) + 1 },
    });
    return NextResponse.json({ data: photo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create photo" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { photos } = body as { photos: { id: string; sortOrder: number }[] };
    if (!Array.isArray(photos)) {
      return NextResponse.json({ error: "photos array required" }, { status: 400 });
    }
    await Promise.all(
      photos.map(({ id, sortOrder }) =>
        prisma.photo.update({ where: { id }, data: { sortOrder } })
      )
    );
    const updated = await prisma.photo.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reorder photos" }, { status: 500 });
  }
}
