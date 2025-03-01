"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectCoverflow,  } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./slidercardStyle.module.css";
import { useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward, IoMdHeartEmpty } from "react-icons/io";

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
  showPagination?: boolean;
  spaceBetween?: number;
  slidesPerView?: number;
  textOnCard?: boolean;
}

const SliderCard = ({
  slides,
  id,
  mdPerView = 2,
  lgPerView = 3,
  xlPerView = 4,
  isLike = false,
  liked = false,
  spaceBetween,
  slidesPerView = 2,
  textOnCard = false,
  showPagination = false,
}: Props) => {
  const [uniqueId, setUniqueId] = useState<string>("");

  useEffect(() => {
    setUniqueId(`swiper-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  if (!uniqueId) return null;

  return (
    <div className="relative w-full" id={id}>
      <div
        id={`${uniqueId}-prev`}
        className={`custom-swiper-button custom-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 z-10 ${styles["custom-swiper-button"]}`}
      >
        <IoIosArrowBack />
      </div>

      <div
        id={`${uniqueId}-next`}
        className={`custom-swiper-button custom-swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 z-10 ${styles["custom-swiper-button"]}`}
      >
        <IoIosArrowForward />
      </div>

      <Swiper
        modules={[Navigation, Autoplay, Pagination, EffectCoverflow]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        breakpoints={{
          640: { slidesPerView: mdPerView },
          1024: { slidesPerView: lgPerView },
          1280: { slidesPerView: xlPerView },
        }}
        navigation={{
          nextEl: `#${uniqueId}-prev`,
          prevEl: `#${uniqueId}-next`,
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
                horizontalClass: styles.paginationContainer,
              }
            : false
        }
        autoplay={{ delay: 3000 }}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        loop
        className="mt-4 w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className={`relative h-80 lg:min-h-40 pt-4 pb-10 lg:py-8 lg:pt-4 flex flex-col justify-between ${textOnCard && "lg:!pb-14 "}`}
          >
            <div className="relative">
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                className="!relative rounded-lg w-auto sm:w-[90%] md:w-[80%] lg:w-full z-0"
              />
              {<div className={styles.overlay}></div>}
            </div>
            {isLike && (
              <button className="bg-primary shadow-lg flex justify-center items-center text-white rounded-full w-9 h-9 absolute end-3 bottom-10">
                {liked ? <IoHeart size={22} /> : <IoMdHeartEmpty size={22} />}
              </button>
            )}
            <p className={`${textOnCard && "absolute bottom-14 lg:bottom-20 text-third ms-6"} mt-2 lg:text-xl shrink-0 z-20`}>{slide.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderCard;