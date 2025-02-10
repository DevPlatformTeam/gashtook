"use client";

import React, { useContext } from "react";

import styles from "./radio-button.module.css";
import { FilterContext } from "@/app/search/components/filter/filter-provider.component";

type Props = {
  inputs: {
    id: string;
    value: string;
  }[];
  name: string;
};

export default function RadioButtonComponent({ inputs, name }: Props) {
  const { filters, dispatch } = useContext(FilterContext);

  const handleClick = (value: string) => {
    dispatch({ type: "update_filter", key: "gender", payload: value });
  };

  return (
    <div className={styles["radio-buttons"]}>
      {inputs.map((item) => {
        return (
          <div className={styles["radio-item"]} key={item.id}>
            <input
              onChange={() => handleClick(item.id)}
              type="radio"
              name={name}
              id={item.id}
              value={item.value}
              checked={filters.gender === item.id}
            />
            <label htmlFor={item.id}>{item.value}</label>
          </div>
        );
      })}
    </div>
  );
}
