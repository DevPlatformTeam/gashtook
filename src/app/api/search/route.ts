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
  const cookeStore = cookies();
  const { query } = await req.json();
  const lang = req.headers.get("accept-language") || "fa";
  const token = cookeStore.get("token")?.value;
  
  try {
    const endpoint = token ? "search1" : "search2";
    const response = await fetch(`${process.env.BASE_URL_API}/${endpoint}?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": lang,
        ...(token && { "Authorization": `Bearer ${token}` })
      },
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    logger.error("Search error:", error);
    return NextResponse.json({ error: lang === 'fa' ? 'خطای داخلی بروز کرده است.' : "Something went wrong" }, { status: 500 });
  }
}
