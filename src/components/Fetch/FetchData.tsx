"use client";

import { useState } from "react";

export const useFetchData = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<{isError: boolean; message: string}>({isError: false, message: ""});
    const [data, setData] = useState<Array<{ id: number; title: string; body: string }>>([]);

    try {
        setIsLoading(true);
        fetch("https://jsonplaceholder.typicode.com/posts")
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
