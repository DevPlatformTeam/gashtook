"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Breadcrumb() {
  const locale = useLocale();
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getItemClass = (itemIndex: number) => {
    if (activeIndex === null) {
      return "text-gray-400";
    }
    return itemIndex <= activeIndex ? "text-primary" : "text-gray-300";
  };

  return (
    <nav className="text-sm hidden" hidden>
      <ul
        className="flex items-center gap-1"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {paths.map((segment, index) => {
          const liIndex = index + 1;
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          return (
            <li
              key={href}
              onMouseEnter={() => setActiveIndex(liIndex)}
              className={`flex items-center gap-1 ${getItemClass(liIndex)}`}
            >
              {isLast ? (
                <span className="font-semibold">
                  {decodeURIComponent(segment)}
                </span>
              ) : (
                <Link href={href} className="flex items-center gap-1">
                  {decodeURIComponent(segment)}
                  {locale === "fa" ? (
                    <FaChevronLeft className="w-3 h-3 mx-1 -mt-0.5" />
                  ) : (
                    <FaChevronRight className="w-3 h-3 mx-1 -mt-0.5" />
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
