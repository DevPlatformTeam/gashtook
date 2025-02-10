import { useTranslations } from "next-intl";
import React from "react";

import logoFooter from "@/public/images/logo_footer.svg";

import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";

import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="container">
      <div className="flex w-full justify-between">
        <div className="flex w-1/2 font-light">
          <div className="flex w-1/3 flex-col space-y-2">
            <span className="font-bold">{t("gashtook")}</span>
            <span>{t("about")}</span>
            <span>{t("contact")}</span>
            <span>{t("faq")}</span>
            <span>{t("rules")}</span>
          </div>
          <div className="flex w-1/3 flex-col space-y-2">
            <span className="font-bold">{t("cities")}</span>
            <span>{t("tabriz")}</span>
            <span>{t("tehran")}</span>
            <span>{t("mashhad")}</span>
            <span>{t("isfahan")}</span>
          </div>
          <div className="flex w-1/3 flex-col space-y-2">
            <span className="font-bold">{t("places")}</span>
            <span>{t("museum")}</span>
            <span>{t("entertainment")}</span>
            <span>{t("business")}</span>
            <span>{t("tourism")}</span>
          </div>
        </div>
        <div className="flex w-1/2 justify-end">
          <div className="w-2/3 flex flex-col space-y-2">
            <span className="font-bold">{t("contact-way")}</span>
            <span className="flex items-center"> 
				<MdOutlineLocationOn size={24} className="me-1 text-primary"/>
				{t("address")}
			</span>
            <span className="flex items-center">
				<AiOutlinePhone size={24} className="me-1 text-primary"/>
				{t("phone")}
			</span>
            <div className="h-20 w-full flex justify-end">
              <Image src={logoFooter} alt={t("gashtook")} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <span className="w-full h-[1px] bg-slate-200 block my-4"></span>
        <p>{t("copyright")}</p>
      </div>
    </footer>
  );
}
