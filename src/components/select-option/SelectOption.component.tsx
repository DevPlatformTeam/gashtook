"use client";

import React, { ReactElement, useState, useCallback, useRef } from "react";

import styles from "./select-option.module.css";

import { IoChevronDown } from "react-icons/io5";

type Props = {
  name: string;
  id: string;
  options: {
    id: string | number;
    value: string;
  }[];
  defaultValue?: string;
  label?: string;
  className?: string;
  setSelectedCity?: (city: string) => void;
} & React.ComponentPropsWithoutRef<"input">;

const SelectOptionComponent = React.memo(
  ({
    name,
    id,
    options,
    label,
    className,
    defaultValue,
    setSelectedCity,
    ...props
  }: Props): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const ref = useRef<HTMLInputElement>(null);

    const handleClear = useCallback(() => {
      setSearchTerm("");
    }, []);

    const handleSelect = useCallback(
      (item: { id: string | number; value: string }) => {
        setSearchTerm(item.value);
        setIsOpen(false);
      },
      [],
    );

    const handleClickIcon = () => {
      if (ref.current) {
        if (document.activeElement === ref.current) {
          ref.current.blur();
        } else {
          ref.current.focus();
        }
      }
    };

    return (
      <div className={`${styles.container} ${className}`}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          ref={ref}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          autoComplete="off"
          value={searchTerm || defaultValue}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className={styles.select}
          name={name}
          id={id}
          {...props}
        />
        <IoChevronDown
          className={`${isOpen ? "rotate-180" : ""}`}
          onMouseDown={(e) => {
            e.preventDefault(); // جلوگیری از از دست رفتن فوکوس ناخواسته
            handleClickIcon();
          }}
        />
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
