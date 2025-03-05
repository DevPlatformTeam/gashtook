"use client";

import { useState } from "react";

export const useFetchData = (endpoint: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<{isError: boolean; message: string}>({isError: false, message: ""});
    const [data, setData] = useState<Array<{ id: number; title: string; body: string }>>([]);

    try {
        setIsLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/${endpoint}`)
        .then((res) => res.json())
        .then((json) => setData(json));
        setError({isError: false, message: ""});
    } catch (error) {
        setError({isError: true, message: String(error)});
    } finally {
        setIsLoading(false);
    }

    return {data, isLoading, error};
};
