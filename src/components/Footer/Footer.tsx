import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import logoFooter from "@/public/images/logo_footer.svg";

import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";

import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  return (
    <footer className="bg-background relative w-full">
      <div className="container pt-10">
        <div className="flex w-full flex-wrap justify-between">
          <div className="flex flex-wrap md:w-1/2 gap-y-6 w-full font-light">
            <div className="flex md:w-1/3 w-1/2 flex-col space-y-2">
              <span className="font-bold">{t("gashtook")}</span>
              <Link href={`/${locale}/about-us`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("about")}</Link>
              <Link href={`/${locale}/contact-us`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("contact")}</Link>
              <Link href={`/${locale}/faq`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("faq")}</Link>
              <Link href={`/${locale}/rules`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("rules")}</Link>
            </div>
            <div className="flex md:w-1/3 w-1/2 flex-col space-y-2">
              <span className="font-bold">{t("cities")}</span>
              <span>{t("tabriz")}</span>
              <span>{t("tehran")}</span>
              <span>{t("mashhad")}</span>
              <span>{t("isfahan")}</span>
            </div>
            <div className="flex md:w-1/3 w-1/2 flex-col space-y-2">
              <span className="font-bold">{t("places")}</span>
              <span>{t("museum")}</span>
              <span>{t("entertainment")}</span>
              <span>{t("business")}</span>
              <span>{t("tourism")}</span>
            </div>
          </div>
          <div className="flex md:w-1/2 w-full lg:mt-0 mt-10 lg:justify-end">
            <div className="md:w-2/3 w-full flex flex-col space-y-2">
              <span className="font-bold">{t("contact-way")}</span>
              <span className="flex items-center">
                <MdOutlineLocationOn size={24} className="me-1 text-primary" />
                {t("address")}
              </span>
              <span className="flex items-center">
                <AiOutlinePhone size={24} className="me-1 text-primary" />
                {t("phone")}
              </span>
              <div className="h-20 w-full flex justify-end">
                <Image src={logoFooter} alt={t("gashtook")} />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center pb-4">
          <span className="w-full h-[1px] bg-slate-200 block my-4"></span>
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
