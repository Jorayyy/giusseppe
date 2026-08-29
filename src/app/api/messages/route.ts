import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unread = searchParams.get("unread");
    const phone = searchParams.get("phone");

    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await prisma.message.deleteMany({ where: { createdAt: { lt: cutoff } } });

    const where: Record<string, unknown> = {};
    if (unread === "true") where.read = false;
    if (phone) where.phone = phone;

    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: messages });
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
