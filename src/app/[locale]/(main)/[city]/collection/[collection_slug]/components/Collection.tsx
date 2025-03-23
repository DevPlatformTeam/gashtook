'use client'

import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { Link } from "@/i18n/routing";

interface CollectionProps {
    imageSrc: string;
    title: string;
    description: string;
    isLiked: boolean;
    category: string;
    place: string;
}

const Collection: React.FC<CollectionProps> = ({ imageSrc, title, description, isLiked, category, place }) => {
    const { city } = useParams()
    const [liked, setLiked] = useState(isLiked);
    const t = useTranslations('Collections');

    const handleLikeFunctions = async (slug: string, city: string) => {
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

                setLiked(!isLiked)
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
        <div className="w-full flex flex-col lg:flex-row  overflow-hidden ">
            <div className="relative w-full lg:w-1/2">
                <Image fill src={imageSrc} alt={title} className="!relative w-full h-full min-h-48 object-cover" />
                <button
                    className="absolute bottom-3 left-3 bg-primary p-2 rounded-full shadow-lg"
                    onClick={() => handleLikeFunctions(place, city as string)}
                >
                    {liked ? <FaHeart className="text-white text-xl" /> : <FaRegHeart className="text-white text-xl" />}
                </button>
            </div>

            <div className="w-full lg:w-1/2 px-4 flex flex-col lg:justify-between justify-center items-center  text-center lg:items-start lg:text-start">
                <div className="lg:items-end text-center lg:text-right lg:mt-0 mt-2">
                    <h3 className="text-lg font-bold text-secondary">{title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{description}</p>
                </div>

                <Link href={`/${city}/${category}/${place}`}>
                <Button text={t('place')} color="primary" className=" !mb-2 lg:mt-0 mt-2" />
                </Link>
            </div>
        </div>
    );
};

export default Collection;
