"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import styles from "./ButtonDashboard.module.css";

import { useLocale, useTranslations } from "next-intl";
import { IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { LuUserRound } from "react-icons/lu";
import Swal from "sweetalert2";

type Props = {
  className?: string;
}

type UserInfoType = {
  email: string | null;
  mobile: string | null;
}

export default function ButtonDashboardComponent({ className }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const userInfo: UserInfoType = JSON.parse(localStorage.getItem("userInfo") || '{}') as UserInfoType;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRouteChange = (route: string) => {
    setIsOpen(false);
    router.push(`/${locale}/${route}`);
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

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Accept-Language": locale,
        },
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });

        setIsOpen(false);
        if (pathname.split("/").length === 2) {
          if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
            window.location.href = `/${process.env.NEXT_PUBLIC_BASE_URL}`;
          }
          else if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            window.location.reload();
          }
          else {
            location.href = `/${process.env.NEXT_PUBLIC_BASE_URL}`;
          }

        } else {
          window.location.assign(window.location.origin);
        }
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
        setIsOpen(false);
      }

    } catch (error) {
      console.log(error);

    }
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
