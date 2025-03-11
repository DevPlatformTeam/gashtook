import styles from "./category.module.css";

import { PiSliders } from "react-icons/pi";

import { MdOutlineLocationOn } from "react-icons/md";

import SliderCard from "@/components/SliderCard/SliderCard";

import { notFound } from "next/navigation";

import { LuStar } from "react-icons/lu";
import FilterCategory from "../components/filter-category-tubular/FilterCategoryTubular";
import FilterCategoryResultCards from "../components/filter-category-result/FilterCategoryResultCards";
import { FiList } from "react-icons/fi";
import { FilterSubCategoryProvider } from "./components/filter-category-provider/FilterSubCategoryProvider";
import { Categories } from "../types/categories";
import { FetchData } from "@/components/Fetch/FetchData";
import { getTranslations } from "next-intl/server";

export default async function CategoryPage({
  params,
}: {
  params: { city: string; category: string };
}) {

  const t = await getTranslations("category");

  const { city, category } = params;

  const { data } = await FetchData(`cities/${city}/collections`);

  const formattedSlides: [] = data?.map((item: { name: string; image_url: string; slug: string; }) => ({
    title: item.name,
    imageSrc: `${item.image_url}`,
    slug: item.slug,
  }));  

  const categoryTitle = decodeURIComponent(category).replace(/-/g, " ");

  const categories = t.raw("categories") as { name: string; value: string }[];
  const categoryFind = categories.find((c) => c.value === categoryTitle);
  
  if (!categoryFind) {
    return notFound();
  }

  return (
    <div className={styles.category}>
      <div className={styles.categories}>
        <div className={styles.topButtons}>
          <button className={styles.topButton}>
            <MdOutlineLocationOn size={24} />
            <span>{t("mapButton")}</span>
          </button>
          <button className={styles.topButton}>
            <PiSliders size={24} />
            <span>{t("filterButton")}</span>
          </button>
        </div>
        <div className={styles.collectionSlider}>
          <label htmlFor={`collection-${city}-${categoryTitle}`}>
            <LuStar />
            {t("title") + " " + categoryFind.name}
          </label>
          <SliderCard
            slidesPerView={1.3}
            mdPerView={2}
            lgPerView={2}
            xlPerView={2.5}
            id={`collection-${city}-${category}`}
            slides={formattedSlides}
            textOnCard={true}
            showPagination={true}
            city={city}
          />
        </div>
        <div className={styles.placesWithMap}>
          <div className={styles.placesCard}>
            <label className={styles.cardTitles}>
              <FiList />
              {t('titleCategoryList') + " " + categoryFind.name}
            </label>
            <FilterSubCategoryProvider initialCategory={categoryTitle as Categories["category"]}>
              <FilterCategory isSubCategories={true} />
              <FilterCategoryResultCards isSubCategories={true} />
            </FilterSubCategoryProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
