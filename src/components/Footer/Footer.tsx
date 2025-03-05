import React from "react";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import Image from "next/image";
import Link from "next/link";

import logoFooter from "@/assets/images/logo-english-new.png";

import { MdOutlineEmail } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";

import { FaFacebookSquare, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <footer className="bg-background relative w-full">
      <div className="container pt-10">
        <div className="flex w-full flex-wrap gap-y-8">
            <div className="flex md:w-1/3 w-1/2 flex-col space-y-2 child:w-fit">
              <span className="font-bold">{t("gashtook")}</span>
              <Link href={`/${locale}/about-us`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("about")}</Link>
              <Link href={`/${locale}/contact-us`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("contact")}</Link>
              <Link href={`/${locale}/faq`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("faq")}</Link>
              <Link href={`/${locale}/rules`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("rules")}</Link>
            </div>
            <div className="flex md:w-1/3 w-1/2 flex-col space-y-2 child:w-fit">
              <span className="font-bold">{t("cities")}</span>
              <Link href={`/${locale}/tabriz`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("tabriz")}</Link>
              <Link href={`/${locale}/tehran`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("tehran")}</Link>
              <Link href={`/${locale}/mashhad`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("mashhad")}</Link>
              <Link href={`/${locale}/isfahan`} className="hover:text-primary hover:underline hover:font-bold transition-all duration-300">{t("isfahan")}</Link>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-bold inline grow-0">{t("contact-way")}</span>
              <a href={`mailto:${t("email")}`} className="flex items-center">
                <MdOutlineEmail size={24} className="me-1 text-primary" />
                {t("email")}
              </a>
              <a href={`tel:${t("phone")}`} className="flex items-center">
                <AiOutlinePhone size={24} className="me-1 text-primary" />
                {t("phone")}
              </a>
              <div className="w-full flex-between gap-4 child:text-primary child:text-2xl">
                <span><FaInstagram /></span>
                <span><FaTelegram /> </span>
                <span><FaLinkedin /></span>
                <span><FaFacebookSquare /></span>
              </div>
            </div>
              <Link className="w-full flex justify-center !mt-8" href={`/${locale}/`}>
                <Image src={logoFooter} alt={t("gashtook")} />
              </Link>
        </div>
        <div className="text-center pb-4">
          <span className="w-full h-[1px] bg-slate-200 block my-4"></span>
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
