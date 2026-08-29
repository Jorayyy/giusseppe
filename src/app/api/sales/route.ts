import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const where: Record<string, unknown> = {};
    if (from || to) {
      where.date = {
        ...(from && { gte: new Date(from) }),
        ...(to && { lte: new Date(to) }),
      };
    }
    const sales = await prisma.salesRecord.findMany({
      where,
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ data: sales });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sales" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, total, orders, items } = body;
    if (total === undefined || orders === undefined || !items) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const record = await prisma.salesRecord.create({
      data: {
        date: date ? new Date(date) : new Date(),
        total,
        orders,
        items,
      },
    });
    return NextResponse.json({ data: record }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create sales record" }, { status: 500 });
  }
}
