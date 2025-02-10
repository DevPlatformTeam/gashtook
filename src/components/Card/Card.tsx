"use client";

import React, { useState } from "react";

import Image from "next/image";

interface ICardProps {
  src: string;
  label: string;
  alt: string;
}

export default function Card({ src, label, alt }: ICardProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-[254px] h-auto relative">
      {isLoading && <div>Loading...</div>}
      <Image
        className="rounded-lg"
        width={254}
        height={168}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
      {hasError && <div>Error loading image</div>}
      <button
        className="primary-bg text-white rounded-full w-9 h-9 absolute bottom-10 left-5"
        type="button"
      >
        A
      </button>
      <span className="pt-5">{label}</span>
    </div>
  );
}
