import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lang = req.headers.get("accept-language") || "fa"; // Get language from the request headers

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": lang, // Send language header to Laravel
      },
      body: JSON.stringify(body),
      credentials: "include", // Ensures cookies are stored in the browser
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.message || "Registration failed" }, { status: response.status });
    }

    return NextResponse.json({ message: "Registration successful", token: result.token }, { status: 200 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
