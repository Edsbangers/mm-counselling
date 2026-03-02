import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { getMetaAuthUrl } from "@/lib/social/meta-oauth";

export async function GET() {
  try {
    const state = randomUUID();
    const cookieStore = await cookies();
    cookieStore.set("meta_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });

    const url = getMetaAuthUrl(state);
    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Meta OAuth not configured",
      },
      { status: 503 }
    );
  }
}
