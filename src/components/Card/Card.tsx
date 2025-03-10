"use client";

import React, { useState } from "react";
import { IoHeart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import Image from "next/image";

interface ICardProps {
  src: string;
  label: string;
  alt: string;
  liked?: boolean;
  showLikedBtn?: boolean;
}

export default function Card({
  src,
  label,
  alt,
  liked = false,
  showLikedBtn = true,
}: ICardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-40 relative flex flex-col gap-2">
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>
        )}
        <Image
          className={`rounded-lg !relative drop-shadow-xl shadow-lg !w-96 !h-auto object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          src={src}
          alt={alt}
          fill
          onLoad={() => setIsLoading(false)}
        />
      </div>
      {showLikedBtn && (
        <button
          className="bg-primary shadow-lg flex justify-center items-center text-white rounded-full w-9 h-9 absolute end-3 bottom-11"
          type="button"
        >
          {liked ? <IoHeart size={22} /> : <IoMdHeartEmpty size={22} />}
        </button>
      )}
      <p className="ps-0.5 text-start">{label}</p>
    </div>
  );
}
