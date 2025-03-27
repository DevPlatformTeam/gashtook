import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import MainLogo from "@/assets/images/logo-english-new@2x.png";
import Button from "@/components/Button/Button";
import { Link } from "@/i18n/routing";

export default function Page() {
  const t = useTranslations("buy-subscription");


  return (
    <div className="flex items-center justify-center mt-24 mb-24 bg-white p-4">
      <div className="w-full sm:max-w-lg sm:bg-white sm:shadow-lg sm:rounded-2xl sm:p-12 text-center flex flex-col items-center gap-6">
        <div className="flex justify-center mb-6">
          <Image src={MainLogo} alt="Logo" width={160} height={55} />
        </div>
        <p className="text-gray-700 text-xl font-semibold">{t("freeLimitReached")}</p>
        <p className="text-gray-500 text-lg leading-relaxed max-w-sm">{t("subscribeForMore")}</p>
        <Link href={`dashboard/subscription-management/packages`}>
        <Button 
          text={t("subscribeButton")} 
          color="primary" 
          className="w-full max-w-xs" 
        />
        </Link>

      </div>
    </div>
  );
}
