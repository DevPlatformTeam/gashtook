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

const jalaliDate = (date: string) => {
  const [gy, gm, gd] = date.split("-").map(Number);
  const { jy, jm, jd } = jalaali.toJalaali(gy, gm, gd);

  return `${jy}/${jm}/${jd}`;
};
export default async function PlacesPage({
  params,
}: {
  params?: { [key: string]: string };
}) {
  const { places } = params ?? {};

  const t = await getTranslations("Places");
  const city = params?.city as string;

  const { data } = await FetchData(`places/slug/${decodeURIComponent(places)}`);
  const place = data?.place;
  const relatedPlaces = data?.places ?? [];

  const slides = relatedPlaces.map(
    (p: { name: string; image_url: string; slug: string }) => ({
      title: p.name,
      imageSrc: p.image_url,
      link: `/places/${p.slug}`,
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
            text={t("favourite")}
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
            <p className="leading-10 text-pretty text-justify z-10">
              {place?.content?.[0]?.cnt}
            </p>
          </div>

          <div className={styles.col2}>
            <h4 className="mb-5 mt-3">{t("onMap")}</h4>
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
              <h5 className="mt-8">{t("contactInfo")}</h5>
              <div className="flex flex-col gap-4">
                <span className="flex items-center gap-x-2">
                  <MdOutlineLocationOn
                    size={24}
                    className="me-1 text-primary"
                  />
                  {t("address")}: {place?.contact?.address || "نامشخص"}
                </span>
                {place?.contact?.phone && (
                  <a
                    href={FormatPhoneNumberForTelLink(place.contact.phone)}
                    className="flex items-center gap-x-2"
                  >
                    <MdPhone size={24} className="me-1 text-primary" />
                    <span>{t("phone")}: </span>
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
              <span className="text-xs">{t("writtenBy")}</span>
              <span className="font-semibold text-black text-sm">
                {place?.author}
              </span>
            </span>
          </span>

          <span>
            <span className="flex flex-col">
              <span className="text-xs">{t("released")}</span>
              <span className="font-semibold text-black text-sm">
                {jalaliDate(place?.updated_at?.split(" ")[0])}
              </span>
            </span>
          </span>

          <span>
            <span className="flex flex-col">
              <span className="text-xs">{t("categories")}</span>
              <span className="font-semibold text-black text-sm">
                {place?.category_slug}
              </span>
            </span>
          </span>

          <span>
            <span className="flex flex-col">
              <span className="text-xs">{t("tags")}</span>
              <span className="font-semibold text-black text-sm">
                {place?.sub_category_slug}
              </span>
            </span>
          </span>
        </div>

        <div className="my-8">
          <SliderCard id="related-places" slides={slides} city={city} />
        </div>

        <div className="bg-slate-100 py-6 rounded-lg">
          <h2 className="w-full lg:w-1/4 md:w-1/2 flex-center gap-x-0.5 bg-primary text-xl font-bold text-white rounded-e-full py-2 rounded-s-sm">
            <TbDeviceMobileDown size={46} />
            <span>{t("downloadApp")}</span>
          </h2>
          <p className="m-0 mt-12 text-center text-xl lg:mb-0 mb-12 text-primary">
            {t("allPlacesInApp")}
          </p>
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 items-center">
            <div>
              <Image src={downloadApp} alt="" />
            </div>
            <div className="flex flex-col gap-4 items-center">
              <Button
                text={t("downloadBazzar")}
                icon={<BsBasket3Fill />}
                className="!w-[240px]"
              />
              <Button
                text={t("downloadLink")}
                icon={<DiAndroid />}
                className="!w-[240px]"
              />
              <Button
                text={t("downloadPWA")}
                icon={<TbDeviceMobileCode />}
                className="!w-[240px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
