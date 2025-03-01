"use client"

import { useTranslations } from 'next-intl';

import React, { MouseEvent, useState, useRef, useEffect, useContext, useCallback } from 'react';

import styles from "./FilterCategoryTubular.module.css"

import { SubCategoryContext } from '../../[category]/components/filter-category-provider/FilterSubCategoryProvider';
import { SubCategories } from '../../[category]/types/subcategories';
import { CategoryContext } from '../filter-category-provider/FilterCategoryProvider';
import { Categories } from '../../types/categories';

type Props = {
    isSubCategories?: boolean;
}

export default function FilterCategory({ isSubCategories }: Props) {
    const t = useTranslations();
    const ulRef = useRef<HTMLUListElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    const { setMainCategory } = useContext(CategoryContext);
    const { category, setSubCategory } = useContext(SubCategoryContext);

    const subCategoriesList = isSubCategories && t.raw(`category.subCategories.${category}`);

    const updateIndicatorPosition = useCallback(() => {
        if (ulRef.current) {
            const items = ulRef.current.querySelectorAll('li');
            const activeItem = items[activeIndex];
            if (activeItem) {
                setIndicatorStyle({
                    left: activeItem.offsetLeft,
                    width: activeItem.offsetWidth
                });
            }
        }
    }, [activeIndex]);

    useEffect(() => {
        updateIndicatorPosition();
    }, [updateIndicatorPosition]);

    useEffect(() => {
        const handleResize = () => updateIndicatorPosition();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [updateIndicatorPosition]);

    const handleClick = (ev: MouseEvent<HTMLLIElement>) => {
        const index = +ev.currentTarget.id;
        setActiveIndex(index);
        const value = ev.currentTarget.dataset["name"];
        if (isSubCategories) {
            setSubCategory(value as keyof SubCategories["subCategory"]);
        } else {
            setMainCategory(value as Categories["category"])
        }
    };

    return (
        <ul
            ref={ulRef}
            className={`${styles.categoryFilter} lg:scroll`}
            style={{
                '--active-left': indicatorStyle.left + 'px',
                '--active-width': indicatorStyle.width + 'px'
            } as React.CSSProperties}
        >
            <li id='0' data-name={"all"} className={`${activeIndex === 0 && styles['active-category']}`} onClick={handleClick}>{t("cityPage.allCategoryText")}</li>

            {subCategoriesList ? subCategoriesList.map((subcategory: { name: string; value: string }, index: number) => (
                <li key={index} id={String(index + 1)} data-name={subcategory.value} className={`${activeIndex === index + 1 && styles['active-category']}`} onClick={handleClick}>{subcategory.name}</li>
            ))
                :
                <>
                    <li id='1' data-name={t.raw(`category.categories`)[0].name} className={`${activeIndex === 1 && styles['active-category']}`} onClick={handleClick}>{t.raw(`category.categories`)[0].name}</li>
                    <li id='2' data-name={t.raw(`category.categories`)[1].name} className={`${activeIndex === 2 && styles['active-category']}`} onClick={handleClick}>{t.raw(`category.categories`)[1].name}</li>
                    <li id='3' data-name={t.raw(`category.categories`)[2].name} className={`${activeIndex === 3 && styles['active-category']}`} onClick={handleClick}>{t.raw(`category.categories`)[2].name}</li>
                    <li id='4' data-name={t.raw(`category.categories`)[3].name} className={`${activeIndex === 4 && styles['active-category']}`} onClick={handleClick}>{t.raw(`category.categories`)[3].name}</li>
                    <li id='5' data-name={t.raw(`category.categories`)[4].name} className={`${activeIndex === 5 && styles['active-category']}`} onClick={handleClick}>{t.raw(`category.categories`)[4].name}</li>
                    <li id='6' data-name={t.raw(`category.categories`)[5].name} className={`${activeIndex === 6 && styles['active-category']}`} onClick={handleClick}>{t.raw(`category.categories`)[5].name}</li>
                </>
            }
        </ul>
    );
}