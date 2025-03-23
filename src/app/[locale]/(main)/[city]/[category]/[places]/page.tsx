import Image from "next/image";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import { FetchData } from "@/components/Fetch/FetchData";
import { getTranslations } from "next-intl/server";

import FormatPhoneNumberForTelLink from "@/utils/FormatPhoneNumberTelLink";
import jalaali from "jalaali-js";

import { IoMdHeartEmpty } from "react-icons/io";
import { FaLink } from "react-icons/fa";
import { MdOutlineLocationOn, MdPhone } from "react-icons/md";
import { TbDeviceMobileDown, TbDeviceMobileCode } from "react-icons/tb";
import { BsBasket3Fill } from "react-icons/bs";
import { DiAndroid } from "react-icons/di";

import SliderCard from "@/components/SliderCard/SliderCard";
import styles from "./places.module.css";
import downloadApp from "@/assets/images/downloadapp.png";
import { Link } from "@/i18n/routing";

const jalaliDate = (date: string) => {
  const [gy, gm, gd] = date.split("-").map(Number);
  const { jy, jm, jd } = jalaali.toJalaali(gy, gm, gd);

  return `${jy}/${jm}/${jd}`;
};

const renderContent = (item : {type: string, ord: number, cnt: string, }, placeName: string) => {
  switch (item.type) {
    case "te": // Text
      return (
        <p
          key={item.ord}
          style={{ whiteSpace: "pre-line" }}
          className="leading-10 text-pretty text-justify z-10"
        >
          {item.cnt}
        </p>
      );
    case "ti": // Title
      return <h2 key={item.ord}>{item.cnt}</h2>;
    case "im": // Image
      return (
        <div key={item.ord} className={styles.Image}>
          <Image
            className="!relative"
            fill
            src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/images/places/${item.cnt}`}
            alt={`Image of ${placeName} ${item.ord}`}
          />
        </div>
      );
    case "vi": // Video
      return (
        <div key={item.ord} className="video-content">
          <video controls>
            <source
              src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/videos/places/${item.cnt}`}
              type="video/mp4"
            />
            Your browser does not support HTML5 video.
          </video>
        </div>
      );
    default:
      return null;
  }
};

