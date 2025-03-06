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
        const token = req.headers.get("authorization");

        if (!token) {
            return NextResponse.json({ error: lang === 'fa' ? "ورود با خطا مواجه شد" : "Unauthorized" }, { status: 401 });
        }

        const response = await fetch(`${process.env.BASE_URL_API}/auth/resend`, {
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
            return NextResponse.json({ error: result.message || lang === 'fa' ? "ارسال مجدد کد تایید با خطا مواجه شد" : "Resend OTP failed" }, { status: response.status });
        }

        return NextResponse.json({ message: result.message }, { status: 200 });
    } catch (error) {
        logger.error("Login error:", error);
        return NextResponse.json({ error: lang === 'fa' ? 'خطای داخلی بروز کرده است.' : "Something went wrong" }, { status: 500 });
    }
}
