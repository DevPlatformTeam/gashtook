"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Button from "@/components/Button/Button";
import downloadApp from "@/assets/images/downloadapp.png";

import { BsBasket3Fill } from "react-icons/bs";
import { DiAndroid } from 'react-icons/di'
import { TbDeviceMobileCode, TbDeviceMobileDown } from "react-icons/tb";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function DownloadPage() {
  const t = useTranslations();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      Swal.fire({
        title: t("PWA.title"),
        text: t("PWA.unsupported"),
        icon: "warning",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      Swal.fire({
        title: t("PWA.title"),
        text: t("PWA.success"),
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="bg-slate-50 py-12 rounded-lg">
      <h2 className="w-[90%] lg:w-1/4 md:w-1/2 flex-center gap-x-0.5 bg-primary text-xl font-bold text-white rounded-e-full py-2 rounded-s-sm">
        <TbDeviceMobileDown size={46} />
        <span>{t("Places.downloadApp")}</span>
      </h2>
      <p className="container m-0 mt-12 text-sm lg:text-xl lg:mb-0 mb-12 text-primary leading-8 lg:leading-10 text-center mx-auto px-4">
        {t("Places.downloadAppInfo")}
      </p>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 items-center">
        <div className="">
          <Image src={downloadApp} alt="" />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <a href="https://cafebazaar.ir/app/com.gashtook.guides.app" target="_blank">
          <Button
            text={t("Places.downloadBazzar")}
            icon={<BsBasket3Fill />}
            iconFirst={false}
            iconSize="threeXl"
            className="!w-[240px] !justify-between"
          />
          </a>
          <a href={`/gashtook.apk`} download>
          <Button
            text={t("Places.downloadLink")}
            icon={<DiAndroid />}
            iconFirst={false}
            iconSize="threeXl"
            className="!w-[240px] !justify-between"
          />
          </a>
          <Button
            text={t("Places.downloadPWA")}
            icon={<TbDeviceMobileCode />}
            iconFirst={false}
            iconSize="fourXl"
            className="!w-[240px] !justify-between"
            onClick={handleInstallPWA}
          />
        </div>
      </div>
    </div>
  );
}
