"use client"

import React, { useContext, useEffect, useState } from 'react';

import styles from './filterCategoryResultCards.module.css';

import Image from 'next/image';
import { CategoryContext } from '@/app/[locale]/(main)/[city]/components/filter-category-provider/FilterCategoryProvider';
import { SubCategoryContext } from '../../[category]/components/filter-category-provider/FilterSubCategoryProvider';
import { useParams, useRouter } from 'next/navigation';
import Map from '@/components/Map/Map';
import Swal from 'sweetalert2';
import { useLocale, useTranslations } from 'next-intl';
import { CiBoxList } from 'react-icons/ci';
import { Location } from '../../types/map';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { getPlaces } from '@/app/actions/placeActions';

type Props = {
    isSubCategories?: boolean;
}

interface Card {
    title: string;
    imageSrc: string;
    slug: string;
    is_liked: boolean;
    favorites_count: string;
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

    const [likedPlaces, setLikedPlaces] = useState<{ id: string }[]>([]);

    const redirectToAuth = () => {
        setTimeout(() => { return router.push(`/${locale}/auth/login`) }, 3000 )
    }
    useEffect(() => {

        const fetchAllSubCategoryPlaces = async () => {
            try {
                setIsLoading(true);

                const result = await getPlaces({
                    city,
                    category,
                    mainCategory,
                    isSubCategories
                });

                if ('isError' in result) {
                    if (result.code === 401) {
                        redirectToAuth();
                    }
                    throw new Error(result.message);
                }

                const dataCards = result?.data;

                if (dataCards) {
                    const formattedSlides = dataCards?.map((item: { name: string; image_url: string; slug: string; is_liked: boolean; favorites_count: string; }) => ({
                        title: item.name,
                        imageSrc: `${item.image_url}`,
                        slug: item.slug,
                        is_liked: item.is_liked,
                        favorites_count: item.favorites_count,
                    }));

                    setCards(formattedSlides);

                    const locations = dataCards.map((item: { lat: string; long: string; image_url: string; slug: string; name: string; category_slug: string; sub_category_slug: string }) => ({
                        lat: +item.lat,
                        lng: +item.long,
                        imageSrc: `${item.image_url}`,
                        slug: item.slug,
                        title: item.name,
                        category: item.category_slug,
                        subCategory: item.sub_category_slug,
                    }));

                    setLocations(locations);
                }
            } catch (error) {
                console.log(error)
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: t("Auth.error-login"),
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

                    const result = await getPlaces({
                        city,
                        mainCategory,
                        category,
                        subCategory,
                        isSubCategories
                    });

                    if ('isError' in result) {
                        if (result.code === 401) {
                            redirectToAuth();
                        }
                        throw new Error(result.message);
                    }

                    const dataCards = result?.data;

                    if (dataCards) {
                        const formattedSlides = dataCards?.map((item: { name: string; image_url: string; slug: string; is_liked: boolean; favorites_count: string; }) => ({
                            title: item.name,
                            imageSrc: `${item.image_url}`,
                            slug: item.slug,
                            is_liked: item.is_liked,
                            favorites_count: item.favorites_count,
                        }));
                        setCards(formattedSlides);

                        const locations = dataCards.map((item: { lat: string; long: string; image_url: string; slug: string; name: string; category_slug: string; sub_category_slug: string }) => ({
                            lat: +item.lat,
                            lng: +item.long,
                            imageSrc: `${item.image_url}`,
                            slug: item.slug,
                            title: item.name,
                            category: item.category_slug,
                            subCategory: item.sub_category_slug,
                        }));

                        setLocations(locations);
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: t("Auth.error-login"),
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
                setTimeout(() => {
                    fetchAllSubCategoryPlaces();
                }, 500);
            } else {
                fetchSubcategoryPlaces()
            }
        } else {
            const fetchAllCategoryPlaces = async () => {
                try {
                    setIsLoading(true);

                    const result = await getPlaces({
                        city
                    });

                    if ('isError' in result) {
                        if (result.code === 401) {
                            redirectToAuth();
                        }
                        throw new Error(result.message);
                    }
                    const dataCards = result?.data;

                    const locations = dataCards.map((item: { lat: string; long: string; image_url: string; slug: string; name: string; category_slug: string; sub_category_slug: string }) => ({
                        lat: +item.lat,
                        lng: +item.long,
                        imageSrc: `${item.image_url}`,
                        slug: item.slug,
                        title: item.name,
                        category: item.category_slug,
                        subCategory: item.sub_category_slug,
                    }));

                    setLocations(locations);

                    if (dataCards) {
                        const formattedSlides = dataCards?.map((item: { name: string; image_url: string; slug: string; is_liked: boolean; favorites_count: string; }) => ({
                            title: item.name,
                            imageSrc: `${item.image_url}`,
                            slug: item.slug,
                            is_liked: item.is_liked,
                            favorites_count: item.favorites_count,
                        }));
                        setCards(formattedSlides);
                    }
                } catch (error) {
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: t("Auth.error-login"),
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
                setTimeout(() => {
                    fetchAllCategoryPlaces();
                }, 500);
            } else {
                fetchAllSubCategoryPlaces();
            }
        }

    }, [subCategory, category, mainCategory, isSubCategories, city]);

    useEffect(() => {
        const liked = cards.filter((card) => card.is_liked);
        setLikedPlaces(
            liked.map((card) => ({ id: card.slug }))
        );
    }, [cards]);

    const handleLike = async (slug: string) => {
        try {
            const response = await fetch("/api/dashboard/favorites", {
                method: "POST",
                credentials: "include",
                headers: { Accept: "application/json" },
                body: JSON.stringify({
                    "city": city,
                    "place": slug
                })
            }).then(res => res.json());

            if (response.success) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: t("ToastMessages.titleSuccess"),
                    text: response.data.favorite === "remove" ? t("Favorites.successRemoveMessage") : t("Favorites.successAddMessage"),
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });

                setLikedPlaces((prevLikedPlaces) => {
                    const exists = prevLikedPlaces.find((place) => place.id === slug);

                    if (exists) {
                        // اگر آیتم وجود دارد و isLiked=true است، آن را حذف کنیم
                        return prevLikedPlaces.filter((place) => place.id !== slug);
                    } else {
                        // اگر آیتم وجود ندارد، آن را اضافه کنیم
                        return [...prevLikedPlaces, { id: slug }];
                    }
                });
            } else if (!response.ok && response.code === 401) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: t("ToastMessages.titleError"),
                    text: t("Favorites.errorMessageAuth"),
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                text: t("Favorites.errorMessage"),
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
            console.log(error);
        }
    };

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
                                    <Image onClick={() => router.push(`/${locale}/${city}/${mainCategory}/${card.slug}`)} src={card.imageSrc} alt={card.title} fill />
                                    <div className={styles.textContainer}>
                                        <div onClick={() => router.push(`/${locale}/${city}/${mainCategory}/${card.slug}`)} className={styles.title}>{card.title}</div>
                                        <div className={styles.likeButton} onClick={() => handleLike(card.slug)}>
                                            {card.favorites_count !== "0" ? <span className='text-gray-500 text-base mt-1'>{card.favorites_count}</span> : null}
                                            {likedPlaces.find((place) => place.id === card.slug) ? <IoMdHeart className='text-primary' size={28} /> : <IoMdHeartEmpty className='text-gray-400 hover:text-primary transition-colors' size={28} />}
                                        </div>
                                    </div>
                                </div>
                            )) :
                                skeletonCards.map((_, index) => (
                                    <div className={`bg-gray-100 rounded-xl overflow-hidden  animate-pulse`} key={index}>
                                        <div className='min-h-40 lg:min-h-60 bg-gray-200 animate-pulse'></div>
                                        <div className="flex items-center justify-between p-2">
                                            <div className="w-3/5 h-4 lg:h-8 rounded-lg bg-gray-200 animate-pulse"></div>
                                            <IoMdHeartEmpty size={24} className='text-gray-200 animate-pulse' />
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
