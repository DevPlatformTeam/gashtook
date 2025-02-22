"use client";

import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";
import { Categories } from "@/app/[locale]/(main)/[city]/types/categories";

type CategoryValue = Categories["category"] | "all";

type CategoryContextType = {
  mainCategory: CategoryValue;
  setMainCategory: Dispatch<SetStateAction<CategoryValue>>;
};

export const CategoryContext = createContext<CategoryContextType>({
  mainCategory: "all",
  setMainCategory: () => {},
});

type CategoryProviderProps = {
  children: ReactNode;
};

export function FilterCategoryProvider({ children }: CategoryProviderProps) {
  const [mainCategory, setMainCategory] = useState<CategoryValue>("all");
  
  return (
    <CategoryContext.Provider value={{ mainCategory, setMainCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}