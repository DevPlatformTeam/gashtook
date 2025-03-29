import React from "react";
import Image from "next/image";
import IMG404 from "@/assets/images/image404.jpg";
import Button from "@/components/Button/Button";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { getTranslations, getLocale } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFoundPage");
  const locale = await getLocale();

  return (
    <>
      <Header />
      <div
        className="relative flex flex-col items-center mb-12 mt-12 bg-cover bg-center"
      >
        <div className="absolute inset-0 !bg-[#fff] "></div>
        
        <div className="w-80 md:w-5/12 relative md:h-96 ">
          <Image
            className="!relative h-full w-full object-cover"
            fill
            src={IMG404}
            alt={``}
          />
        </div>
        <div className="relative z-10 text-center px-4 justify-center items-center">
          <p className="text-3xl text-secondary mb-2">{t("title")}</p>
          <Link href={`/${locale}`} className="flex text-center justify-center !mt-8">
                  <Button
                    text={t("buttonContent")}
                    color="primary"
                  />
          </Link>

        </div>
        
      </div>
      <Footer />

    </>
  );
}
