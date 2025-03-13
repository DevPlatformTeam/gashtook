import { cookies } from "next/headers";
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
  const cookieStore = cookies();
  const lang = req.headers.get("accept-language") || "fa";
  const token = cookieStore.get("token")?.value;

  try {
    const formData = await req.formData();

    const response = await fetch(`${process.env.BASE_URL_API}/dashboard/profile`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Accept-Language": lang,
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
      body: formData,
    });
    
    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    logger.error("Login error:", error);
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}
