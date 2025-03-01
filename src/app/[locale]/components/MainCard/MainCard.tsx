"use client"; // 👈 این خط را اضافه کن تا کامپوننت Client Component شود

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useTranslations } from "next-intl";
import { TbBuildingStore } from "react-icons/tb";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { LuPizza } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { LuTreePine } from "react-icons/lu";
import { GiMedicalDrip } from "react-icons/gi";

interface IMainCardProps {
  imageSrc: string;
  city: string;
  onClick?: () => void;
}

const MainCard: React.FC<IMainCardProps> = ({ imageSrc, city, onClick }) => {
  const [hover, setHover] = useState(false);
  const t = useTranslations("HomePage");

  return (
    <div
      className="relative w-full md:h-[430px] h-[280px] rounded-lg overflow-hidden cursor-pointer transition-all flex items-center justify-center text-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <Image
        src={imageSrc}
        alt={city}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />

      <div
        className={`absolute inset-0 flex items-end justify-center p-4 transition-all ${
          hover
            ? "bg-gradient-to-t from-primary via-transparent to-transparent"
            : "bg-gradient-to-t from-black/70 via-transparent to-transparent"
        }`}
      >
        {!hover ? (
          <div className="pb-16">
            <p className="text-third text-3xl mb-5 font-bold">{city}</p>
            <div className="flex justify-center">
              <span className="text-third md:mr-2 mr-1 md:text-3xl text-lg">
                <HiOutlineBuildingLibrary />
              </span>
              <span className="text-third md:mr-2 mr-1 md:text-3xl text-lg">
                <TbBuildingStore />
              </span>
              <span className="text-third md:mr-2 mr-1 md:text-3xl text-lg">
                <LuPizza />
              </span>
              <span className="text-third md:mr-2 mr-1 md:text-3xl text-lg">
                <TbBed />
              </span>
              <span className="text-third md:mr-2 mr-1 md:text-3xl text-lg">
                <LuTreePine />
              </span>
              <span className="text-third md:mr-2 mr-1 md:text-3xl text-lg">
                <GiMedicalDrip />
              </span>
            </div>
          </div>
        ) : (
          <div className="pb-16">
            <p className="text-third text-3xl md:pb-12  mb-5 font-bold">
              {city}
            </p>
            <Button
              text={t("showCity")}
              color="third"
              textColor="secondary"
              className="md:text-lg md:!px-10"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCard;
