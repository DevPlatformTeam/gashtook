"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";

import styles from "./toggleLanguageStyle.module.css";

import IranFlagSvg from "@/icons/IranFlagSvg";
import EnglishFlagSvg from "@/icons/EnglishFlagSvg";

type Props = {
  className?: string;
}

export default function ToggleLanguageComponent({className}: Props) {
  const { locale } = useParams<{ locale: "fa" | "en" }>();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLanguageChange = (language: "fa" | "en") => {
    setIsOpen(false);
    const newPath = pathname.replace(/^\/(fa|en)/, `/${language}`);
    router.push(newPath);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.language + " " + className}>
      <button onClick={toggleDropdown} className={styles["button-language"]}>
        {locale === "fa" ? "فارسی" : "English"}
        {locale === "fa" ? <IranFlagSvg /> : <EnglishFlagSvg />}
      </button>
      {isOpen && (
        <div className={styles["list-languages"]}>
          <div
            onClick={() => handleLanguageChange("fa")}
            className={`${locale === "fa" ? "bg-gray-300" : "hover:bg-gray-100"}`}
          >
            فارسی
            <IranFlagSvg />
          </div>
          <div
            onClick={() => handleLanguageChange("en")}
            className={`${locale === "en" ? "bg-gray-300" : "hover:bg-gray-100"}`}
          >
            English
            <EnglishFlagSvg />
          </div>
        </div>
      )}
    </div>
  );
}
