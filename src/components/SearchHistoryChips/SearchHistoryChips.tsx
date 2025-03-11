"use client";

import React from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface SearchHistoryChipsProps {
  text: string;
  onClick?: () => void;
}

export default function SearchHistoryChips({ text, onClick } : SearchHistoryChipsProps) {
  const locale = useLocale();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (onClick) onClick(); 
    router.push(`/${locale}/search?query=${text}`);
  };

  return (
    <a href={`/${locale}/search?query=${text}`} onClick={handleClick} className="cursor-pointer flex-center gap-x-2 rounded-full px-4 border border-1 border-slate-200">
      <span className="!flex-center pt-1">{text}</span>
      {locale === "en" ? <IoIosArrowForward /> : <IoIosArrowBack />}
    </a>
  );
}
