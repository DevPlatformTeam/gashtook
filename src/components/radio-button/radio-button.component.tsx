"use client";

import React from "react";

import styles from "./radio-button.module.css";

type Props = {
  inputs: {
    id: string;
    value: string;
  }[];
  name: string;
};

export default function RadioButtonComponent({ inputs, name }: Props) {
  return (
    <div className={styles["radio-buttons"]}>
      {inputs.map((item) => {
        return (
          <div className={styles["radio-item"]} key={item.id}>
            <input type="radio" name={name} id={item.id} value={item.value} />
            <label htmlFor={item.id}>{item.value}</label>
          </div>
        );
      })}
    </div>
  );
}
