"use client";

import React from 'react';
import Swal from 'sweetalert2';
import { TbDeviceMobileCode } from 'react-icons/tb';
import { GoShare } from 'react-icons/go';
import { CgAddR } from 'react-icons/cg';
import Image from 'next/image';
import MainLogo from '@/assets/images/logo-english-new@2x.png';
import { useTranslations } from 'next-intl';
import { usePwaStatus } from './hooks/usePwaStatus';

export default function PwaGuidePage() {
  const t = useTranslations();
  const { isIOS, canPrompt, isInstalled, promptInstall } = usePwaStatus();

  const handleInstall = async () => {
    if (isInstalled) {
      Swal.fire({
        title: t("PWA.title"),
        text: t("PWA.alreadyInstalled"),
        icon: "info",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    if (isIOS) {
      Swal.fire({
        title: t("PWA.helpInstallerTitle"),
        text: t("PWA.helpInstallerText"),
        icon: "info",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
      return;
    }

    if (!canPrompt) {
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

    const outcome = await promptInstall();
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
  };

  return (
    <div className="container bg-white flex flex-col items-center py-10">
      <div className="bg-gradient-to-b from-primaryfade to-primary w-full rounded-2xl p-6 mb-8 text-white text-center">
        <h1 className="text-2xl font-bold mb-2">{t("PWA.title")}</h1>
        <p className="text-sm">{t("PWA.description")}</p>
      </div>

      <div className="flex flex-col items-center bg-gray-50 p-4 rounded-2xl shadow-md w-full max-w-md">
        <Image src={MainLogo} className="mb-10" alt="Gashtook logo" />

        <ol className="list-decimal list-inside text-start text-gray-700 space-y-4 mb-8">
          <li>{t("PWA.step1")} ( <GoShare className="inline size-7 text-primary" /> )</li>
          <li>{t("PWA.step2")} ( <CgAddR className="inline size-6 text-primary" /> )</li>
          <li>{t("PWA.step3")}</li>
        </ol>

        <button
          onClick={handleInstall}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primaryfade text-white font-bold py-3 mt-7 px-6 rounded-xl w-full"
        >
          <TbDeviceMobileCode size={28} />
          {t("PWA.addToHomeScreen")}
        </button>
      </div>
    </div>
  );
}
