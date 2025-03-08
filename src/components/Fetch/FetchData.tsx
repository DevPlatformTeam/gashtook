export const FetchData = async (endpoint: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/${endpoint}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include"
        });
        const json = await response.json();

        if (!response.ok) {
            return { data: null, error: json.message || "خطایی رخ داده است" };
        }

        return { data: json.data, error: null };
    } catch (err) {
        return {
            data: null,
            error: err instanceof Error ? err.message : "خطایی رخ داده است",
        };
    }
};
