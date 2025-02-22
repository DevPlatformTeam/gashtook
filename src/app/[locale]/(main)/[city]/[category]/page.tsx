import styles from "./category.module.css";

import { PiSliders } from "react-icons/pi";

import { MdOutlineLocationOn } from "react-icons/md";

import SliderCard from "@/components/SliderCard/SliderCard";

import { useTranslations } from "next-intl";

import { notFound } from "next/navigation";

import map from "@/assets/images/map-category/image-1@3x.jpg";
import Image from "next/image";
import { LuStar, LuMapPin } from "react-icons/lu";
import FilterCategory from "../components/filter-category-tubular/FilterCategoryTubular";
import FilterCategoryResultCards from "../components/filter-category-result/FilterCategoryResultCards";
import { FiList } from "react-icons/fi";
import { FilterSubCategoryProvider } from "./components/filter-category-provider/FilterSubCategoryProvider";
import { Categories } from "../types/categories";

export default function CategoryPage({
  params,
}: {
  params: { city: string; category: string };
}) {
  const slides = [
    {
      title: "موزه ملی ایران",
      imageSrc: "https://picsum.photos/id/222/300/150",
    },
    { title: "کاخ گلستان", imageSrc: "https://picsum.photos/id/222/300/150" },
    {
      title: "موزه هنرهای معاصر",
      imageSrc: "https://picsum.photos/id/222/300/150",
    },
    { title: "برج میلاد", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "پل طبیعت", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "کاخ گلستان", imageSrc: "https://picsum.photos/id/222/300/150" },
    {
      title: "موزه هنرهای معاصر",
      imageSrc: "https://picsum.photos/id/222/300/150",
    },
    { title: "برج میلاد", imageSrc: "https://picsum.photos/id/222/300/150" },
    { title: "پل طبیعت", imageSrc: "https://picsum.photos/id/222/300/150" },
  ];

  const t = useTranslations("category");

  const { city, category } = params;

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
            slides={slides}
            textOnCard={true}
            showPagination={true}
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

          <div className={styles.map}>
            <label htmlFor="map">
              <LuMapPin />
              {t("titleCategoryList") + " " + categoryFind.name + " " + t("mapTitle")}
            </label>
            <Image src={map} alt="map" />
          </div>
        </div>
      </div>
    </div>
  );
}
