import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = req.headers.get("authorization"); // Get temp token from headers
    const lang = req.headers.get("accept-language") || "fa"; // Get language

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": lang,
        Authorization: token, // Send temporary token
      },
      body: JSON.stringify(body),
      credentials: "include", // Store the final token in HttpOnly cookie
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.message || "OTP verification failed" }, { status: response.status });
    }

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
