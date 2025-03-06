import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const lang = req.headers.get("accept-language") || "fa";

  try {
    const body = await req.json();
    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json({ error: lang === 'fa' ? "ورود با خطا مواجه شد" : "Unauthorized" }, { status: 401 });
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
      const defaultMessage = lang === 'fa' ? "تایید کد تایید با خطا مواجه شد" : "OTP verification failed";
      return NextResponse.json({ error: result.message || defaultMessage }, { status: response.status });
    }

    const cookie = response.headers.get("set-cookie");
    const defaultOkMessage = lang === 'fa' ? "ورود به حساب کاربری با موفقیت انجام شد." : "OTP verified successfully";
    if (cookie) {
      return NextResponse.json({ message: result.message || defaultOkMessage }, { status: 200, headers: { "set-cookie": cookie } });
    } else {
      return NextResponse.json({ message: result.message || defaultOkMessage }, { status: 200 });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ error: lang === 'fa' ? "خطای داخلی بروز کرده است" : "Something went wrong" }, { status: 500 });
  }
}
