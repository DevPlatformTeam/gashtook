"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import NoDataSvg from "@/icons/NoDataSvg";
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from "next-intl";
import Swal from "sweetalert2";

interface CardData {
  image_url: string;
  name: string;
  slug: string;
  is_liked: boolean;
  city_slug: string;
  category_slug: string;
  favorites_count: string;
}

export default function Page() {
  const t = useTranslations();
  const locale = useLocale();

  const [cards, setCards] = useState<CardData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  const fetchLikedPlaces = async () => {
    try {
      const response = await fetch("/api/dashboard/favorites", {
        credentials: "include",
        headers: { Accept: "application/json", "Authorization": `Bearer ${token}` },
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
  }
    

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch("/api/auth/token", {
        credentials: 'include',
      });
      const data = await response.json();

        if (response.status === 401) {
          setToken(null);
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: t("ToastMessages.titleError"),
            text: t("Favorites.errorMessageAuth"),
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          setTimeout(() => {
            router.push(`/${locale}/auth/login`); 
          }, 3000);
      }

      if (data.token) {
        setToken(data.token.value);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    fetchLikedPlaces();
  }, [token]);

  const handleLike = async (slug: string, city: string) => {
    try {
      const response = await fetch("/api/dashboard/favorites", {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          "city": city,
          "place": slug
        })
      }).then(res => res.json());

      if (response.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: t("ToastMessages.titleSuccess"),
          text: response.data.favorite === "remove" ? t("Favorites.successRemoveMessage") : t("Favorites.successAddMessage"),
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });

        fetchLikedPlaces();
      } else if (!response.ok && response.code === 401) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("ToastMessages.titleError"),
          text: t("Favorites.errorMessageAuth"),
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        text: t("Favorites.errorMessage"),
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
      console.log(error);
    }
  };

  return (
    <div className="h-full text-start">
      <h1 className="hidden lg:block text-xl font-bold pb-4 mx-6 border-b-2 border-gray-200">
        {t("Dashboard.favorites")}
      </h1>

      {loading ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 h-fit overflow-y-auto px-6 pt-4">
          {[...Array(4)].map((_, index) => (
            <li className="h-full" key={index}>
              <SkeletonCard />
            </li>
          ))}
        </ul>
      ) : cards && cards.length > 0 ? (
        <div className="h-full md:max-h-[calc(100vh-16.5rem)] overflow-y-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 h-fit px-6 py-4">
            {cards.map((card) => (
              <li className="h-fit" key={card.slug}>
                <Card src={card.image_url} alt={card.slug} label={card.name} liked={true} favorites_count={card.favorites_count} handleLike={handleLike} city={card.city_slug} category={card.category_slug} place={card.slug} />
              </li>
            ))}
          </ul>
        </div>
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
    <div className="relative flex flex-col gap-2">
      <div className="relative w-full h-52">
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>
      </div>
      <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
}


