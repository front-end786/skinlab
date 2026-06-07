import { SignJWT, jwtVerify } from "jose";
import { hash, compare } from "bcryptjs";
import { getDb } from "./mongodb";

const COOKIE_NAME = "skinlab_session";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "skinlab-dev-secret-change-in-production",
);

export type SiteUser = {
  id: string;
  email: string;
  name: string;
};

function parseCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function createSiteUser(input: {
  email: string;
  password: string;
  name: string;
}): Promise<SiteUser> {
  const db = await getDb();
  const email = input.email.trim().toLowerCase();
  const existing = await db.collection("users").findOne({ email });
  if (existing) throw new Error("Email already registered");

  const passwordHash = await hash(input.password, 10);
  const doc = {
    email,
    name: input.name.trim() || email.split("@")[0],
    passwordHash,
    createdAt: new Date(),
  };
  const result = await db.collection("users").insertOne(doc);
  return { id: result.insertedId.toString(), email, name: doc.name };
}

export async function verifySiteUser(email: string, password: string): Promise<SiteUser> {
  const db = await getDb();
  const user = await db.collection("users").findOne({ email: email.trim().toLowerCase() });
  if (!user || typeof user.passwordHash !== "string") throw new Error("Invalid email or password");

  const ok = await compare(password, user.passwordHash);
  if (!ok) throw new Error("Invalid email or password");

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name ?? user.email.split("@")[0],
  };
}

export async function signSessionToken(user: SiteUser): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function readSessionUser(request: Request): Promise<SiteUser | null> {
  const token = parseCookie(request.headers.get("cookie"), COOKIE_NAME);
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload.sub || !payload.email) return null;
    return {
      id: String(payload.sub),
      email: String(payload.email),
      name: String(payload.name ?? payload.email),
    };
  } catch {
    return null;
  }
}

export function sessionCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${secure}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
