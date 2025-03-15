"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import styles from "./ButtonDashboard.module.css";

import { useLocale, useTranslations } from "next-intl";
import { IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { LuUserRound } from "react-icons/lu";
import LogoutFunction from "@/utils/LogoutFunction";

type Props = {
  className?: string;
}

type UserInfoType = {
  email: string | null;
  mobile: string | null;
}

export default function ButtonDashboardComponent({ className }: Props) {
  const locale = useLocale() as "fa" | "en";
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRouteChange = (route: string) => {
    setIsOpen(false);
    router.push(`/${locale}/${route}`);
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}') as UserInfoType;
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, []);

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

  const handleLogout = () => {
    LogoutFunction({ locale, pathname, setIsOpen})
  }


  return (
    <div ref={containerRef} className={styles.language + " " + className}>
      <button onClick={toggleDropdown} className={styles["button-language"]}>
        <div className="size-8 rounded-full p-1 bg-primaryfade/10">
          <LuUserRound className='size-full text-primary' />
        </div>
        <p className="max-w-20 line-clamp-1">
          {locale === "fa" && userInfo?.mobile ? userInfo?.mobile : locale === "fa" && !userInfo?.mobile ? userInfo?.email : locale === "en" && userInfo?.email ? userInfo?.email : userInfo?.mobile}
        </p>
      </button>
      {isOpen && (
        <div className={styles["list-languages"]}>
          <div
            onClick={() => handleRouteChange("dashboard")}
            className={styles.item}
          >
            <LuUserRound className="text-2xl text-gray-400" />
            {t("Dashboard.userAccount")}
          </div>
          <div
            onClick={() => handleRouteChange("dashboard/favorites")}
            className={styles.item}
          >
            <IoMdHeartEmpty className="text-2xl text-gray-400" />
            {t("Dashboard.favorites")}
          </div>
          <div
            onClick={handleLogout}
            className={styles.item}
          >
            <IoIosLogOut className="text-2xl text-gray-400" />
            {t("Dashboard.logout")}
          </div>
        </div>
      )}
    </div>
  );
}
