"use client";

import React, { ReactElement, useState, useCallback, useRef, useEffect } from "react";
import styles from "./select-option.module.css";
import { IoChevronDown } from "react-icons/io5";
import { useLocale, useTranslations } from "next-intl";

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

const SelectOptionSearchComponent = React.memo(
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
    const t = useTranslations();
    const locale = useLocale();

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(selectValue?.value || defaultValue || "");
    const ref = useRef<HTMLInputElement>(null);
    const handleSelect = useCallback(
      (value: string) => {
        const selectedItem = options.find(option => option.value === value);
        if (selectedItem) {
          setSearchTerm(selectedItem.value);
          setIsOpen(false);
          setSelectValue({ id: selectedItem.id.toString(), value: selectedItem.value });
        }
      },
      [options, setSelectValue]
    );

    useEffect(()=>{
      if (selectValue?.value && selectValue.value !== searchTerm) {
        setSearchTerm(selectValue.value);
      }
    },[searchTerm, selectValue])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setIsOpen(true);
    };

    const handleClickIcon = () => {
      if (ref.current) {
        if (document.activeElement === ref.current) {
          ref.current.blur();
        } else {
          ref.current.focus();
        }
      }
    };

    // فیلتر گزینه‌ها براساس searchTerm
    const filteredOptions = options.filter(option =>
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClear = () => {
      setSearchTerm("");
      setSelectValue(null);
      setIsOpen(false);
    };    

    return (
      <div className={`${styles.container} ${className}`}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          ref={ref}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onChange={handleInputChange}
          autoComplete="off"
          value={searchTerm}
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
              {filteredOptions.length > 0 ? filteredOptions.map((item) => (
                <li
                  onMouseDown={() => handleSelect(item.value)}
                  className={styles.item}
                  key={item.id}
                >
                  {item.value}
                </li>
              )) : (
                <li className={`${styles.item} text-sm`} onMouseDown={()=>handleClear()}>
                  {t("Dashboard.notFound", { type: locale === "fa" ? "شهری" : "city" })}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  },
);

SelectOptionSearchComponent.displayName = "SelectOptionSearchComponent";
export default SelectOptionSearchComponent;
