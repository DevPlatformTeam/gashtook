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
}

export default function Card({ src, label, alt, liked = false }: ICardProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-40 relative flex flex-col gap-2">
      {isLoading && <div>Loading...</div>}
      <Image
        className="!relative rounded-lg"
        fill
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
      {hasError && <div>Error loading image</div>}
      <button
        className="bg-primary shadow-lg flex justify-center items-center text-white rounded-full w-9 h-9 absolute end-3 bottom-11"
        type="button"
      >
        {liked ? <IoHeart size={22} /> : <IoMdHeartEmpty size={22} />}
      </button>
      <p className="ps-0.5 text-start">{label}</p>
    </div>
  );
}
