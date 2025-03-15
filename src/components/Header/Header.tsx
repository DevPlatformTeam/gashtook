"use client";

import React, { useEffect, useState } from "react";

import styles from "./headerStyle.module.css";

import { IoCallOutline } from "react-icons/io5";

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
import MobileSearchModal from "../MobileSearchModal/MobileSearchModal";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import ButtonDashboardComponent from "../ButtonDashboard/ButtonDashboard.component";
import { IoIosLogOut } from "react-icons/io";
import LogoutFunction from "@/utils/LogoutFunction";
import { CiLogin } from "react-icons/ci";

type City = {
  id: string;
  value: string;
}

type UserInfoType = {
  email: string | null;
  mobile: string | null;
}

export default function Header() {
  const t = useTranslations();
  const locale = useLocale() as "fa" | "en";
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isToken, setIsToken] = useState<boolean>(false);

  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const city = pathname.split("/")[2];
  const lastPath = pathname.split("/").pop();
  const [resize, setResize] = useState<number>(0);

  const categories = t.raw("category.categories") as { value: string }[];

  const userInfo: UserInfoType = JSON.parse(localStorage.getItem("userInfo") || '{}') as UserInfoType;

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
  }, [pathname, resize, selectedCity]);

  const getCookieValue = (name: string) => {

    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }


  useEffect(() => {
    const isAuthenticated = getCookieValue("isAuthenticate");

    if (city !== selectedCity?.id) {
      const selectedItem = t.raw("city").find((option: City) => option.id === city);
      setSelectedCity(selectedItem);
    }

    if (isAuthenticated === "true") {
      setIsToken(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (selectedCity && selectedCity?.id !== city) {
      router.push(`/${locale}/${selectedCity?.id}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  const handleCategoryClick = (nav: string) => {
    if (nav === selectedCity?.id) {
      router.push(`/${locale}/${selectedCity.id}`);
    } else if (nav === "city-details") {
      router.push(`/${locale}/${selectedCity?.id}/${nav}`);
    } else {
      router.push(`/${locale}/${selectedCity?.id}/${nav}`);
    }
  };

  const handleLogout = () => {
    LogoutFunction({ locale, pathname, setIsOpen })
  }
  

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={styles.sidebarContainer}>
          <Link className={styles.logo} href={`/${locale}/`}>
            <Image src={logo} alt="Gashhook Logo" className={styles.logoImage} />
          </Link>
          <div className={styles.selectOptionButtons}>
            <div className={styles.language}>
              <ToggleLanguageComponent className="w-32 flex-center" />
            </div>
            <div>
              <SelectOptionComponent
                selectValue={selectedCity}
                setSelectValue={setSelectedCity}
                className="max-w-32"
                name="city"
                id="city"
                placeholder={t("Header.selectCityPlaceholder")}
                options={t.raw("city") as City[]}
              />
            </div>
          </div>
          <ul className={styles.actions}>
            <li>
              <Link href={`/${locale}/dashboard`} className={`${lastPath === "dashboard" ? "text-primary" : ""}`}>
                {userInfo.mobile || userInfo.mobile ?
                  (<>
                    <LuUserRound className={"size-7"} />
                    {t("Dashboard.userAccount")}
                  </>)
                  :
                  (<>
                    <CiLogin className={"size-7"} />
                    {t("Header.loginOrRegister")}
                  </>)
                }
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/download`} className={`${lastPath === "download" ? "text-primary" : ""}`}>
                <GoDownload className={"size-7"} />
                {t("Header.downloadAppButton")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact-us`} className={`${lastPath === "contact-us" ? "text-primary" : ""}`}>
                <IoCallOutline className={"size-7"} />
                {t("contact-us.title")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/about-us`} className={`${lastPath === "about-us" ? "text-primary" : ""}`}>
                <LuUsersRound className={"size-7"} />
                {t("about-us.title")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/faq`} className={`${lastPath === "faq" ? "text-primary" : ""}`}>
                <LuShieldQuestion className={"size-7"} />
                {t("faq.title")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/rules`} className={`${lastPath === "rules" ? "text-primary" : ""}`}>
                <PiBriefcase className={"size-7"} />
                {t("rules.title")}
              </Link>
            </li>
            {(userInfo.mobile || userInfo.email) &&
              <li>
                <div onClick={handleLogout}>
                  <IoIosLogOut className={"size-7"} />
                  {t("Dashboard.logout")}
                </div>
              </li>
            }
          </ul>
        </div>
      </Sidebar>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.menu} onClick={() => setIsOpen(!isOpen)}>
            <HiOutlineMenu />
          </div>
          {/* Logo Section */}
          <Link className={styles.logo} href={`/${locale}/`}>
            <Image src={logo} alt="Gashhook Logo" className={styles.logoImage} />
          </Link>

          <div className={styles.language}>
            <ToggleLanguageComponent />
          </div>

          <MobileSearchModal />

          {/* Navigation Section */}
          <div className={styles.search}>
            <SelectOptionComponent
              selectValue={selectedCity}
              setSelectValue={setSelectedCity}
              className="max-w-32"
              name="city"
              id="city"
              placeholder={t("Header.selectCityPlaceholder")}
              options={t.raw("city") as City[]}
            />
            <SearchInputComponent
              id="search-header"
              placeholder={t("Header.mainSearchPlaceholder")}
            />
          </div>

          {/* Actions Section */}
          <div className={styles.actions}>
            {isToken ?
              <ButtonDashboardComponent />
              :
              <Button
                color="primary"
                outline={true}
                icon={<LuUserRound className={"w-5 h-5"} />}
                text={t("Header.myAccountButton")}
                onClick={() => router.push(`/${locale}/dashboard`)}
              />
            }
            <Button
              color="primary"
              icon={<GoDownload className={"w-5 h-5"} />}
              text={t("Header.downloadAppButton")}
              onClick={() => router.push(`/${locale}/download`)}
            />
          </div>
        </div>

        {/* Menu Section */}
        {selectedCity &&
          <nav className={styles.navMenu}>
            {pathname.split("/").length < 5 && <span className={styles.activeDisplayBottom}></span>}
            <button className={`${city === selectedCity?.id && lastPath === city ? styles.active : ""}`} onClick={() => handleCategoryClick(selectedCity?.id as string)}>{locale === 'fa' ? selectedCity?.value + t("Header.menuListMyCity") : t("Header.menuListMyCity") + selectedCity?.value}</button>
            <button className={`${lastPath === categories[0].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[0].value)}>
              {t("Header.sightCategory")}
            </button>
            <button className={`${lastPath === categories[1].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[1].value)}>
              {t("Header.buyCategory")}
            </button>
            <button className={`${lastPath === categories[2].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[2].value)}>
              {t("Header.eatCategory")}
            </button>
            <button className={`${lastPath === categories[3].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[3].value)}>
              {t("Header.HotelCategory")}
            </button>
            <button className={`${lastPath === categories[4].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[4].value)}>
              {t("Header.funCategory")}
            </button>
            <button className={`${lastPath === categories[5].value ? styles.active : ""}`} onClick={() => handleCategoryClick(categories[5].value)}>
              {t("Header.healthcareCategory")}
            </button>
            <button className={`${lastPath === "city-details" ? styles.active : ""}`} onClick={() => handleCategoryClick("city-details")}>
              {t("Header.menuListAboutCity")}
            </button>
          </nav>
        }
      </header>
    </>
  );
}