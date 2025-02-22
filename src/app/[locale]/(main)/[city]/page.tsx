import React from "react";

import Image from "next/image";

import slidImage from "@/assets/images/slider1.png";
import SliderCard from "@/components/SliderCard/SliderCard";

import styles from "./city.module.css";

import { LuStar } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { FiList } from "react-icons/fi";
import { useTranslations } from "next-intl";
import FilterCategory from "./components/filter-category-tubular/FilterCategoryTubular";
import FilterCategoryResultCards from "./components/filter-category-result/FilterCategoryResultCards";
import { FilterCategoryProvider } from "./components/filter-category-provider/FilterCategoryProvider";

export default function Page({
  params,
}: {
  params: { city: string; locale: string };
}) {

  const { locale, city } = params;
  const t = useTranslations();
  const cityFa = t.raw(`city`).filter((item: { id: string, value: string }) => item.id === city)[0].value;

  const slides = [
    {
      title: "بهترین موزه های تهران",
      imageSrc: "https://picsum.photos/id/222/300/150",
    },
    { title: "بهترین مراکز تفریحی تهران", imageSrc: "https://picsum.photos/id/222/300/150" },
    {
      title: "بهترین مراکز درمانی تهران",
      imageSrc: "https://picsum.photos/id/222/300/150",
    },
    { title: "بهترین مراکز دیدنی تهران", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "بهترین موزه تهران", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "بهترین مراکز تفریحی تهران", imageSrc: "https://picsum.photos/id/222/300/150" },
    {
      title: "بهترین مراکز خرید تهران",
      imageSrc: "https://picsum.photos/id/222/300/150",
    },
    { title: "بهترین مراکز تفریحی تهران", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "بهترین مراکز خرید تهران", imageSrc: "https://picsum.photos/id/222/300/150" },
  ];


  return (
    <div className={styles.city}>
      <Image
        src={slidImage}
        alt=""
      />
      <p className={styles.title}>
        {locale === 'fa' ? `به ${cityFa} ${t('cityPage.titleCity')}` : `${t('cityPage.titleCity')} ${city}`}
      </p>
      <p className={styles.description}>
        {t('cityPage.descriptionCity')}
      </p>

      <div className={styles.collectionCard}>
        <div className={styles.cardTitles}>
          <span>
            <LuStar />
            {locale === 'fa' ? `${t('cityPage.collectionCardTitle')} ${cityFa}` : `${t('cityPage.collectionCardTitle')} ${city}`}
          </span>
          <Link className={styles.moreButton} href={`/${locale}/${city}/collection-list`}>
            {locale === 'fa' ?
              <>
                {t('cityPage.moreButton')}
                <IoIosArrowBack className="!size-6" />
              </>
              :
              <>
                {t('cityPage.moreButton')}
                <IoIosArrowBack className="!size-6 !rotate-180" />
              </>
            }
          </Link>
        </div>
        <SliderCard showPagination={true} mdPerView={2} xlPerView={3} slidesPerView={1.3} id="best-museums" slides={slides} textOnCard={true} />
      </div>

      <div className={styles.placesCard}>
        <div className={styles.cardTitles}>
          <span>
            <FiList />
            {locale === 'fa' ? `${t('cityPage.places')} ${cityFa}` : `${t('cityPage.places')} ${city}`}
          </span>
        </div>
        <FilterCategoryProvider>
          <FilterCategory />
          <FilterCategoryResultCards />
        </FilterCategoryProvider>
      </div>
    </div>
  );
}
