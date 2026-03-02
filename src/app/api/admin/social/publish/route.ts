import { NextRequest, NextResponse } from "next/server";
import { publishToSocials } from "@/lib/social/publish-service";

export async function POST(request: NextRequest) {
  const { socialPostId, platforms } = await request.json();

  if (!socialPostId || !Array.isArray(platforms) || platforms.length === 0) {
    return NextResponse.json(
      { error: "socialPostId and platforms[] are required" },
      { status: 400 }
    );
  }

  const validPlatforms = platforms.filter(
    (p: string) => p === "facebook" || p === "instagram"
  );
  if (validPlatforms.length === 0) {
    return NextResponse.json(
      { error: "No valid platforms specified" },
      { status: 400 }
    );
  }

  try {
    const result = await publishToSocials({
      socialPostId,
      platforms: validPlatforms,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Publishing failed",
      },
      { status: 500 }
    );
  }
}
