"use client";

import React, { useState } from "react";

import styles from "./header-component.module.css";

import { IoChevronDown } from "react-icons/io5";

import Image from "next/image";

import logo from "@/assets/images/logo-english-new@2x.png";
import Button from "../Button/Button";
import { GoDownload } from "react-icons/go";
import { LuUserRound } from "react-icons/lu";
import SearchInputComponents from "../Search-comments/SearchInput.components";
import SelectOptionComponent from "../Select-option/SelectOption.component";

export default function HeaderComponent() {
  const [selectedCity, setSelectedCity] = useState<string>("تهران");

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerTop}`}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <Image src={logo} alt="Gashhook Logo" className={styles.logoImage} />
        </div>

        {/* Navigation Section */}
        <div className={styles.search}>
          <SelectOptionComponent
            defaultValue={selectedCity}
            className="max-w-36"
            name="city"
            id="city"
            options={[
              { id: "1", value: "تهران" },
              { id: "2", value: "مشهد" },
            ]}
          />
          <SearchInputComponents
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
        <button>تهران من</button>
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
