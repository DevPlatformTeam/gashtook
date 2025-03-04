"use client";

import { useState, useEffect } from "react";

export const useFetchData = () => {
  const [data, setData] = useState<Array<{ id: number; title: string; body: string }>>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return data;
};
