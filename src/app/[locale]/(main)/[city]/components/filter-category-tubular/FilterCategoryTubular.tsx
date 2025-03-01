"use client";

import { useTranslations } from 'next-intl';
import React, {
  MouseEvent,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useContext,
  useCallback
} from 'react';

import styles from "./FilterCategoryTubular.module.css";

import { SubCategoryContext } from '../../[category]/components/filter-category-provider/FilterSubCategoryProvider';
import { SubCategories } from '../../[category]/types/subcategories';
import { CategoryContext } from '../filter-category-provider/FilterCategoryProvider';
import { Categories } from '../../types/categories';

type Props = {
  isSubCategories?: boolean;
};

export default function FilterCategory({ isSubCategories }: Props) {
  const t = useTranslations();
  const ulRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const indicatorRef = useRef(indicatorStyle);

  const { setMainCategory } = useContext(CategoryContext);
  const { category, setSubCategory } = useContext(SubCategoryContext);

  const subCategoriesList = isSubCategories ? t.raw(`category.subCategories.${category}`) : null;
  const categories = t.raw(`category.categories`);

  const updateIndicatorPosition = useCallback(() => {
    if (ulRef.current) {
      const items = ulRef.current.querySelectorAll('li');
      const activeItem = items[activeIndex];
      if (activeItem) {
        const newWidth = activeItem.offsetWidth;
        const newLeft = activeItem.offsetLeft;

        if (indicatorRef.current.width !== newWidth || indicatorRef.current.left !== newLeft) {
          const newStyle = { width: newWidth, left: newLeft };
          indicatorRef.current = newStyle;
          setIndicatorStyle(newStyle);
        }
      }
    }
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateIndicatorPosition();
  }, [activeIndex, updateIndicatorPosition]);


  useEffect(() => {
    const handleResize = () => updateIndicatorPosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateIndicatorPosition]);

  const handleClick = (ev: MouseEvent<HTMLLIElement>) => {
    const index = Number(ev.currentTarget.id);
    setActiveIndex(index);
    const value = ev.currentTarget.dataset.name;
    if (isSubCategories) {
      setSubCategory(value as keyof SubCategories["subCategory"]);
    } else {
      setMainCategory(value as Categories["category"]);
    }
  };

  return (
    <ul
      ref={ulRef}
      className={`${styles.categoryFilter} lg:scroll`}
      style={{
        '--active-width': indicatorStyle.width + 'px',
        '--active-left': indicatorStyle.left + 'px'
      } as React.CSSProperties}
    >
      <li
        id="0"
        data-name="all"
        className={activeIndex === 0 ? styles['active-category'] : ''}
        onClick={handleClick}
      >
        {t("cityPage.allCategoryText")}
      </li>

      {subCategoriesList ? (
        subCategoriesList.map(
          (subcategory: { name: string; value: string }, index: number) => (
            <li
              key={index}
              id={String(index + 1)}
              data-name={subcategory.value}
              className={activeIndex === index + 1 ? styles['active-category'] : ''}
              onClick={handleClick}
            >
              {subcategory.name}
            </li>
          )
        )
      ) : (
        <>
          {categories.map((cat: { name: string }, index: number) => (
            <li
              key={index}
              id={String(index + 1)}
              data-name={cat.name}
              className={activeIndex === index + 1 ? styles['active-category'] : ''}
              onClick={handleClick}
            >
              {cat.name}
            </li>
          ))}
        </>
      )}
    </ul>
  );
}
