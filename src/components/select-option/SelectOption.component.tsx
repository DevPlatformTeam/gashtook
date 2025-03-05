"use client";

import React, { ReactElement, useState, useCallback, useRef, useEffect } from "react";

import styles from "./select-option.module.css";

import { IoChevronDown } from "react-icons/io5";

type Option = {
  id: string | number;
  value: string;
};

type Props = {
  name: string;
  id: string;
  options: Option[];
  defaultValue?: string;
  label?: string;
  className?: string;
  selectValue: { id: string; value: string } | null;
  setSelectValue: (value: { id: string; value: string } | null) => void;
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
    selectValue,
    setSelectValue,
    ...props
  }: Props): ReactElement => {

    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(selectValue?.value || defaultValue || "");
    const ref = useRef<HTMLInputElement>(null);
    const handleSelect = useCallback(
      (value: string) => {
        const selectedItem = options.find(option => option.value === value);
        if (selectedItem) {
          setInputValue(selectedItem.value);
          setIsOpen(false);
          setSelectValue({ id: selectedItem.id.toString(), value: selectedItem.value });
        }
      },
      [options, setSelectValue]
    );

    useEffect(() => {
      if (selectValue?.value && selectValue.value !== inputValue) {
        setInputValue(selectValue.value);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectValue]);

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
          value={inputValue}
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
            <ul className={`${styles.list} scroll`}>
              {options.map((item) => (
                <li
                  onMouseDown={() => handleSelect(item.value)}
                  className={styles.item}
                  key={item.id}
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
