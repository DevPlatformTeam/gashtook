"use client"

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import NoDataSvg from '@/icons/NoDataSvg';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Swal from 'sweetalert2';

interface Card {
  image_url: string;
  label: string;
  alt: string;
  liked: boolean;
}

const initialCards: Card[] = [
  {
    image_url: "https://picsum.photos/id/201/300/200",
    label: "Card Title 1",
    alt: "Description for Card 1",
    liked: false,
  },
  {
    image_url: "https://picsum.photos/id/202/300/200",
    label: "Card Title 2",
    alt: "Description for Card 2",
    liked: true,
  },
  {
    image_url: "https://picsum.photos/id/203/300/200",
    label: "Card Title 3",
    alt: "Description for Card 3",
    liked: false,
  },
];

export default function Page() {
  const t = useTranslations();
  const locale = useLocale();
  const [cards, setCards] = useState<Card[]>(initialCards);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/favorites", {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        }).then(res => res.json());

        const dataCards = response.data.data;

        if (dataCards) {
          setCards(dataCards);
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("error-login"),
          text: error instanceof Error ? error.message : String(error),
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    };

    fetchData();
  }, [t]);

  return (
    <div className="h-full text-start">
      <h1 className="hidden lg:block text-xl font-bold pb-4 mx-6 border-b-2 border-gray-200">{t("Dashboard.favorites")}</h1>
      {cards && cards.length > 0 ?
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full overflow-y-auto scroll px-6 pt-4">
          {cards.map((card, index) => (
            <li key={index}>
              <Card
                src={card.image_url}
                alt={card.alt}
                label={card.label}
                liked={card.liked}
              />
            </li>
          ))}
        </ul> :
        <div className={"w-full h-full flex-center flex-col gap-4"}>
          <NoDataSvg className="max-w-48 h-48" />
          <p className="text-center text-gray-500">{t("Dashboard.notFound", { type: locale === "fa" ? "علاقه مندی ای" : "favorite" })}</p>
        </div>
      }
    </div>
  );
}
