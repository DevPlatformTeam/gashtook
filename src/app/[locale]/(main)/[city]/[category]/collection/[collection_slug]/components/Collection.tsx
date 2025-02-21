'use client'

import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Button from "@/components/Button/Button";

interface CollectionProps {
    imageSrc: string;
    title: string;
    description: string;
    isLiked: boolean;
    category: string;
}

const Collection: React.FC<CollectionProps> = ({ imageSrc, title, description, isLiked, category }) => {
    const [liked, setLiked] = useState(isLiked);

    return (
        <div className="w-full flex flex-col lg:flex-row  overflow-hidden ">
            <div className="w-full lg:w-1/2 relative">
                <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                <button
                    className="absolute bottom-3 left-3 bg-primary p-2 rounded-full shadow-lg"
                    onClick={() => setLiked(!liked)}
                >
                    {liked ? <FaHeart className="text-white text-xl" /> : <FaRegHeart className="text-white text-xl" />}
                </button>
            </div>

            <div className="w-full lg:w-1/2 px-4 flex flex-col lg:justify-between justify-center items-center  text-center lg:items-start lg:text-start">
                <div className="lg:items-end text-center lg:text-right lg:mt-0 mt-2">
                    <h3 className="text-lg font-bold text-secondary">{title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{description}</p>
                </div>

                <Button text={`مشاهده اطلاعات ${category}`} color="primary" className=" !mb-2 lg:mt-0 mt-2" />
            </div>
        </div>
    );
};

export default Collection;
