"use client";

import React, { useEffect, useState } from "react";

import styles from "./headerStyle.module.css";

import { IoChevronDown, IoSearch } from "react-icons/io5";

import Image from "next/image";
import { usePathname } from "next/navigation";

import logo from "@/assets/images/logo-english-new@2x.png";

import Button from "../Button/Button";

import { GoDownload } from "react-icons/go";
import { LuUserRound } from "react-icons/lu";

import SearchInputComponent from "../search-input/SearchInput.component";
import SelectOptionComponent from "../select-option/SelectOption.component";

import { HiOutlineMenu } from "react-icons/hi";
import ToggleLanguageComponent from "../toggle-language/Togglelanguage.component";

export default function Header() {
  const pathname = usePathname();

  const [selectedCity, setSelectedCity] = useState<string>("تهران");
  const [resize, setResize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setResize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const activeElement = document.querySelector(
      `.${styles.active}`,
    ) as HTMLElement | null;

    if (activeElement) {
      const width = activeElement.offsetWidth;
      document.documentElement.style.setProperty("--line-li", `${width}px`);

      const leftOffset = activeElement.offsetLeft;
      document.documentElement.style.setProperty(
        "--offset-left",
        `${leftOffset}px`,
      );
    }
  }, [pathname, resize]);

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.menu}>
          <HiOutlineMenu />
        </div>
        {/* Logo Section */}
        <div className={styles.logo}>
          <Image src={logo} alt="Gashhook Logo" className={styles.logoImage} />
        </div>

        <div className={styles.language}>
          <ToggleLanguageComponent />
        </div>

        <div className={styles.mobileSearch}>
          <IoSearch />
        </div>

        {/* Navigation Section */}
        <div className={styles.search}>
          <SelectOptionComponent
            defaultValue={selectedCity}
            className="max-w-28"
            name="city"
            id="city"
            options={[
              { id: "1", value: "تهران" },
              { id: "2", value: "مشهد" },
            ]}
          />
          <SearchInputComponent
            className="max-w-76"
            id="search-header"
            placeholder="جستجوی مکان ها در تهران"
          />
        </div>

        {/* Actions Section */}
        <div className={styles.actions}>
          <Button
            color="primary"
            outline={true}
            icon={<LuUserRound className={"w-5 h-5"} />}
            text="حساب کاربری من"
          />
          <Button
            color="primary"
            icon={<GoDownload className={"w-5 h-5"} />}
            text="دانلود اپلیکیشن"
          />
        </div>
      </div>

      {/* Menu Section */}
      <nav className={styles.navMenu}>
        <button className={styles.active}>تهران من</button>
        <button>
          دیدنی
          <IoChevronDown />
        </button>
        <button>
          خوراکی
          <IoChevronDown />
        </button>
        <button>
          تفریحی
          <IoChevronDown />
        </button>
        <button>
          درمانی
          <IoChevronDown />
        </button>
        <button>
          اطلاعات شهر
          <IoChevronDown />
        </button>
      </nav>
    </header>
  );
}
