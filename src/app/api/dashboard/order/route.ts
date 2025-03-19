import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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
    const token = cookeStore.get("token")?.value;
    const lang = req.headers.get("accept-language") || "fa";

    return req
        .json()
        .then((body) => {
            return fetch(`${process.env.BASE_URL_API}/payment/select-package`, {
                method: "POST",
                headers: {
                    "Accept-Language": lang,
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                credentials: "include",
            });
        })
        .then((response) => {
            return response.json().then((result) => {
                if (!response.ok) {
                    return NextResponse.json(result, { status: response.status });
                }

                return NextResponse.json(result, { status: 200 });
            });
        })
        .catch((error) => {
            logger.error("new order error:", error);

            if (error.status && error.data) {
                return NextResponse.json(
                    error.data,
                    { status: error.status }
                );
            }

            return NextResponse.json(
                { error: lang === 'fa' ? 'خطای داخلی بروز کرده است.' : "Something went wrong" },
                { status: 500 }
            );
        });
}