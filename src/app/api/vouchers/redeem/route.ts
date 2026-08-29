import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, phone } = body;
    if (!code || !phone) {
      return NextResponse.json({ error: "Missing code or phone" }, { status: 400 });
    }
    const voucher = await prisma.voucher.findUnique({ where: { code } });
    if (!voucher) {
      return NextResponse.json({ error: "Voucher not found" }, { status: 404 });
    }
    if (!voucher.active) {
      return NextResponse.json({ error: "Voucher is inactive" }, { status: 400 });
    }
    if (voucher.maxUses !== null && voucher.useCount >= voucher.maxUses) {
      return NextResponse.json({ error: "Voucher has reached max uses" }, { status: 400 });
    }
    const [redemption] = await prisma.$transaction([
      prisma.voucherRedemption.create({
        data: { voucherId: voucher.id, phone },
      }),
      prisma.voucher.update({
        where: { id: voucher.id },
        data: { useCount: { increment: 1 } },
      }),
    ]);
    return NextResponse.json({ data: { voucher, redemption } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to redeem voucher" }, { status: 500 });
  }
}
