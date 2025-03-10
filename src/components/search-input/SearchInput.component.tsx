"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./search-input.module.css";
import { CiSearch } from "react-icons/ci";
import { useLocale } from "next-intl";
import clsx from "clsx";

type Props = {
  id: string;
  label?: string;
  placeholder: string;
  className?: string;
};

export default function SearchInputComponent({
  id,
  label,
  placeholder,
  className,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const locale = useLocale();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/${locale}/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={clsx(styles.search, className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <CiSearch onClick={handleSearch} />
    </div>
  );
}
