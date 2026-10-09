import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    if (!phone) {
      const cards = await prisma.loyaltyCard.findMany({ orderBy: { createdAt: "desc" } });
      return NextResponse.json({ data: cards });
    }
    const card = await prisma.loyaltyCard.findUnique({ where: { phone } });
    if (!card) {
      return NextResponse.json({ data: null });
    }
    return NextResponse.json({ data: card });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch loyalty card" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, name } = body;
    if (!phone) {
      return NextResponse.json({ error: "Missing phone" }, { status: 400 });
    }
    const existing = await prisma.loyaltyCard.findUnique({ where: { phone } });
    if (existing) {
      const newStamps = existing.stamps + 1;
      const updated = await prisma.loyaltyCard.update({
        where: { phone },
        data:
          newStamps >= 10
            ? { stamps: 0, rewards: existing.rewards + 1 }
            : { stamps: newStamps },
      });
      return NextResponse.json({ data: updated });
    }
    const created = await prisma.loyaltyCard.create({
      data: { phone, name: name ?? null, stamps: 1 },
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update loyalty card" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { phone, stamps } = body;
    if (!phone || stamps === undefined) {
      return NextResponse.json({ error: "Missing phone or stamps" }, { status: 400 });
    }
    const card = await prisma.loyaltyCard.update({
      where: { phone },
      data: { stamps },
    });
    return NextResponse.json({ data: card });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update stamps" }, { status: 500 });
  }
}
