"use client";

import React, { useState } from "react";

import styles from "./search-input.module.css";

import { CiSearch } from "react-icons/ci";

type Props = {
  id: string;
  label?: string;
  placeholder: string;
};

export default function SearchInputComponent({
  id,
  label,
  placeholder,
}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearch = () => {};

  return (
    <div className={styles.search}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        placeholder={placeholder}
        type="text"
        id={id}
        value={searchTerm}
        onChange={handleInput}
      />
      {searchTerm && <CiSearch onClick={handleSearch} />}
    </div>
  );
}
