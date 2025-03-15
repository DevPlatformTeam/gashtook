import { getLocale } from "next-intl/server";

export const FetchData = async (endpoint: string) => {
    const locale = await getLocale();
    const errorMessage = locale == 'fa' ? "خطایی رخ داده است" : "An error has occurred";

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/${endpoint}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Language': locale
            },
            credentials: "include"
        });
        const json = await response.json();

        if (!response.ok) {
            return { data: null, error: json.message || errorMessage};
        }

        return { data: json.data, error: null };
    } catch (err) {
        return {
            data: null,
            error: err instanceof Error ? err.message : errorMessage,
        };
    }
};
