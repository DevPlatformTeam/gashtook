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
  selectValue: {
    id: string;
    value: string;
  };
  setSelectValue: (value: { id: string; value: string }) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentPropsWithoutRef<"input">;

const SelectOptionComponent = React.memo(
  ({
    name,
    id,
    options,
    label,
    className,
    defaultValue,
    onChange,
    selectValue,
    setSelectValue,
    ...props
  }: Props): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const ref = useRef<HTMLInputElement>(null);

    // const handleClear = useCallback(() => {
    //   setSearchTerm("");
    // }, []);

    const handleSelect = useCallback(
      (value: string) => {
        const selectedItem = options.find(option => option.value === value);
        if (selectedItem) {
          setSearchTerm(selectedItem.value);
          setIsOpen(false);
          onChange?.({ target: { value: selectedItem.id } } as React.ChangeEvent<HTMLInputElement>);
        }
      },
      [options, onChange]
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
          onChange={(e) => handleSelect(e.target.value)}
          readOnly
          autoComplete="off"
          value={selectValue.value || searchTerm || defaultValue}
          type="text"
          className={styles.select}
          name={name}
          id={id}
          {...props}
        />
        <IoChevronDown
          className={`${isOpen ? "rotate-180" : ""} ${label ? "top-11" : "top-3"}`}
          onMouseDown={(e) => {
            e.preventDefault();
            handleClickIcon();
          }}
        />
        {isOpen && (
          <div className={styles["container-list"]}>
            <ul className={styles.list + " scroll"}>
              {options.map((item) => (
                <li
                  onMouseDown={() => setSelectValue({ id: item.id.toString(), value: item.value })}
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
