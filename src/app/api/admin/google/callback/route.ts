import { NextRequest, NextResponse } from "next/server";
import { getOAuth2Client } from "@/lib/google";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  const client = getOAuth2Client();
  if (!client) {
    return NextResponse.json(
      { error: "Google OAuth not configured" },
      { status: 503 }
    );
  }

  try {
    const { tokens } = await client.getToken(code);

    // In production, store the refresh token in env vars via Vercel dashboard.
    // For now, display it so it can be copied.
    const html = `<!DOCTYPE html>
<html>
<head><title>Google Connected</title></head>
<body style="font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto;">
<h1 style="font-size:20px;">Google Account Connected</h1>
<p>Copy the refresh token below and add it as <code>GOOGLE_REFRESH_TOKEN</code> in your Vercel environment variables, then redeploy.</p>
<textarea style="width:100%;height:100px;font-family:monospace;font-size:12px;" readonly>${tokens.refresh_token || "No refresh token returned. You may need to revoke access and try again with prompt=consent."}</textarea>
<p style="margin-top:20px;"><a href="/admin">Return to Dashboard</a></p>
</body></html>`;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (e) {
    console.error("Google OAuth callback error:", e);
    return NextResponse.json(
      { error: "Failed to exchange authorization code" },
      { status: 500 }
    );
  }
}