export default async function PlacesPage({
  params,
}: {
  params?: { [key: string]: string };
}) {
  const { places } = params ?? {};

  const t = await getTranslations();
  const city = params?.city as string;

  const { data } = await FetchData(`places/slug/${decodeURIComponent(places)}`);
  const place = data?.place;
  const relatedPlaces = data?.places ?? [];

  const categories = t.raw("category.categories") as {
    name: string;
    value: string;
  }[];
  const subCategories = t.raw("category.subCategories");
  const categoryName =
    categories.find((c) => c.value === place?.category_slug) ??
    place?.category_slug;
  const subCategoryName =
    subCategories[place.category_slug]?.find(
      (sub: any) => sub.value === place.sub_category_slug,
    ) ?? place.sub_category_slug;

  const slides = relatedPlaces.map(
    (p: { name: string; image_url: string; slug: string }) => ({
      title: p.name,
      imageSrc: p.image_url,
      slug: `${p.slug}`,
    }),
  );

  return (
    <div className="w-full">
      <div className="container my-12">
        <div className="flex-between">
          <Breadcrumb />
          <Button
            outline={true}
            color="secondary"
            text={t("Places.favourite")}
            icon={<IoMdHeartEmpty />}
          />
        </div>

        <div className={styles.placesContainer}>
          <div className={`${styles.col1} flex flex-col gap-6`}>
            <h1 className="mb-4">{place?.name}</h1>
            <div className={styles.Image}>
              <Image
                className="!relative"
                fill
                src={place?.image_url}
                alt={place?.name}
              />
            </div>
            {place?.content?.map((item: { cnt: string; ord: number, type: string }) => renderContent(item, place?.name))}
          </div>

          <div className={styles.col2}>
            <h4 className="mb-5 mt-3">{t("Places.onMap")}</h4>
            <div className="lg:max-h-[450px]">
              <iframe
                loading="lazy"
                src={`https://www.google.com/maps?q=${place?.lat},${place?.long}&hl=fa&output=embed`}
                title={place?.name}
                width="100%"
                height="450"
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
              />
            </div>
            <div className={styles.contactInformation}>
              <h5 className="mt-8">{t("Places.contactInfo")}</h5>
              <div className="flex flex-col gap-4">
                <span className="flex items-center gap-x-2">
                  <MdOutlineLocationOn
                    size={24}
                    className="me-1 text-primary"
                  />
                  {t("Places.address")}: {place?.contact?.address || "نامشخص"}
                </span>
                {place?.contact?.phone && (
                  <a
                    href={FormatPhoneNumberForTelLink(place.contact.phone)}
                    className="flex items-center gap-x-2"
                  >
                    <MdPhone size={24} className="me-1 text-primary" />
                    <span>{t("Places.phone")}: </span>
                    <span> {place.contact.phone} </span>
                  </a>
                )}
                {place?.contact?.website && (
                  <span className="flex items-center">
                    <FaLink size={24} className="me-1 text-primary" />
                    <a
                      href={place.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {place.contact.website}
                    </a>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentContainer}>
          <span className="flex items-center gap-x-4">
            <Image
              src="https://picsum.photos/id/350/200/300"
              width={60}
              height={60}
              alt={place?.author}
              className="w-[60px] h-[60px] rounded-full outline outline-3 outline-primary object-cover"
            />
            <span className="flex flex-col">
              <span className="text-xs">{t("Places.writtenBy")}</span>
              <span className="font-semibold text-black text-sm">
                {place?.author}
              </span>
            </span>
          </span>

          <span>
            <span className="flex flex-col">
              <span className="text-xs">{t("Places.released")}</span>
              <span className="font-semibold text-black text-sm">
                {jalaliDate(place?.updated_at?.split(" ")[0])}
              </span>
            </span>
          </span>

          <span>
            <span className="flex flex-col">
              <span className="text-xs">{t("Places.categories")}</span>
              <Link
                href={`/${city}/${place?.category_slug}`}
                className="font-semibold text-black text-sm"
              >
                {categoryName?.name} {" , "} {subCategoryName?.name}
              </Link>
            </span>
          </span>

          <span>
            <span className="flex flex-col">
              <span className="text-xs">{t("Places.tags")}</span>
              <span className="font-semibold text-black text-sm">
                {place?.tags ?? t("noTags")}
              </span>
            </span>
          </span>
        </div>

        <div className="my-8">
          <SliderCard id="related-places" asPlace={true} category={place.category_slug} slides={slides} city={city} />
        </div>

        <div className="bg-slate-100 py-6 rounded-lg">
          <h2 className="w-full lg:w-1/4 md:w-1/2 flex-center gap-x-0.5 bg-primary text-xl font-bold text-white rounded-e-full py-2 rounded-s-sm">
            <TbDeviceMobileDown size={46} />
            <span>{t("Places.downloadApp")}</span>
          </h2>
          <p className="m-0 mt-12 text-center text-xl lg:mb-0 mb-12 text-primary">
            {t("Places.allPlacesInApp")}
          </p>
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 items-center">
            <div>
              <Image src={downloadApp} alt="" />
            </div>
            <div className="flex flex-col gap-4 items-center">
              <a
                href="https://cafebazaar.ir/app/com.gashtook.guides.app"
                target="_blank"
              >
                <Button
                  text={t("Places.downloadBazzar")}
                  icon={<BsBasket3Fill />}
                  iconFirst={false}
                  iconSize="threeXl"
                  className="!w-[240px] !justify-between"
                />
              </a>
              <a href={`/gashtook.apk`} download>
                <Button
                  text={t("Places.downloadLink")}
                  icon={<DiAndroid />}
                  iconFirst={false}
                  iconSize="threeXl"
                  className="!w-[240px] !justify-between"
                />
              </a>
              <Button
                text={t("Places.downloadPWA")}
                icon={<TbDeviceMobileCode />}
                iconFirst={false}
                iconSize="fourXl"
                className="!w-[240px] !justify-between"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
