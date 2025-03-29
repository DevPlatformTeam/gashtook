"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { IoMdHeartEmpty } from "react-icons/io";
import styles from "./search.module.css";
import Card from "@/components/Card/Card";
import Map from "@/components/Map/Map";

type Place = {
  lat: string;
  long: string;
  name: string;
  image_url: string;
  category_slug: string;
  sub_category_slug: string;
  slug: string;
  is_liked: boolean;
  city_slug: string;
  favorites_count: string;
};

type Collection = {
  name: string;
  image: string;
  city: string;
  slug: string;
};

interface SearchResults {
  places: Place[];
  collections: Collection[];
}

export default function SearchPage() {
  const skeletonCards = Array.from({ length: 6 });
  const t = useTranslations("Search");
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const locale = useLocale();

  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (!query) {
      setSearchResults(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": locale,
            Accept: "application/json",
          },
          body: JSON.stringify({ query }),
          credentials: "include",
        });
        if (!res.ok) throw new Error(t("errorFetching"));
        const data = await res.json();
        setSearchResults(data.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "خطایی رخ داده است";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, t, locale]);

  // No query provided
  if (!query) {
    return <p className="text-center text-lg mt-8">{t("enterSearchTerm")}</p>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container w-full flex flex-col lg:flex-row gap-x-8 mt-14">
        <div className="lg:w-2/3">
          <p className="bg-slate-300 h-8 mb-3 w-full lg:w-1/2 rounded-lg overflow-hidden animate-pulse"></p>
          <div className="pe-4 pb-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {skeletonCards.map((_, index) => (
              <div
                className={`bg-slate-200 rounded-xl overflow-hidden  animate-pulse`}
                key={index}
              >
                <div className="min-h-40 lg:min-h-60 bg-slate-300 animate-pulse"></div>
                <div className="flex items-center justify-between p-2">
                  <div className="w-3/5 h-4 lg:h-8 rounded-lg bg-slate-300 animate-pulse"></div>
                  <IoMdHeartEmpty
                    size={24}
                    className="text-gray-300 animate-pulse"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-200 animate-pulse w-full lg:w-1/3 h-[300px] lg:h-[600px] rounded-lg"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  // No results yet (initial render before fetch completes)
  if (!searchResults) {
    return null; // Optionally, replace with a loading indicator
  }

  // Map locations for the Map component
  const locations = searchResults.places.map((place: Place) => ({
    lat: parseFloat(place.lat),
    lng: parseFloat(place.long),
    title: place.name,
    imageSrc: place.image_url,
    category: place.category_slug,
    subCategory: place.sub_category_slug,
    slug: place.slug,
  }));

  return (
    <div className={styles.searchPageContainer}>
      <div className="w-full flex flex-col lg:flex-row gap-x-8">
        {/* Left Content */}
        <div className="lg:w-2/3">
          {/* Places */}
          <div className="w-full">
            <h1 className="text-secondary text-2xl font-bold">
              {t("resultPlaces")} &quot;{query}&quot;
            </h1>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8 mt-6">
              {searchResults.places.length > 0 ? (
                searchResults.places.map((place, index) => (
                  <Card
                    key={index}
                    src={place.image_url}
                    label={place.name}
                    alt={place.name}
                    liked={place.is_liked}
                    city={place.city_slug}
                    category={place.category_slug}
                    favorites_count={place.favorites_count}
                    place={place.slug}
                  />
                ))
              ) : (
                <p className="col-span-3">{t("noResults")}</p>
              )}
            </div>
          </div>

          {/* Collections */}
          <div className="w-full my-12">
            <h1 className="text-secondary text-2xl font-bold">
              {t("resultCollections")} &quot;{query}&quot;
            </h1>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8 mt-6">
              {searchResults.collections.length > 0 ? (
                searchResults.collections.map((collection, index) => (
                  <Card
                    key={index}
                    src={collection.image}
                    label={collection.name}
                    alt={collection.name}
                    city={collection.city}
                    place={collection.slug}
                    is_collection={true}
                    showLikedBtn={false}
                  />
                ))
              ) : (
                <p className="col-span-3">{t("noResults")}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Map */}
        <div className="w-full lg:w-1/3 h-[300px] lg:h-[650px] bg-cover bg-center mt-12">
          <Map locations={locations} />
        </div>
      </div>
    </div>
  );
}
