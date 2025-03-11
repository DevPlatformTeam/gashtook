"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";
import { useTranslations, useLocale } from "next-intl";

import { CgTrash } from "react-icons/cg";
import { RiHistoryFill } from "react-icons/ri";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoSearch, IoArrowBack, IoArrowForward } from "react-icons/io5";

import SearchHistoryChips from "../SearchHistoryChips/SearchHistoryChips";

export default function MobileSearchModal() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Search");

  useEffect(() => {
    if (isModalOpen) {
      const storedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      setSearchHistory(storedHistory);
    }
  }, [isModalOpen]);

  const handleSearchSubmit = () => {
    if (!searchInput.trim()) return;

    let updatedHistory = [searchInput, ...searchHistory.filter(item => item !== searchInput)];
    updatedHistory = updatedHistory.slice(0, 10); 

    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSearchInput("");

    setIsModalOpen(false);
    router.push(`/${locale}/search?query=${searchInput}`);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <IoSearch size={30} />
      </div>

      <Transition
        show={isModalOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        <div className="fixed inset-0 z-50 bg-white flex items-start pt-6">
          <div className="w-full">
            {/* بخش جستجو */}
            <div className="flex items-center gap-x-3 px-4">
              <button onClick={() => setIsModalOpen(false)}>
                {locale === "fa" ? (
                  <IoArrowForward size={28} className="text-2xl" />
                ) : (
                  <IoArrowBack size={28} className="text-2xl" />
                )}
              </button>
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                autoFocus
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()} // ثبت جستجو با Enter
                className="flex-1 text-sm border bg-slate-50 border-slate-400 rounded p-2 mx-1 focus-visible:outline-primary"
              />
            </div>

            {/* تاریخچه جستجو */}
            <div className="w-full mt-12 border-b-[2px] pb-4 px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <RiHistoryFill className="text-slate-500" size={24} />
                  <span className="text-sm text-slate-600">{t("history")}</span>
                </div>
                {/* دکمه حذف تاریخچه */}
                {searchHistory.length > 0 && (
                  <button onClick={clearHistory}>
                    <CgTrash size={28} className="text-slate-500" />
                  </button>
                )}
              </div>

              {/* نمایش تاریخچه */}
              <div className="flex mt-4 overflow-x-auto pb-3 gap-x-3 scroll">
                {searchHistory.length > 0 ? (
                  searchHistory.map((item, index) => <SearchHistoryChips onClick={() => setIsModalOpen(false)} key={index} text={item} />)
                ) : (
                  <span className="text-gray-500 text-sm">{t("noHistory")}</span>
                )}
              </div>
            </div>

            {/* محبوب‌ترین جستجوها (صرفاً جهت نمایش) */}
            <div hidden className="w-full mt-12 border-b-[2px] pb-4 px-4">
              <div className="flex items-center gap-x-2">
                <MdOutlineLocalFireDepartment className="text-slate-500" size={26} />
                <span className="text-sm text-slate-600">{t("top")}</span>
              </div>
              <div className="flex mt-4 overflow-x-auto pb-3 gap-x-3 scroll">
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}
