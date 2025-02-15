"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../city.module.css";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

interface CitySlideProps {
  title: string;
  imageSrc: string;
}

const Card = ({ slides }: { slides: CitySlideProps[] }) => {
  const locale = useLocale();
  const [uniqueId, setUniqueId] = useState<string>("");

  useEffect(() => {
    setUniqueId(`swiper-${Math.random().toString(36).substr(2, 9)}`); 
  }, []);

  if (!uniqueId) return null; 

  return (
    <div className="relative w-full">
      <div id={`${uniqueId}-prev`} className={`custom-swiper-button custom-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 sm:left-0 z-10 ${styles["custom-swiper-button"]}`}>
        {locale === "fa" ? "›" : "‹"}
      </div>

      <div id={`${uniqueId}-next`} className={`custom-swiper-button custom-swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 sm:right-0 z-10 ${styles["custom-swiper-button"]}`}>
        {locale === "fa" ? "‹" : "›"}
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={15}
        slidesPerView={1.5} 
        breakpoints={{
          640: { slidesPerView: 2 },   
          1024: { slidesPerView: 3 },  
          1280: { slidesPerView: 4 }, 
        }}
        navigation={{
          nextEl: `#${uniqueId}-next`,
          prevEl: `#${uniqueId}-prev`,
        }}
        autoplay={{ delay: 3000 }}
        loop
        className="mt-4 w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <Image 
              src={slide.imageSrc} 
              alt={slide.title} 
              width={240} 
              height={200} 
              className="rounded-lg w-auto sm:w-[90%] md:w-[80%] lg:w-full" 
            />
            <p className="mt-2  text-sm font-semibold">{slide.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Card;
