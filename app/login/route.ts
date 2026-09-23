import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email;
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Temporary login check
    // This allows the login page to work without auth-store.
    if (
      email === "admin@example.com" &&
      password === "Admin123"
    ) {
      return NextResponse.json({
        ok: true,
        message: "Login successful",
        user: {
          id: "admin-1",
          name: "Administrator",
          email: "admin@example.com",
          role: "ADMIN",
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Something went wrong during login" },
      { status: 500 }
    );
  }
}
