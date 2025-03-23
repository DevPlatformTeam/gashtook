"use client";

import Button from "@/components/Button/Button";
import Swal from "sweetalert2";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
    slug: string;
    city: string;
    isLiked: boolean;
}

export default function LikeButton({ slug, city, isLiked }: Props) {
    const t = useTranslations();

    const [like, setLike] = useState<boolean>(isLiked || false)

    const handleLike = async () => {
        try {
            const response = await fetch("/api/dashboard/favorites", {
                method: "POST",
                credentials: "include",
                headers: { Accept: "application/json" },
                body: JSON.stringify({ city, place: slug })
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
                setLike(!like);
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
        <Button
            outline={!like}
            color={like ? "primary" : "secondary"}
            text={t("Places.favourite")}
            icon={like ? <IoMdHeart size={22} /> : <IoMdHeartEmpty size={20} />}
            onClick={handleLike}
        />
    );
}
