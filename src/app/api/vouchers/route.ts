import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const vouchers = await prisma.voucher.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ data: vouchers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch vouchers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, type, value, description, maxUses } = body;
    if (!code || !type || value === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const voucher = await prisma.voucher.create({
      data: { code, type, value, description: description ?? null, maxUses: maxUses ?? null },
    });
    return NextResponse.json({ data: voucher }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create voucher" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, active } = body;
    if (!id || active === undefined) {
      return NextResponse.json({ error: "Missing id or active" }, { status: 400 });
    }
    const voucher = await prisma.voucher.update({
      where: { id },
      data: { active },
    });
    return NextResponse.json({ data: voucher });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update voucher" }, { status: 500 });
  }
}
