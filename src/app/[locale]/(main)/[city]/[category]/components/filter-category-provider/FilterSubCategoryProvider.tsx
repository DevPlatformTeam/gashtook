"use client";

import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";
import { Categories } from "@/app/[locale]/(main)/[city]/types/categories";

export const Subcategories = {
  attractions: ["nature", "museum", "historical", "religious-sites", "village"],
  shopping: ["bookstore", "hypermarket", "bazaar", "mall"],
  food: ["cafe", "fast-food", "restaurant", "coffee-shop"],
  accommodation: ["hotel", "motel", "apartment-hotel"],
  recreation: [
    "sports-club",
    "entertainmentAndGames",
    "marine",
    "cinema",
    "park",
    "amusement-park",
    "swim",
    "gym",
  ],
  treatment: ["hospital", "clinic", "pharmacy"],
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

const getDefaultSubCategory = (): SubCategoryValue => {
  return "all";
};

export function FilterSubCategoryProvider({ children, initialCategory }: SubCategoryProviderProps) {
  const [category, setCategory] = useState<Categories["category"]>(initialCategory);
  const [subCategory, setSubCategory] = useState<SubCategoryValue>(getDefaultSubCategory());

  return (
    <SubCategoryContext.Provider value={{ category, setCategory, subCategory, setSubCategory }}>
      {children}
    </SubCategoryContext.Provider>
  );
}