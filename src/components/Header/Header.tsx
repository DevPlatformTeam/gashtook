"use client";

import React, { useEffect, useState } from "react";

import styles from "./headerStyle.module.css";

import { IoCallOutline, IoSearch } from "react-icons/io5";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const [selectedCity, setSelectedCity] = useState<{ id: string; value: string }>((t.raw("city") as { id: string; value: string }[])[0]);
  const locale = pathname.split("/")[1];
  const [resize, setResize] = useState<number>(0);
  
  const categories = t.raw("category.categories") as { value: string }[];
  const [activeNav, setActiveNav] = useState<string | null>(null);

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

  const handleCategoryClick = (nav: string) => {
    if (nav === selectedCity.id) {
      setActiveNav(selectedCity.id);
      router.push(`/${locale}/${selectedCity.id}`);
    } else {
      setActiveNav(nav);
      router.push(`/${locale}/${selectedCity.id}/${nav}`);
    }
  };

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
                defaultValue={selectedCity.value}
                onChange={(e) => setSelectedCity(t.raw("city").find((city: { id: string; value: string }) => city.value === e.target.value) as { id: string; value: string })}
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
              <Link href={`/${locale}/contact-us`}>
                <IoCallOutline className={"size-7"} />
                {t("contact-us.title")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/about-us`}>
                <LuUsersRound className={"size-7"} />
                {t("about-us.title")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/faq`}>
                <LuShieldQuestion className={"size-7"} />
                {t("faq.title")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/rules`}>
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
              defaultValue={selectedCity.value}
              onChange={(e) => setSelectedCity(t.raw("city").find((city: { id: string; value: string }) => city.value === e.target.value) as { id: string; value: string })}
              className="max-w-28"
              name="city"
              id="city"
              options={t.raw("city") as { id: string; value: string }[]}
            />
            <SearchInputComponent
              id="search-header"
              placeholder={`${t("Header.searchPlaceholder")}${selectedCity.value}`}
            />
          </div>

          {/* Actions Section */}
          <div className={styles.actions}>
            <Button
              color="primary"
              outline={true}
              icon={<LuUserRound className={"w-5 h-5"} />}
              text={t("Header.myAccountButton")}
              onClick={() => router.push(`/${locale}/dashboard`)}
            />
            <Button
              color="primary"
              icon={<GoDownload className={"w-5 h-5"} />}
              text={t("Header.downloadAppButton")}
              onClick={() => router.push(`/${locale}/download`)}
            />
          </div>
        </div>

        {/* Menu Section */}
        <nav className={styles.navMenu}>
          <button className={`${activeNav === selectedCity.id ? styles.active : ""}`} onClick={() => handleCategoryClick(selectedCity.id)}>{locale === 'fa' ? selectedCity.value + t("Header.menuListMyCity") : t("Header.menuListMyCity") + selectedCity.value}</button>
          <button className={`${activeNav === categories[0].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[0].value)}>
            {t("Header.sightCategory")}
          </button>
          <button className={`${activeNav === categories[1].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[1].value)}>
            {t("Header.buyCategory")}
          </button>
          <button className={`${activeNav === categories[2].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[2].value)}>
            {t("Header.eatCategory")}
          </button>
          <button className={`${activeNav === categories[3].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[3].value)}>
            {t("Header.HotelCategory")}
          </button>
          <button className={`${activeNav === categories[4].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[4].value)}>
            {t("Header.funCategory")}
          </button>
          <button className={`${activeNav === categories[5].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[5].value)}>
            {t("Header.healthcareCategory")}
          </button>
          <button className={`${activeNav === "about" ? styles.active : ""}`} onClick={() => handleCategoryClick("about")}>
            {t("Header.menuListAboutCity")}
          </button>
        </nav>
      </header>
    </>
  );
}
