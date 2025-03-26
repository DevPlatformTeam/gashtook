import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const FetchData = (endpoint: string) => {
    const cookeStore = cookies();

    return getLocale().then(locale => {
        const errorMessage = locale === 'fa' ? "خطایی رخ داده است" : "An error has occurred";
        const token = cookeStore.get("token")?.value;

        return fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/${endpoint}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Language': locale,
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"
        })
        .then(response => {
            // console.log("before");

            // redirect(`/${locale}/buy-subscription`);
            // console.log("after");

            if (response.status === 402) {
                redirect(`/${locale}/buy-subscription`);
            }
            return response.json().then(json => {
                if (response.status === 402) {
                    redirect(`/${locale}/buy-subscription`);
                }
                if (!response.ok) {
                    return { data: null, error: json.message || errorMessage };
                }
                return { data: json.data, error: null };
            });
        })
        .catch(err => {
            if (err.status === 402 || (typeof err.message === "string" && err.message.includes("402"))) {
                redirect(`/${locale}/buy-subscription`);
            }
            return {
                data: null,
                error: err instanceof Error ? err.message : errorMessage,
            };
        });
    });
};
