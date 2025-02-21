"use client";

import React, { createContext, ReactNode, useReducer } from "react";

import { Categories } from "@/app/[locale]/(main)/[city]/types/categories";

import {
  Action,
  filtersReducer,
  initialState,
} from "@/reducers/CategoryFilter";

type Props = {
  children: ReactNode;
};

type FilterCategoryContextType = {
  category: Categories[keyof Categories];
  dispatch: React.Dispatch<Action>;
};

export const FilterCategoryContext = createContext<FilterCategoryContextType>({
  category: initialState,
  dispatch: () => {},
});

export default function FilterCategoryProvider({ children }: Props) {
  const [category, dispatch] = useReducer(filtersReducer, initialState);

  return (
    <FilterCategoryContext.Provider value={{ category, dispatch }}>
      {children}
    </FilterCategoryContext.Provider>
  );
}
