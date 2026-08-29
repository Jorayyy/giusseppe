import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    const obj: Record<string, string> = {};
    for (const s of settings) {
      obj[s.key] = s.value;
    }
    return NextResponse.json({ data: obj });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { settings } = body as { settings: { key: string; value: string }[] };
    if (!Array.isArray(settings)) {
      return NextResponse.json({ error: "settings array required" }, { status: 400 });
    }
    await Promise.all(
      settings.map(({ key, value }) =>
        prisma.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );
    const all = await prisma.setting.findMany();
    const obj: Record<string, string> = {};
    for (const s of all) {
      obj[s.key] = s.value;
    }
    return NextResponse.json({ data: obj });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
