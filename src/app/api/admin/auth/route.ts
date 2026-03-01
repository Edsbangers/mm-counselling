import { NextRequest, NextResponse } from "next/server";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ success: true });
}
