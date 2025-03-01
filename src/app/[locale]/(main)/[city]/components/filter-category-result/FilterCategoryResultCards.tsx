"use client"

import React, { useContext } from 'react';

import styles from './filterCategoryResultCards.module.css';

import Image from 'next/image';
import { LuHeart } from 'react-icons/lu';
import { CategoryContext } from '@/app/[locale]/(main)/[city]/components/filter-category-provider/FilterCategoryProvider';
import { SubCategoryContext } from '../../[category]/components/filter-category-provider/FilterSubCategoryProvider';


type Props = {
    isSubCategories?: boolean;
}

export default function FilterCategoryResultCards({ isSubCategories }: Props) {

    const { mainCategory } = useContext(CategoryContext);
    const { category: subCategory } = useContext(SubCategoryContext);
    console.log(mainCategory, subCategory, isSubCategories);
    


    const cards = [
        {
            image: 'https://picsum.photos/seed/picsum/200/300',
            title: 'مسجد گوهرشاد'
        },
        {
            image: 'https://picsum.photos/id/222/300/150',
            title: 'کاخ موزه نیاوران'
        },
        {
            image: 'https://picsum.photos/seed/picsum/200/300',
            title: 'مسجد گوهرشاد'
        },
        {
            image: 'https://picsum.photos/id/222/300/150',
            title: 'کاخ موزه نیاوران'
        },
        {
            image: 'https://picsum.photos/seed/picsum/200/300',
            title: 'مسجد گوهرشاد'
        },
    ]

    return (
        <div className={`${styles.filterCategoryResultCards} scroll`}>
            <div className={styles.containerCards}>
                {cards.map((card, index) => (
                    <div className={styles.card} key={index}>
                        <Image src={card.image} alt={card.title} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
                        <div className={styles.textContainer}>
                            <div className={styles.title}>{card.title}</div>
                            <div className={styles.likeButton}>
                                <LuHeart />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
