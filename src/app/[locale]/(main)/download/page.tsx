import React from "react";
import Image from "next/image";

import Button from "@/components/Button/Button";
import downloadApp from "@/assets/images/downloadapp.png";

import { BsBasket3Fill } from "react-icons/bs";
import { DiAndroid } from 'react-icons/di'
import { TbDeviceMobileCode, TbDeviceMobileDown } from "react-icons/tb";
import { useTranslations } from "next-intl";

export default function DownloadPage() {
  const t = useTranslations();

  return (
    <div className="bg-slate-50 py-12 rounded-lg">
      <h2 className="w-[90%] lg:w-1/4 md:w-1/2 flex-center gap-x-0.5 bg-primary text-xl font-bold text-white rounded-e-full py-2 rounded-s-sm">
        <TbDeviceMobileDown size={46} />
        <span>{t("Places.downloadApp")}</span>
      </h2>
      <p className="m-0 mt-12 md:text-center text-xl lg:mb-0 mb-12 text-primary w-full lg:w-1/3 leading-8 mx-auto px-4 text-justify">
        {t("Places.downloadAppInfo")}
      </p>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 items-center">
        <div className="">
          <Image src={downloadApp} alt="" />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Button
            text={t("Places.downloadBazzar")}
            icon={<BsBasket3Fill />}
            iconFirst={false}
            iconSize="threeXl"
            className="!w-[240px] !justify-between"
          />
          <Button
            text={t("Places.downloadLink")}
            icon={<DiAndroid />}
            iconFirst={false}
            iconSize="threeXl"
            className="!w-[240px] !justify-between"
          />
          <Button
            text={t("Places.downloadPWA")}
            icon={<TbDeviceMobileCode />}
            iconFirst={false}
            iconSize="fourXl"
            className="!w-[240px] !justify-between"
          />
        </div>
      </div>
    </div>
  );
}
