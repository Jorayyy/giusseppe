import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const entries = await prisma.waitlistEntry.findMany({
      where: { status: "waiting" },
      orderBy: { position: "asc" },
    });
    return NextResponse.json({ data: entries });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch waitlist" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, partySize, preferredTime } = body;
    if (!name || !phone || !partySize) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const maxPos = await prisma.waitlistEntry.aggregate({
      where: { status: "waiting" },
      _max: { position: true },
    });
    const entry = await prisma.waitlistEntry.create({
      data: {
        name,
        phone,
        partySize,
        preferredTime: preferredTime ?? null,
        position: (maxPos._max.position ?? 0) + 1,
      },
    });
    return NextResponse.json({ data: entry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, position } = body;
    if (!id || (!status && position === undefined)) {
      return NextResponse.json({ error: "Missing id or update" }, { status: 400 });
    }
    if (status && !["waiting", "seated", "left"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    const entry = await prisma.waitlistEntry.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(position !== undefined ? { position } : {}),
      },
    });
    return NextResponse.json({ data: entry });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update waitlist entry" }, { status: 500 });
  }
}
