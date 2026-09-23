import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { insertUser, findUserByEmail } from "@/lib/db";
import { validateEmail, validatePassword } from "@/lib/validate";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { name, email, password } = body as {
    name: string;
    email: string;
    password: string;
  };

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!email || !validateEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!password || !validatePassword(password)) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const existing = findUserByEmail(email);
  if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 10);

  // Default role is "user" for signups
  insertUser({
    id: crypto.randomUUID(),
    email,
    name,
    role: "user",
    passwordHash,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}