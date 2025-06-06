import React from "react";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import Image from "next/image";
import Link from "next/link";

import logoFooter from "@/assets/images/logo-english-new.png";

import { MdOutlineEmail } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";

import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa";
import EnamadSeal from "../Enamad/Enamad";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <footer className="bg-background relative w-full md:text-base text-sm">
      <div className="container pt-10">
        <div className="flex w-full flex-wrap gap-y-12">
          <div className="flex md:w-1/4 w-1/2 flex-col space-y-3 child:w-fit">
            <span className="font-bold">{t("gashtook")}</span>
            <Link
              href={`/${locale}/about-us`}
              className="hover:text-primary hover:underline hover:font-bold transition-all duration-300"
            >
              {t("about")}
            </Link>
            <Link
              href={`/${locale}/contact-us`}
              className="hover:text-primary hover:underline hover:font-bold transition-all duration-300"
            >
              {t("contact")}
            </Link>
            <Link
              href={`/${locale}/faq`}
              className="hover:text-primary hover:underline hover:font-bold transition-all duration-300"
            >
              {t("faq")}
            </Link>
            <Link
              href={`/${locale}/rules`}
              className="hover:text-primary hover:underline hover:font-bold transition-all duration-300"
            >
              {t("rules")}
            </Link>
          </div>
          <div className="flex md:w-1/4 w-1/2 flex-col space-y-3 child:w-fit">
            <span className="font-bold">{t("cities")}</span>
            <Link
              href={`/${locale}/tabriz`}
              className="hover:text-primary hover:underline hover:font-bold transition-all duration-300"
            >
              {t("tabriz")}
            </Link>
            <Link
              href={`/${locale}/tehran`}
              className="hover:text-primary hover:underline hover:font-bold transition-all duration-300"
            >
              {t("tehran")}
            </Link>
            <Link
              href={`/${locale}/mashhad`}
              className="hover:text-primary hover:underline hover:font-bold transition-all duration-300"
            >
              {t("mashhad")}
            </Link>
            <Link
              href={`/${locale}/isfahan`}
              className="hover:text-primary hover:underline hover:font-bold transition-all duration-300"
            >
              {t("isfahan")}
            </Link>
          </div>
          <div className="flex md:w-1/4 sm:w-1/2 w-full flex-col space-y-5">
            <span className="font-bold inline grow-0">{t("contact-way")}</span>
            <a href={`mailto:${t("email")}`} className="flex items-center">
              <MdOutlineEmail size={24} className="me-1 text-primary" />
              {t("email")}
            </a>
            <a
              href={`tel:+98${t("phoneNumber")}`}
              className="flex items-center"
            >
              <AiOutlinePhone size={24} className="me-1 text-primary" />
              <span className="ms-2">
                {locale == "fa" ? "0" : ""}
                {t("phoneNumber")}
              </span>
            </a>
            <div className="w-full flex items-center gap-5 child:text-primary child:text-2xl">
              <a href="https://instagram.com/gashtook_com" target="_blank">
                <FaInstagram />
              </a>
              <a href="https://t.me/gashtook" target="_blank">
                <FaTelegram />{" "}
              </a>
              <a
                href="https://www.linkedin.com/in/gashtook-com-127aa517a/"
                target="_blank"
              >
                <FaLinkedin />
              </a>
              <a href="https://facebook.com/gashtook" target="_blank">
                <FaFacebookSquare />
              </a>
            </div>
          </div>
          <div className="flex md:w-1/4 sm:w-1/2 w-full md:justify-end justify-center items-center space-y-5">
            <EnamadSeal />
          </div>
          <Link
            className="w-full flex justify-center !mt-8"
            href={`/${locale}/`}
          >
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
