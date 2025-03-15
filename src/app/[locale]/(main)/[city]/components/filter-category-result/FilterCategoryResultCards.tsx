"use client"

import React, { useContext, useEffect, useState } from 'react';

import styles from './filterCategoryResultCards.module.css';

import Image from 'next/image';
import { LuHeart } from 'react-icons/lu';
import { CategoryContext } from '@/app/[locale]/(main)/[city]/components/filter-category-provider/FilterCategoryProvider';
import { SubCategoryContext } from '../../[category]/components/filter-category-provider/FilterSubCategoryProvider';
import { useParams, useRouter } from 'next/navigation';
import Map from '@/components/Map/Map';
import Swal from 'sweetalert2';
import { useLocale, useTranslations } from 'next-intl';
import { CiBoxList } from 'react-icons/ci';
import { Location } from '../../types/map';


type Props = {
    isSubCategories?: boolean;
}

interface Card {
    title: string;
    imageSrc: string;
    slug: string;
}

export default function FilterCategoryResultCards({ isSubCategories = false }: Props) {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const { city } = useParams()

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [locations, setLocations] = useState<Location[]>([]);

    const skeletonCards = [1, 2, 3, 4];

    const [display, setDisplay] = useState<boolean>(false);
    const [cards, setCards] = useState<Card[]>([]);

    const { mainCategory } = useContext(CategoryContext);
    const { category, subCategory } = useContext(SubCategoryContext);

    useEffect(() => {
        const fetchAllSubCategoryPlaces = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/places/${city}/${isSubCategories ? category : mainCategory}`, {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(res => res.json());

                const dataCards = response.data.data;

                if (dataCards) {
                    const formattedSlides: [] = dataCards?.map((item: { name: string; image_url: string; slug: string; }) => ({
                        title: item.name,
                        imageSrc: `${item.image_url}`,
                        slug: item.slug,
                    }));

                    setCards(formattedSlides);
                }
            } catch (error) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: t("error-login"),
                    text: error instanceof Error ? error.message : String(error),
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (isSubCategories) {
            const fetchSubcategoryPlaces = async () => {
                try {
                    setIsLoading(true);

                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/places/${city}/${category}/${subCategory}`, {
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json'
                        }
                    }).then(res => res.json());

                    const dataCards = response.data.data;

                    if (dataCards) {
                        const formattedSlides: [] = dataCards?.map((item: { name: string; image_url: string; slug: string; }) => ({
                            title: item.name,
                            imageSrc: `${item.image_url}`,
                            slug: item.slug,
                        }));
                        setCards(formattedSlides);
                    }
                } catch (error) {
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: t("error-login"),
                        text: error instanceof Error ? error.message : String(error),
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                    });
                } finally {
                    setIsLoading(false);
                }
            };
            if (subCategory === "all") {
                fetchAllSubCategoryPlaces();
            } else {
                fetchSubcategoryPlaces()
            }
        } else {
            const fetchAllCategoryPlaces = async () => {
                try {
                    setIsLoading(true);

                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/places/${city}`, {
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json'
                        }
                    }).then(res => res.json());

                    const dataCards = response.data.data;

                    const locations = dataCards.map((item: { lat: string; long: string; image_url: string; slug: string; name: string; }) => ({
                        lat: +item.lat,
                        lng: +item.long,
                        imageSrc: `${item.image_url}`,
                        slug: item.slug,
                        title: item.name,
                    }));
                    
                    setLocations(locations);

                    if (dataCards) {
                        const formattedSlides: [] = dataCards?.map((item: { name: string; image_url: string; slug: string; }) => ({
                            title: item.name,
                            imageSrc: `${item.image_url}`,
                            slug: item.slug,
                        }));
                        setCards(formattedSlides);
                    }
                } catch (error) {
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: t("error-login"),
                        text: error instanceof Error ? error.message : String(error),
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                    });
                } finally {
                    setIsLoading(false);
                }
            };
            if (mainCategory === "all") {
                fetchAllCategoryPlaces();
            } else {
                fetchAllSubCategoryPlaces();
            }
        }

    }, [subCategory, category, mainCategory]);


    return (
        <div className={styles.containerResult}>
            <div className={styles.selectDisplay}>
                <span className={`${styles.activeTab} ${display === true ? "!left-1/2" : "!left-0"}`}></span>
                <span className={display === true ? `${styles.activeItemTab}` : ""} onClick={() => setDisplay(true)}>{t("Map.mapTitle")}</span>
                <span className={display === false ? `${styles.activeItemTab}` : ""} onClick={() => setDisplay(false)}>{t("Map.placesTitle")}</span>
            </div>

            {display === false ?
                <div className={`${styles.filterCategoryResultCards} scroll`}>
                    {!isLoading && !cards.length ?
                        <div className='w-full h-full flex-center flex-col gap-2 text-gray-400 text-2xl lg:text-3xl '>
                            <CiBoxList size={60} className='text-xl lg:text-3xl ' />
                            <span>{t("Dashboard.notFound", { type: locale === 'fa' ? "مکانی" : "place" })}</span>
                        </div>
                        :
                        <div className={styles.containerCards}>
                            {!isLoading && cards.length ? cards.map((card, index) => (
                                <div className={styles.card} key={index}>
                                    <Image onClick={() => router.push(`/${mainCategory}/${card.slug}`)} src={card.imageSrc} alt={card.title} fill />
                                    <div className={styles.textContainer}>
                                        <div onClick={() => router.push(`/${mainCategory}/${card.slug}`)} className={styles.title}>{card.title}</div>
                                        <div className={styles.likeButton}>
                                            <LuHeart />
                                        </div>
                                    </div>
                                </div>
                            )) :
                                skeletonCards.map((_, index) => (
                                    <div className={`bg-gray-100 rounded-xl overflow-hidden  animate-pulse`} key={index}>
                                        <div className='min-h-40 lg:min-h-60 bg-gray-200 animate-pulse'></div>
                                        <div className="flex items-center justify-between p-2">
                                            <div className="w-3/5 h-4 lg:h-8 rounded-lg bg-gray-200 animate-pulse"></div>
                                            <LuHeart size={24} className='text-gray-200 animate-pulse' />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
                :
                <div className={styles.map}>
                    <Map locations={locations} />
                </div>
            }
        </div>
    )
}
