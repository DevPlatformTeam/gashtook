"use client"

import Image, { StaticImageData } from 'next/image'
import React from 'react'

import { EffectFade } from 'swiper/modules'
import { Autoplay } from 'swiper/modules'
import { Pagination } from 'swiper/modules'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function SliderCardDefaultComponent({
    slides,
}: {
    slides: {
        image: StaticImageData
        title: string
    }[]
}) {
  return (
    <div>
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
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className='w-full'>
                    <Image src={slide.image} alt={slide.title} className="w-full h- lg:h-72 xl:h-96 object-cover rounded-2xl" />
                </SwiperSlide>
            ))} 
        </Swiper>
    </div>
  )
}
