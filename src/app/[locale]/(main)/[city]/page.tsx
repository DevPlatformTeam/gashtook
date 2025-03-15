import React from "react";

import Image from "next/image";
import { getTranslations } from "next-intl/server";

import slidImage from "@/assets/images/slider1.png";

import styles from "./city.module.css";

import { FiList } from "react-icons/fi";
import CityDetailsServer from "./components/server/CityDetails.server";
import FilterCategory from "./components/filter-category-tubular/FilterCategoryTubular";
import FilterCategoryResultCards from "./components/filter-category-result/FilterCategoryResultCards";
import { FilterCategoryProvider } from "./components/filter-category-provider/FilterCategoryProvider";


export default async function Page({
  params,
}: {
  params: { city: string; locale: string };
}) {

  const { locale, city } = params;
  const t = await getTranslations();
  const cityFa = t.raw(`city`).filter((item: { id: string, value: string }) => item.id === city)[0]?.value;

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

      <CityDetailsServer locale={locale} citySlug={city} city={locale == 'fa' ? cityFa : city} />

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
