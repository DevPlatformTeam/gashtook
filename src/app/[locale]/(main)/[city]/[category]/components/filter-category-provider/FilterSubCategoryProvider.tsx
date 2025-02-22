"use client";

import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";
import { Categories } from "@/app/[locale]/(main)/[city]/types/categories";

export const Subcategories = {
  sight: ["religious", "rural", "nature", "museum", "historical"],
  buy: ["bookstore", "hypermarket", "market", "commercialCenter"],
  eat: ["cafe", "fastFood", "restaurant"],
  hotel: ["hotel", "guestHouse", "apartmentHotel"],
  fun: [
    "sportsComplex",
    "entertainmentAndGames",
    "waterActivities",
    "cinema",
    "park",
    "amusementPark",
    "swimming",
    "sportsHall",
  ],
  healthcare: ["hospital", "clinic"],
} as const;

type SubCategoryValue = (typeof Subcategories)[Categories["category"]][number] | "all";

type SubCategoryContextType = {
  category: Categories["category"] | undefined;
  setCategory: Dispatch<SetStateAction<Categories["category"]>>;
  subCategory: SubCategoryValue;
  setSubCategory: Dispatch<SetStateAction<SubCategoryValue>>;
};

export const SubCategoryContext = createContext<SubCategoryContextType>({
  category: undefined,
  setCategory: () => {},
  subCategory: "all",
  setSubCategory: () => {}
});

type SubCategoryProviderProps = {
  children: ReactNode;
  initialCategory: Categories["category"];
};

const getDefaultSubCategory = (category: Categories["category"]): SubCategoryValue => {
  return Subcategories[category]?.[0] || "all";
};

export function FilterSubCategoryProvider({ children, initialCategory }: SubCategoryProviderProps) {
  const [category, setCategory] = useState<Categories["category"]>(initialCategory);
  const [subCategory, setSubCategory] = useState<SubCategoryValue>(getDefaultSubCategory(initialCategory));

  return (
    <SubCategoryContext.Provider value={{ category, setCategory, subCategory, setSubCategory }}>
      {children}
    </SubCategoryContext.Provider>
  );
}