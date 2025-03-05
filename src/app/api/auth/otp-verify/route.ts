import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = req.headers.get("authorization");
    const lang = req.headers.get("accept-language") || "fa";

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": lang,
        Authorization: token,
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.message || "OTP verification failed" }, { status: response.status });
    }

    const cookie = response.headers.get("set-cookie");
    if (cookie) {
      return NextResponse.json({ message: "OTP verified successfully" }, { status: 200, headers: { "set-cookie": cookie } });
    } else {
      return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
