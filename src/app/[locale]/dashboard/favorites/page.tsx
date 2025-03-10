"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import NoDataSvg from "@/icons/NoDataSvg";
import { useTranslations, useLocale } from "next-intl";
import Swal from "sweetalert2";

interface CardData {
  image_url: string;
  name: string;
  slug: string;
  is_liked: boolean;
}

export default function Page() {
  const t = useTranslations();
  const locale = useLocale();
  const [cards, setCards] = useState<CardData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/favorites", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        const result = await response.json();
        
        setCards(result.data.data || []);
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
  }, [t]);

  return (
    <div className="h-full text-start">
      <h1 className="hidden lg:block text-xl font-bold pb-4 mx-6 border-b-2 border-gray-200">
        {t("Dashboard.favorites")}
      </h1>

      {loading ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full overflow-y-auto px-6 pt-4">
          {[...Array(4)].map((_, index) => (
            <li key={index}>
              <SkeletonCard />
            </li>
          ))}
        </ul>
      ) : cards && cards.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full overflow-y-auto px-6 pt-4">
          {cards.map((card) => (
            <li key={card.slug}>
              <Card src={card.image_url} alt={card.slug} label={card.name} liked={card.is_liked} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full h-full flex-center flex-col gap-4">
          <NoDataSvg className="max-w-48 h-48" />
          <p className="text-center text-gray-500">
            {t("Dashboard.notFound", { type: locale === "fa" ? "علاقه‌مندی‌ای" : "favorite" })}
          </p>
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="min-h-40 relative flex flex-col gap-2">
      <div className="relative w-full h-52">
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>
      </div>
      <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
}


