import React from "react";
import Image from "next/image";
import slidImage from "@/assets/images/slider1.png";
import Card from "../../../../components/SliderCard/SliderCard";
import SliderCard from '@/components/SliderCard/SliderCard';

export default function Page() {
  const slides = [
    { title: "موزه ملی ایران", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "کاخ گلستان", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "موزه هنرهای معاصر", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "برج میلاد", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "پل طبیعت", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "کاخ گلستان", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "موزه هنرهای معاصر", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "برج میلاد", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "پل طبیعت", imageSrc: "https://picsum.photos/id/222/300/150" },
  ];

  return (
    <div className={"px-4 sm:px-8 md:px-12 mt-6"}>
      <Image 
        src={slidImage} 
        alt="banner" 
        className="w-full h-48 sm:h-60 md:h-72 object-cover" 
      />
      <p className="text-base sm:text-lg font-semibold mt-4 mb-2 sm:mb-4 text-center sm:text-start">به تهران خوش آمدید</p>
      <p className="text-sm sm:text-lg font-normal text-center sm:text-start">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint consequuntur enim nulla quibusdam possimus, qui libero sit earum eaque. Assumenda, perspiciatis? At asperiores esse facere culpa ratione unde id aliquam.
      </p>

      <div className="mt-5 sm:mt-7 mb-7">
        <p className="text-sm sm:text-base text-gray-500">بهترین موزه های تهران</p>
        <SliderCard id="best-museums" slides={slides} />
      </div>

      <div className="mt-5 sm:mt-7 mb-7 text-gray-500">
        <p className="text-sm sm:text-base">بهترین پارک های تهران</p>
        <SliderCard id="best-parks" slides={slides} />
      </div>

      <div className="mt-5 sm:mt-7 mb-7 text-gray-500">
        <p className="text-sm sm:text-base">بهترین هتل های تهران</p>
        <SliderCard id="best-hotels" slides={slides} />
      </div>

      <div className="mt-5 sm:mt-7 mb-7 text-gray-500">
        <p className="text-sm sm:text-base">دیدنی های تهران</p>
        <SliderCard id="best-attractions" slides={slides} />
      </div>
    </div>
  );
}
