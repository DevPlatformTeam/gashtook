import styles from "./category.module.css";

import { PiSliders } from "react-icons/pi";

import { MdOutlineLocationOn } from "react-icons/md";

import SliderCard from "@/components/SliderCard/SliderCard";

import { useTranslations } from "next-intl";

import { notFound } from "next/navigation";

import map from "@/assets/images/map-category/image-1@3x.jpg";
import Image from "next/image";
import Card from "@/components/Card/Card";

export default function CategoryPage({ params }: { params: { city: string, category: string } }) {
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

  const t = useTranslations("category");

  const { city, category } = params;

  const categoryTitle = decodeURIComponent(category).replace(/-/g, ' ');

  const categories = t.raw("categories") as { name: string; value: string }[];
  const categoryFind = categories.find(c => c.value === categoryTitle);

  if (!categoryFind) {
    return notFound();
  }

  return (
    <div className={styles.category}>
      <div className={styles.categories}>
        <div className={styles.topButtons}>
          <button className={styles.topButton}>
            <MdOutlineLocationOn size={24} />
            <span>نزدیک من</span>
          </button>
          <button className={styles.topButton}>
            <PiSliders size={24} />
            <span>فیلتر نتایج</span>
          </button>
        </div>
        <div className={styles.cardSlider}>
          <label htmlFor={`collection-${city}-${categoryTitle}`}>{t("title") + " " + categoryFind.name}</label>
          <SliderCard mdPerView={1.5} lgPerView={2} xlPerView={2.5} id={`collection-${city}-${category}`} slides={slides} isLike={true} />
        </div>
        <div className={styles.cardList}>
          <label htmlFor={`collection-${city}-${categoryTitle}`}>{t("titleCategoryList") + " " + categoryFind.name}</label>
          <div className={styles.cardListGrid}>
            <Card src="https://picsum.photos/id/222/300/150" label="موزه ملی ایران" alt="موزه ملی ایران" />
            <Card src="https://picsum.photos/id/222/300/150" label="موزه ملی ایران" alt="موزه ملی ایران" />
            <Card src="https://picsum.photos/id/222/300/150" label="موزه ملی ایران" alt="موزه ملی ایران" />
            <Card src="https://picsum.photos/id/222/300/150" label="موزه ملی ایران" alt="موزه ملی ایران" />
            <Card src="https://picsum.photos/id/222/300/150" label="موزه ملی ایران" alt="موزه ملی ایران" />
            <Card src="https://picsum.photos/id/222/300/150" label="موزه ملی ایران" alt="موزه ملی ایران" />
            <Card src="https://picsum.photos/id/222/300/150" label="موزه ملی ایران" alt="موزه ملی ایران" />
            <Card src="https://picsum.photos/id/222/300/150" label="موزه ملی ایران" alt="موزه ملی ایران" />
          </div>
        </div>
      </div>
      <div className={styles.map}>
        <Image src={map} alt="map" />
      </div>
    </div>
  )
}