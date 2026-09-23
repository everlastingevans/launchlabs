import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Admin account for testing
    if (
      email === "admin@example.com" &&
      password === "Admin123!"
    ) {
      return NextResponse.json({
        ok: true,
        role: "ADMIN",
        message: "Admin login successful",
      });
    }

    // Normal user account for testing
    if (
      email === "user@example.com" &&
      password === "User123!"
    ) {
      return NextResponse.json({
        ok: true,
        role: "USER",
        message: "User login successful",
      });
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}