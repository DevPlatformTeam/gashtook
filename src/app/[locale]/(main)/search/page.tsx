import React from "react";
import { useTranslations } from "next-intl";

import styles from "./search.module.css";

import Card from "@/components/Card/Card";
import map from "@/assets/images/map-category/image-1@3x.jpg";

export default function SearchPage() {
  const t = useTranslations("Search");

  const cards = [
    {
      src: "https://picsum.photos/id/201/300/200",
      label: "Card Title 1",
      alt: "Description for Card 1",
      liked: false,
    },
    {
      src: "https://picsum.photos/id/202/300/200",
      label: "Card Title 2",
      alt: "Description for Card 2",
      liked: true,
    },
    {
      src: "https://picsum.photos/id/203/300/200",
      label: "Card Title 3",
      alt: "Description for Card 3",
      liked: false,
    },
  ];

  return (
    <div className={styles.searchPageContainer}>
      <div className="w-full flex flex-col lg:flex-row gap-x-8">
        <div className="lg:w-2/3">
          <div className="w-full">
            <h1 className="text-secondary text-2xl font-bold ">
              {t("resultPlaces")} &quot; نگارستان &quot;
            </h1>

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-x-4 mt-6">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  src={card.src}
                  label={card.label}
                  alt={card.alt}
                  liked={card.liked}
                />
              ))}
            </div>
          </div>

          <div className="w-full mt-12">
            <h1 className="text-secondary text-2xl font-bold ">
              {t("resultCollections")} &quot; نگارستان &quot;
            </h1>

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-x-4 mt-6">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  src={card.src}
                  label={card.label}
                  alt={card.alt}
                  liked={card.liked}
                />
              ))}
            </div>
          </div>  
        </div>

        <div
          className="w-full lg:w-1/3 h-[300px] lg:h-[650px] bg-cover bg-center mt-12"
          style={{ backgroundImage: `url(${map.src})` }}
        />
      </div>
    </div>
  );
}
