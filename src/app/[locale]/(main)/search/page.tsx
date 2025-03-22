import React from "react";
import { getTranslations } from "next-intl/server";
import styles from "./search.module.css";

import Card from "@/components/Card/Card";
import map from "@/assets/images/map-category/image-1@3x.jpg";
import { Link } from "@/i18n/routing";

// Simulated server function to fetch search results
async function fetchSearchResults(query: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/search?query=${query}`,
  );
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const t = await getTranslations("Search");
  const query = searchParams.query || "";

  // If no query, show a message instead of an empty result
  if (!query) {
    return <p className="text-center text-lg mt-8">{t("enterSearchTerm")}</p>;
  }

  let searchResults;
  try {
    searchResults = await fetchSearchResults(query);
    searchResults = searchResults?.data;
  } catch (error) {
    console.error(error);
    return (
      <p className="text-red-500 text-center mt-8">{t("errorFetching")}</p>
    );
  }

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
                searchResults.places.map(
                  (
                    place: {
                      image_url: string;
                      name: string;
                      is_liked: boolean;
                      category_slug: string;
                      city_slug: string;
                      slug: string;
                    },
                    index: number,
                  ) => (
                    <Link href={`${place?.city_slug}/${place?.category_slug}/${place?.slug}`} key={index}>
                      <Card
                        city={place?.city_slug}
                        src={place?.image_url}
                        label={place?.name}
                        alt={place?.name}
                        liked={place?.is_liked}
                      />
                    </Link>
                  ),
                )
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
                searchResults.collections.map(
                  (
                    collection: { name: string; image: string; slug: string, city: string },
                    index: number,
                  ) => (
                    <Link href={`/${collection?.city}/collection/${collection?.slug}`} key={index}>
                      <Card
                        city={collection.city}
                        src={collection.image}
                        label={collection.name}
                        alt={collection.name}
                        showLikedBtn={false}
                      />
                    </Link>
                  ),
                )
              ) : (
                <p className="col-span-3">{t("noResults")}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Map */}
        <div
          className="w-full lg:w-1/3 h-[300px] lg:h-[650px] bg-cover bg-center mt-12"
          style={{ backgroundImage: `url(${map.src})` }}
        />
      </div>
    </div>
  );
}
