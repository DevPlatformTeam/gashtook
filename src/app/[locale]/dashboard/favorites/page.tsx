import React from 'react';
import Card from '@/components/Card/Card';
import NoDataSvg from '@/icons/NoDataSvg';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface Card {
  src: string;
  label: string;
  alt: string;
  liked: boolean;
}

const cards: Card[] = [
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

export default function Page() {

  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="h-full text-start">
      <h1 className="text-xl font-bold pb-4 mx-6 border-b-2 border-gray-200">{t("Dashboard.favorites")}</h1>
      {cards.length > 0 ? <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full overflow-y-auto scroll px-6 pt-4">
        {cards.map((card, index) => (
          <li key={index}>
            <Card
              src={card.src}
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
