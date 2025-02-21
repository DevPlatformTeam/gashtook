"use client"

import { useTranslations } from 'next-intl';

import React, { MouseEvent, useState, useRef, useEffect } from 'react';

import styles from "./FilterCategoryTubular.module.css"

export default function FilterCategory() {
    const t = useTranslations();
    const ulRef = useRef<HTMLUListElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    useEffect(() => {
        updateIndicatorPosition();
    }, [activeIndex]);

    useEffect(() => {
        const handleResize = () => updateIndicatorPosition();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeIndex]);

    const updateIndicatorPosition = () => {
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
    };

    const handleClick = (ev: MouseEvent<HTMLLIElement>) => {
        const index = +ev.currentTarget.id;
        setActiveIndex(index);
    };

    return (
        <ul
            ref={ulRef}
            className={styles.categoryFilter}
            style={{
                '--active-left': indicatorStyle.left + 'px',
                '--active-width': indicatorStyle.width + 'px'
            } as React.CSSProperties}
        >
            <li id='0' className={`${activeIndex === 0 ? styles['active-category'] : ''}`} onClick={handleClick}>{t("cityPage.allCategoryText")}</li>
            <li id='1' className={`${activeIndex === 1 ? styles['active-category'] : ''}`} onClick={handleClick}>{t("Header.sightCategory")}</li>
            <li id='2' className={`${activeIndex === 2 ? styles['active-category'] : ''}`} onClick={handleClick}>{t("Header.buyCategory")}</li>
            <li id='3' className={`${activeIndex === 3 ? styles['active-category'] : ''}`} onClick={handleClick}>{t("Header.eatCategory")}</li>
            <li id='4' className={`${activeIndex === 4 ? styles['active-category'] : ''}`} onClick={handleClick}>{t("Header.HotelCategory")}</li>
            <li id='5' className={`${activeIndex === 5 ? styles['active-category'] : ''}`} onClick={handleClick}>{t("Header.funCategory")}</li>
            <li id='6' className={`${activeIndex === 6 ? styles['active-category'] : ''}`} onClick={handleClick}>{t("Header.healthcareCategory")}</li>
        </ul>
    );
}