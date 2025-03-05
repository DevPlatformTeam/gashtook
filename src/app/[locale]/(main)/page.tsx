import "./style.css";

import { routing } from "@/i18n/routing";

import { FaCoffee } from "react-icons/fa";

import Button from "@/components/Button/Button";
import MainCard from "../components/MainCard/MainCard";
import SliderCardDefaultComponent from "@/components/SliderCardDefault/SliderCardDefault.component";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import slide1 from "@/assets/images/slider1.png";
import slide2 from "@/assets/images/roozbeh-eslami-o-2-e-9-zgo-r-fgc-unsplash@3x.jpg";

import mockup from "@/assets/images/mockup.svg";
import logo from "@/assets/images/logo-green.png";
import locationIcon from "@/assets/images/map-marker-alt.png";
import { getTranslations, getLocale } from "next-intl/server";
import { FetchData } from "@/components/Fetch/FetchData";


export default async function HomePage() {

  const t = await getTranslations("HomePage");
  const locale = await getLocale();

  const { data, error } = await FetchData("site/sliders");
  console.log(data, error);
  

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return notFound();
  }

  const cards = [
    { imageSrc: "https://picsum.photos/id/241/200/300", city: "تهران" },
    { imageSrc: "https://picsum.photos/id/111/200/300", city: "اصفهان" },
    { imageSrc: "https://picsum.photos/id/555/200/300", city: "شیراز" },
    { imageSrc: "https://picsum.photos/id/444/200/300", city: "مشهد" },
    { imageSrc: "https://picsum.photos/id/421/200/300", city: "تبریز" },
    { imageSrc: "https://picsum.photos/id/222/200/300", city: "کیش" },
  ];

  const slides = [
    { image: slide1, title: "تیاتل الکییی" },
    { image: slide2, title: "تیاتل الکییی" },
    { image: slide1, title: "تیاتل الکییی" },
    { image: slide2, title: "تیاتل الکییی" },
    { image: slide1, title: "تیاتل الکییی" },
    { image: slide2, title: "تیاتل الکییی" },
  ];

  return (
    <>
      <div className="w-full mt-5 justify-center items-center relative block">
        <div className="w-full lg:px-12 px-4 top-5 z-5 ">
          <SliderCardDefaultComponent slides={data} />
        </div>
        <div
          className={`md:flex md:justify-between w-full ${locale === "en" ? "flex-row-reverse" : ""
            }`}
        >
          <div className={`md:w-1/3 md:flex flex-col hidden`}>
            <Image
              src={locationIcon}
              alt="Slide 4"
              className={` ${locale === "en" ? "w-1/11 h-1/11 !ml-80 mt-8 " : "w-1/11 h-1/11 mr-5 mt-8"} `}
            />
            <Image
              src={locationIcon}
              alt="Slide 4"
              className={` ${locale === "en" ? "w-1/3 h-1/2 !ml-48 mt-8 " : "w-1/3 h-1/2 mr-24"} `}
            />
          </div>

          <div className="md:w-1/3 w-full flex flex-col justify-center text-center items-center md:mt-0 mt-16">
            <p
              className={`text-gray-500 lg:text-lg text-sm mb-4 font-semibold`}
            >
              {t("seeAndGo")}
            </p>
            <Image
              src={logo}
              alt="Slide 4"
              width={800}
              height={450}
              className="w-3/4 h-auto"
            />
            <h3 className="text-gray-500 text-xl mt-3 font-bold">
              {t("guideCity")}
            </h3>
            <div className="flex flex-wrap mt-4 w-full justify-center gap-3">
              <Link href={`/${locale}/download`}>
                <Button
                  text={t("downloadApp")}
                  color="primary"
                  icon={<FaCoffee />}
                />
              </Link>
              <a href="#citiesList">
                <Button text={t("cityList")} color="primary" outline />
              </a>
            </div>
          </div>

          <div className="md:w-1/3 md:-mt-64 z-10 flex-center">
            <Image src={mockup} alt="Slide 4" />
          </div>
        </div>

        <div className="flex w-full justify-center text-center items-center flex-col">
          <h1 id="citiesList" className="text-gray-500 text-3xl font-bold">
            {t("citiesList")}
          </h1>
          <div className=" bg-primary w-[120px] h-1 mt-2"></div>
        </div>

        <div className="container mx-auto w-full px-4 mt-12 mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 justify-center lg:px-14 xl:px-56">
            {cards.map((card, index) => (
              <MainCard key={index} imageSrc={card.imageSrc} city={card.city} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}