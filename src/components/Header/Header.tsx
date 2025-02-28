"use client";

import React, { useEffect, useState } from "react";

import styles from "./headerStyle.module.css";

import { IoCallOutline, IoSearch } from "react-icons/io5";

import Image from "next/image";
import { usePathname } from "next/navigation";

import logo from "@/assets/images/logo-english-new@2x.png";

import Button from "../Button/Button";

import { GoDownload } from "react-icons/go";
import { LuShieldQuestion, LuUserRound, LuUsersRound } from "react-icons/lu";
import { PiBriefcase } from "react-icons/pi";
import { HiOutlineMenu } from "react-icons/hi";

import SearchInputComponent from "../search-input/SearchInput.component";
import SelectOptionComponent from "../select-option/SelectOption.component";

import Sidebar from "../sidbar/SidebarComponent";
import ToggleLanguageComponent from "../toggle-language/ToggleLanguage.component";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const [selectedCity, setSelectedCity] = useState<string>(
    (t.raw("city") as { id: string; value: string }[])[0].value,
  );
  const locale = pathname.split("/")[1];
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
    <>
      <Sidebar isOpen={openSidebar} setIsOpen={setOpenSidebar}>
        <div className={styles.sidebarContainer}>
          <div className={styles.logo}>
            <Image src={logo} alt="Gashhook Logo" className={styles.logoImage} />
          </div>
          <div className={styles.selectOptionButtons}>
            <div className={styles.language}>
              <ToggleLanguageComponent />
            </div>
            <div>
              <SelectOptionComponent
                defaultValue={selectedCity}
                className="max-w-28"
                name="city"
                id="city"
                options={t.raw("city") as { id: string; value: string }[]}
              />
            </div>
          </div>
          <ul className={styles.actions}>
            <li>
              <Link href={`/${locale}/dashboard`}>
                <LuUserRound className={"size-7"} />
                {t("Header.myAccountButton")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/download`}>
                <GoDownload className={"size-7"} />
                {t("Header.downloadAppButton")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/download`}>
                <IoCallOutline className={"size-7"} />
                {t("contact-us.title")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/download`}>
                <LuUsersRound className={"size-7"} />
                {t("about-us.title")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/download`}>
                <LuShieldQuestion className={"size-7"} />
                {t("faq.title")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/download`}>
                <PiBriefcase className={"size-7"} />
                {t("rules.title")}
              </Link>
            </li>
          </ul>
        </div>
      </Sidebar>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.menu} onClick={() => setOpenSidebar(!openSidebar)}>
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
              options={t.raw("city") as { id: string; value: string }[]}
            />
            <SearchInputComponent
              id="search-header"
              placeholder={`${t("Header.searchPlaceholder")}${selectedCity}`}
            />
          </div>

          {/* Actions Section */}
          <div className={styles.actions}>
            <Button
              color="primary"
              outline={true}
              icon={<LuUserRound className={"w-5 h-5"} />}
              text={t("Header.myAccountButton")}
            />
            <Button
              color="primary"
              icon={<GoDownload className={"w-5 h-5"} />}
              text={t("Header.downloadAppButton")}
            />
          </div>
        </div>

        {/* Menu Section */}
        <nav className={styles.navMenu}>
          <button className={styles.active}>{locale === 'fa' ? selectedCity + t("Header.menuListMyCity") : t("Header.menuListMyCity") + selectedCity}</button>
          <button>
            {t("Header.sightCategory")}
          </button>
          <button>
            {t("Header.buyCategory")}
          </button>
          <button>
            {t("Header.eatCategory")}
          </button>
          <button>
            {t("Header.HotelCategory")}
          </button>
          <button>
            {t("Header.funCategory")}
          </button>
          <button>
            {t("Header.healthcareCategory")}
          </button>
          <button>
            {t("Header.menuListAboutCity")}
          </button>
        </nav>
      </header>
    </>
  );
}
