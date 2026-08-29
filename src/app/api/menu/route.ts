import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({ orderBy: { sortOrder: "asc" } });
    const grouped: Record<string, typeof items> = {};
    for (const item of items) {
      (grouped[item.category] ??= []).push(item);
    }
    return NextResponse.json({ data: grouped });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, category, image, popular } = body;
    if (!name || !price || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const item = await prisma.menuItem.create({
      data: { name, price, description, category, image: image ?? null, popular: popular ?? false },
    });
    return NextResponse.json({ data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const item = await prisma.menuItem.update({ where: { id }, data });
    return NextResponse.json({ data: item });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    await prisma.menuItem.delete({ where: { id } });
    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}
