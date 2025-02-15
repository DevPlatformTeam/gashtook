"use client";

import { useTranslations } from "next-intl";
import { Link, routing } from "@/i18n/routing";
import { FaCoffee } from "react-icons/fa";
import Button from "@/components/Button/Button";
import { notFound } from "next/navigation";
import Image from "next/image";
import MainCard from "../components/MainCard/MainCard";
import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; 

import { register } from "swiper/element/bundle";
register();

import slide1 from "@/assets/images/slider1.png";
import slide2 from "@/assets/images/slider1.png";
import slide3 from "@/assets/images/slider1.png";
import slide4 from "@/assets/images/slider1.png";

import mockup from "@/assets/images/mockup-1-x.png";
import logo from "@/assets/images/logo-green.png";
import locationIcon from "@/assets/images/map-marker-alt.png";

import SelectOptionComponent from "@/components/select-option/SelectOption.component";
import SearchInputComponents from "@/components/search-input/SearchInput.component";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("HomePage");
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return notFound();
  }

  const cards = [
    { imageSrc: 'https://picsum.photos/id/241/200/300', city: "تهران" },
    { imageSrc: "https://picsum.photos/id/111/200/300", city: "اصفهان" },
    { imageSrc: "https://picsum.photos/id/555/200/300", city: "شیراز" },
    { imageSrc: "https://picsum.photos/id/444/200/300", city: "مشهد" },
    { imageSrc: "https://picsum.photos/id/421/200/300", city: "تبریز" },
    { imageSrc: "https://picsum.photos/id/222/200/300", city: "کیش" },
  ];

  return (
    <>
      <div className="w-full mt-5  justify-center items-center relative block">
        <div className="w-full lg:px-12 px-4 top-5 z-5 ">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]} 
            spaceBetween={0}
            slidesPerView={1} 
            navigation 
            pagination={{ clickable: true }} 
            autoplay={{ delay: 3000, disableOnInteraction: false }} 
            effect="fade" 
            loop 
          >
            <SwiperSlide>
              <Image src={slide1} alt="Slide 1" className="w-full lg:h-auto " />
            </SwiperSlide>
            <SwiperSlide>
              <Image fill src={'https://picsum.photos/id/237/200/300'} alt="Slide 2" className="w-full lg:h-auto" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={slide3} alt="Slide 3" className="w-full lg:h-auto " />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={slide4} alt="Slide 4" className="w-full lg:h-auto " />
            </SwiperSlide>
          </Swiper>
        </div>
        <div
            className={`md:flex md:justify-between w-full ${
              locale === "en" ? "flex-row-reverse" : ""
            }`}
          >          
          <div className={`md:w-1/3 md:flex flex-col md:block hidden`}>
            <Image src={locationIcon} alt="Slide 4" className={` ${locale === "en" ? "w-1/11 h-1/11 !ml-80 mt-8 " : "w-1/11 h-1/11 mr-5 mt-8"} `} />
            <Image src={locationIcon} alt="Slide 4" className={` ${locale === "en" ? "w-1/3 h-1/2 !ml-48 mt-8 " : "w-1/3 h-1/2 mr-24"} `} />
          </div>

          <div className="md:w-1/3 w-full flex flex-col justify-center text-center items-center md:-mt-32 mt-16">
            <p className={`text-gray-500 md:text-lg text-sm -mb-10
            ${locale === "en" ? "ml-32" : "ml-10"}  font-semibold`}>{t("seeAndGo")}</p>
            <Image src={logo} alt="Slide 4" width={800} height={450} className="w-3/4 h-auto" />
            <h3 className="text-gray-500 text-xl mt-3 font-bold">
              {t("guideCity")}
            </h3>
            <div className="flex mt-4 w-full justify-center gap-x-3">
              <Button text={t("downloadApp")} color="primary" icon={<FaCoffee />} />
              <Button text={t("cityList")} color="primary" outline />
            </div>

          </div>

          <div className="md:w-1/3 md:-mt-64 z-10">
            <Image src={mockup} alt="Slide 4" className="w-full h-auto" />
          </div>

        </div>

        <div className="flex w-full justify-center text-center items-center flex-col">
          <h1 className="text-gray-500 text-3xl font-bold">{t("citiesList")}</h1>
          <div className=" bg-primary w-[120px] h-1 mt-2"></div>
        </div>

        <div className="container mx-auto w-full px-4 mt-12 mb-24">
      <div className="grid  grid-cols-2 lg:grid-cols-3 gap-6 justify-center lg:px-52 sm:px-10 ">
        {cards.map((card, index) => (
          <MainCard key={index} imageSrc={card.imageSrc} city={card.city} />
        ))}
      </div>
    </div>

      </div>

    </>
  );
}
