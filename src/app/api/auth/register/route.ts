import { NextResponse } from "next/server";
import winston from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';


const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export async function POST(req: Request) {
  const lang = req.headers.get("accept-language") || "fa";
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": lang,
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      const defaultMessage = lang === 'fa' ? "ثبت نام با خطا مواجه شد" : "Registration failed";
      return NextResponse.json({ error: result.message || defaultMessage }, { status: response.status });
    }

    const defaultOkMessage = lang === 'fa' ? "ثبت نام با موفقیت انجام شد" : "Registration successful";
    return NextResponse.json({ message: result.message || defaultOkMessage, token: result.data.token }, { status: 200 });
  } catch (error) {
    logger.error("Registration error:", error);
    const defaultErrorMessage = lang === 'fa' ? "خطای داخلی بروز کرده است" : "Something went wrong";
    return NextResponse.json({ error: defaultErrorMessage }, { status: 500 });
  }
}
