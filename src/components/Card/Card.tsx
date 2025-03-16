"use client";

import React, { useState } from "react";

import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import Image from "next/image";

import styles from "./card.module.css";

interface ICardProps {
  src: string;
  label: string;
  alt: string;
  liked?: boolean;
  showLikedBtn?: boolean;
  city: string;
  handleLike?: (slug: string, city: string) => void;
}

export default function Card({
  src,
  label,
  alt,
  liked = false,
  showLikedBtn = true,
  handleLike,
  city,
}: ICardProps) {
  const [isLoading, setIsLoading] = useState(true);

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
        />
      <div className={styles.textContainer}>
        <p className={styles.title}>{label}</p>
        {showLikedBtn && (
          <button
            className={styles.likeButton}
            onClick={() => handleLike?.(alt, city)}
          type="button"
        >
          {liked ? <IoMdHeart className='text-primary' size={28} /> : <IoMdHeartEmpty className='text-gray-400 hover:text-primary transition-colors' size={28} />}
          </button>
        )}
      </div>
    </div>
  );
}
