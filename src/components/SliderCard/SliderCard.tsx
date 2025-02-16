"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Autoplay } from "swiper/modules";

import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./slidercardStyle.module.css";

import { useLocale } from "next-intl";

import { useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

interface Props {
  slides: {
    title: string;
    imageSrc: string;
  }[];
  id: string;
  isLike?: boolean;
  liked?: boolean;
  mdPerView?: number;
  lgPerView?: number;
  xlPerView?: number;
}

const SliderCard = ({
  slides,
  id,
  mdPerView = 2,
  lgPerView = 3,
  xlPerView = 4,
  isLike = false,
  liked = false,
}: Props) => {
  const locale = useLocale();
  const [uniqueId, setUniqueId] = useState<string>("");

  useEffect(() => {
    setUniqueId(`swiper-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  if (!uniqueId) return null;

  return (
    <div className="relative w-full" id={id}>
      <div
        id={`${uniqueId}-prev`}
        className={`custom-swiper-button custom-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 sm:left-0 z-10 ${styles["custom-swiper-button"]}`}
      >
        {locale === "fa" ? "›" : "‹"}
      </div>

      <div
        id={`${uniqueId}-next`}
        className={`custom-swiper-button custom-swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 sm:right-0 z-10 ${styles["custom-swiper-button"]}`}
      >
        {locale === "fa" ? "‹" : "›"}
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={15}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: mdPerView },
          1024: { slidesPerView: lgPerView },
          1280: { slidesPerView: xlPerView },
        }}
        navigation={{
          prevEl: `#${uniqueId}-prev`,
          nextEl: `#${uniqueId}-next`,
        }}
        autoplay={{ delay: 3000 }}
        loop
        className="mt-4 w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative min-h-30 lg:min-h-40 flex flex-col justify-center"
          >
            <Image
              src={slide.imageSrc}
              alt={slide.title}
              fill
              className="!relative rounded-lg w-auto sm:w-[90%] md:w-[80%] lg:w-full"
            />
            {isLike && (
              <button className="bg-primary shadow-lg flex justify-center items-center text-white rounded-full w-9 h-9 absolute end-3 bottom-10">
                {liked ? <IoHeart size={22} /> : <IoMdHeartEmpty size={22} />}
              </button>
            )}
            <p className="mt-2 text-sm font-semibold shrink-0">{slide.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderCard;
