import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unread = searchParams.get("unread");
    const phone = searchParams.get("phone");

    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await prisma.message.deleteMany({ where: { createdAt: { lt: cutoff } } });

    const allMessages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });

    const seen = new Set<string>();
    const idsToDelete: string[] = [];
    const deduped = allMessages.filter((m) => {
      const key = `${m.sender}|${m.phone || ""}|${m.content}|${Math.floor(new Date(m.createdAt).getTime() / 1000)}`;
      if (seen.has(key)) {
        idsToDelete.push(m.id);
        return false;
      }
      seen.add(key);
      return true;
    });

    if (idsToDelete.length > 0) {
      await prisma.message.deleteMany({ where: { id: { in: idsToDelete } } });
    }

    const where: Record<string, unknown> = {};
    if (unread === "true") where.read = false;
    if (phone) where.phone = phone;

    let filtered = deduped;
    if (unread === "true" || phone) {
      filtered = deduped.filter((m) => {
        if (unread === "true" && m.read) return false;
        if (phone && m.phone !== phone) return false;
        return true;
      });
    }

    return NextResponse.json({ data: filtered });
  } catch (error) {
    console.error("Messages GET error:", error);
    return NextResponse.json({ error: "Failed to fetch messages", details: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sender, name, phone, content } = body;

    if (!sender || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!["customer", "owner"].includes(sender)) {
      return NextResponse.json({ error: "Invalid sender" }, { status: 400 });
    }

    const recentCutoff = new Date(Date.now() - 5000);
    const existing = await prisma.message.findFirst({
      where: {
        sender,
        phone: phone || null,
        content,
        createdAt: { gte: recentCutoff },
      },
    });

    if (existing) {
      return NextResponse.json({ data: existing }, { status: 200 });
    }

    const message = await prisma.message.create({
      data: {
        sender,
        name: name ?? null,
        phone: phone ?? null,
        content,
        read: sender === "owner",
      },
    });

    return NextResponse.json({ data: message }, { status: 201 });
  } catch (error) {
    console.error("Messages POST error:", error);
    return NextResponse.json({ error: "Failed to send message", details: String(error) }, { status: 500 });
  }
}
