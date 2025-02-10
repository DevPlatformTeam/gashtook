"use client";

import React, { ReactElement, useState, useCallback } from "react";

import styles from "./select-option.module.css";

import { IoClose } from "react-icons/io5";

type Props = {
  name: string;
  id: string;
  options: {
    id: string | number;
    value: string;
  }[];
  label?: string;
} & React.ComponentPropsWithoutRef<"input">;

const SelectOptionComponent = React.memo(
  ({ name, id, options, label, ...props }: Props): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Handle clearing the search term
    const handleClear = useCallback(() => {
      setSearchTerm("");
    }, []);

    const handleSelect = useCallback(
      (item: { id: string | number; value: string }) => {
        setSearchTerm(item.value);
      },
      [],
    );

    return (
      <div className={styles.container}>
        <label htmlFor={id}>{label}</label>
        <input
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className={styles.select}
          name={name}
          id={id}
          {...props}
        />
        {searchTerm && <IoClose onClick={handleClear} />}
        {isOpen && (
          <div className={styles["container-list"]}>
            <ul className={styles.list + " scroll"}>
              {options.map((item) => (
                <li
                  onMouseDown={() => handleSelect(item)}
                  className={styles.item}
                  key={item.id}
                  value={item.value}
                >
                  {item.value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);

SelectOptionComponent.displayName = "SelectOptionComponent";

export default SelectOptionComponent;
