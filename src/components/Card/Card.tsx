"use client";

import React, { useState } from "react";

import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import Image from "next/image";

import styles from "./card.module.css";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Swal from "sweetalert2";

type ICardProps = {
  src: string;
  label: string;
  alt: string;
  liked?: boolean;
  showLikedBtn?: boolean;
  city: string;
  category: string;
  place: string;
  favorites_count: string;
  is_collection?: boolean;
  handleLike?: (slug: string, city: string) => void;
} | {
  src: string;
  label: string;
  alt: string;
  liked?: boolean;
  category?: string;
  showLikedBtn?: boolean;
  city: string;
  place: string;
  favorites_count?: string;
  is_collection?: boolean;
  handleLike?: (slug: string, city: string) => void;
};

export default function Card({
  src,
  label,
  alt,
  liked = false,
  showLikedBtn = true,
  handleLike,
  city,
  category,
  place,
  is_collection = false,
  favorites_count
}: ICardProps) {
  const router = useRouter();

  const locale = useLocale();
  const t = useTranslations();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(liked);

  const handleLikeFunctions = async (slug: string, city: string) => {
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

        setIsLiked(!isLiked)
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
    <div className={styles.card}>
        {isLoading && (
          <div className={styles.loadingOverlay}></div>
        )}
        <Image
          className={`${styles.image} ${isLoading ? "opacity-0" : "opacity-100"}`}
          src={src}
          alt={alt}
          fill
          onLoad={() => setIsLoading(false)}
          onClick={()=>router.push(`/${locale}/${city}/${is_collection ? "collection" : category}/${place}`)}
        />
      <div className={styles.textContainer}>
        <p onClick={()=>router.push(`/${locale}/${city}/${is_collection ? "collection" : category}/${place}`)} className={styles.title}>{label}</p>
        {showLikedBtn && (
          <button
            className={styles.likeButton}
            onClick={() => handleLike ? handleLike?.(place, city) : handleLikeFunctions(place, city)}
          type="button"
        >
          {favorites_count !== "0" ? <span className='text-gray-500 text-base mt-1'>{favorites_count}</span> : null}
          {isLiked ? <IoMdHeart className='text-primary' size={28} /> : <IoMdHeartEmpty className='text-gray-400 hover:text-primary transition-colors' size={28} />}
          </button>
        )}
      </div>
    </div>
  );
}
