import { cookies } from "next/headers";
import { randomUUID, createHmac } from "crypto";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "fallback-secret";
}

function signToken(token: string, expiresAt: number): string {
  const payload = `${token}:${expiresAt}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}:${sig}`;
}

function verifyToken(signed: string): boolean {
  const parts = signed.split(":");
  if (parts.length !== 3) return false;
  const [token, expiresStr, sig] = parts;
  const expires = parseInt(expiresStr, 10);
  if (isNaN(expires) || expires < Date.now()) return false;
  const expected = createHmac("sha256", getSecret())
    .update(`${token}:${expiresStr}`)
    .digest("hex");
  return sig === expected;
}

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

export async function createSession(): Promise<string> {
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const db = await getDb();
  if (db) {
    try {
      await db.adminSession.create({
        data: { token, expiresAt },
      });
    } catch (e) {
      console.error("Session DB error (non-fatal):", e);
    }
  }

  const signedValue = signToken(token, expiresAt.getTime());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, signedValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export async function validateSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  if (!value) return false;

  // Verify the signed cookie
  if (verifyToken(value)) return true;

  // Fallback: check database if available
  const db = await getDb();
  if (db) {
    try {
      const session = await db.adminSession.findUnique({
        where: { token: value },
      });
      if (session && session.expiresAt >= new Date()) return true;
      if (session) {
        await db.adminSession.delete({ where: { id: session.id } });
      }
    } catch {
      // DB not available
    }
  }

  return false;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;

  if (value) {
    const db = await getDb();
    if (db) {
      try {
        // Extract the token part from signed cookie
        const token = value.split(":")[0];
        await db.adminSession.deleteMany({ where: { token } });
      } catch {
        // DB not available
      }
    }
  }

  cookieStore.delete(SESSION_COOKIE);
}

export function verifyPassword(input: string): boolean {
  return input === process.env.ADMIN_PASSWORD;
}
