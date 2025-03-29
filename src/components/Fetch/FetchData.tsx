import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export const FetchData = async (endpoint: string) => {
    const cookeStore = cookies();
    const locale = await getLocale();
    const errorMessage = locale === 'fa' ? "خطایی رخ داده است" : "An error has occurred";
    const token = cookeStore.get("token")?.value;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/${endpoint}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Language': locale,
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"
        });

        const json = await response.json();

        return {
            data: response.ok ? json.data : null,
            error: response.ok ? null : json.message || errorMessage,
            status: response.status,
        };

    } catch (err) {
        return {
            data: null,
            error: err instanceof Error ? err.message : errorMessage,
            status: 500,
        };
    }
};
