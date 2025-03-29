"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/public/images/logo-white.svg";
import ToggleBox from "@/components/Toggle-box/ToggleBox.component";
import NoDataSvg from "@/icons/NoDataSvg";
import { useLocale, useTranslations } from "next-intl";
import Swal from "sweetalert2";
import TimeAgo from "@/components/Time-ago/TimeAgo";

interface Notification {
  _id: string;
  body: string;
  title: string;
  sent_at: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Notification[];
}

export default function Page() {
  const t = useTranslations();
  const locale = useLocale();
  const [cards, setCards] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/notifications", {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Accept-Language": locale,
          },
        });
        const data: ApiResponse = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setCards(data.data);
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("error-login"),
          text: error instanceof Error ? error.message : String(error),
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale, t]);

  return (
    <div className="h-full text-start">
      <h1 className="hidden lg:block text-xl font-bold mx-6 pb-4 border-b-2 border-gray-200">
        {t("Dashboard.notifications")}
      </h1>

      {loading ? (
        <ul className="h-full overflow-y-auto px-6 pt-4 pb-8 divide-y divide-gray-100">
          {[...Array(4)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </ul>
      ) : cards.length > 0 ? (
        <ul className="h-full overflow-y-auto px-6 pt-4 pb-8 divide-y divide-gray-100">
          {cards.map((notification) => (
            <ToggleBox key={notification._id} className="hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-primary p-1.5 shrink-0">
                  <Image className="size-full" src={Logo} alt="Gashtook" loading="lazy" />
                </div>
                <p className="font-semibold">{notification.title}</p>
              </div>

              <p className="text-gray-700">{notification.body}</p>

              <TimeAgo sentAt={notification.sent_at} />
            </ToggleBox>
          ))}
        </ul>
      ) : (
        <div className="w-full h-full flex-center flex-col gap-4">
          <NoDataSvg className="max-w-48 h-48" />
          <p className="text-center text-gray-500">
            {t("Dashboard.notFound", { type: locale === "fa" ? "اعلانی" : "notification" })}
          </p>
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-gray-100 animate-pulse p-4 rounded-lg space-y-3">
      <div className="flex items-center gap-2">
        <div className="size-8 bg-gray-300 rounded-full"></div>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </div>

      <div className="w-full h-3 bg-gray-300 rounded"></div>
      <div className="w-3/4 h-3 bg-gray-300 rounded"></div>

      <div className="w-20 h-3 bg-gray-300 rounded"></div>
    </div>
  );
}
