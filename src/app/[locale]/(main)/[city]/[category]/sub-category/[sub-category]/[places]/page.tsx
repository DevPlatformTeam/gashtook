import { useTranslations } from "next-intl";
import Image from "next/image";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";

// import { IoHeart } from "react-icons/io5";
import { TbDeviceMobileDown, TbDeviceMobileCode } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBasket3Fill } from "react-icons/bs";
import { DiAndroid } from "react-icons/di";

import {
  FaTrain,
  FaWhatsappSquare,
  FaTelegram,
  FaTwitter,
  FaFacebookSquare,
} from "react-icons/fa";
import { MdOutlineLocationOn, MdPhone } from "react-icons/md";

import SliderCard from "@/components/SliderCard/SliderCard";

import downloadApp from "@/assets/images/aownloadapp.png";
import styles from "./places.module.css";
import { Link } from "@/i18n/routing";

export default function PlacesPage({
  params,
}: {
  params?: { [key: string]: string };
}) {
  const { city, category, subCategory, places } = params ?? {};
  console.log(city, category, subCategory, places);
  
  const t = useTranslations("Places");
  const slides = [
    {
      title: "موزه ملی ایران",
      imageSrc: "https://picsum.photos/id/222/300/150",
    },
    { title: "کاخ گلستان", imageSrc: "https://picsum.photos/id/220/300/150" },
    {
      title: "موزه هنرهای معاصر",
      imageSrc: "https://picsum.photos/id/200/300/150",
    },
    { title: "برج میلاد", imageSrc: "https://picsum.photos/id/223/300/150" },
    { title: "پل طبیعت", imageSrc: "https://picsum.photos/id/227/300/150" },
    { title: "کاخ گلستان", imageSrc: "https://picsum.photos/id/225/300/150" },
    { title: "برج میلاد", imageSrc: "https://picsum.photos/id/227/300/150" },
  ];

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
          <div className={styles.col1}>
            <h1 className="mb-4"> ایران مال تهران </h1>
            <div className={styles.Image}>
              <Image
                className="object-fit relative"
                fill
                src="https://picsum.photos/id/85/730/450"
                alt=""
              />
            </div>
            <p className="leading-10 text-pretty text-justify z-10">
              باغ نگارستان، از باغ های زیباییست که از قاجار به جا مانده باغ
              نگارستان، باغ زیبایی بوده است با قصری باشکوه، که در آن عکس های
              بسیاری از فتحعلی شاه و درباریان قرار داشته؛ به همین دلیل هم نام آن
              را نگارستان گذاشتند، هرچند امروزه دیگر اثری از آن قصر زیبای درون
              باغ، نیست. میگویند قتلگاه قائم مقام فراهانی هم ،همین باغ بوده است.
              هرچه که هست، باغ بسیار زیباییست که در دل تهران جای گرفته. در این
              باغ، موزه مکتب کمال الملک هم قرار دارد. همینطور کافه های زیبا و
              محیط دلنشینی که بازدید این باغ را دلپذیر تر کرده اند
            </p>
          </div>
          <div className={styles.col2}>
            <h4 className="mb-5 mt-3"> {t("onMap")} </h4>
            <div className="lg:max-h-[450px]">
              <iframe
                loading="lazy"
                src="https://balad.ir/embed?p=1V27gb9hxuSRwq"
                title="مشاهده «شرکت ملک آنلاین» روی نقشه بلد"
                width="100%"
                height="450"
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
              />
            </div>
            <div className={styles.contactInformation}>
              <h5 className="mt-8"> {t("contactInfo")} </h5>
              <div className="flex flex-col gap-4">
                <span className="flex items-center">
                  <MdOutlineLocationOn
                    size={24}
                    className="me-1 text-primary"
                  />
                  آدرس: استان تهران، تهران، بزرگراه اشرفی اصفهانی
                </span>
                <span className="flex items-center">
                  <MdPhone size={24} className="me-1 text-primary" />
                  تلفن: 21654565 021
                </span>
                <span className="flex items-center">
                  <FaLink size={24} className="me-1 text-primary" />
                  www.tirajeh.com :وب سایت
                </span>
                <span className="flex items-center">
                  <FaTrain size={24} className="me-1 text-primary" />
                  مترو: ایستگاه 15 خرداد
                </span>
              </div>
              <div className="mt-12">
                <h5> {t("share")} </h5>
                <span className="flex gap-x-5 text-primary child:size-6 cursor-pointer">
                  <FaWhatsappSquare />
                  <FaTelegram />
                  <FaTwitter />
                  <FaFacebookSquare />
                </span>
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
              alt=""
              className="w-[60px] h-[60px] rounded-full outline outline-3 outline-primary object-cover"
            />
            <span className="flex flex-col">
              <span className="text-xs">{t("writtenBy")}</span>
              <span className="font-semibold text-black text-sm">
                نسترن خالصی
              </span>
            </span>
          </span>

          <span>
            <span className="flex flex-col">
              <span className="text-xs">{t("released")}</span>
              <span className="font-semibold text-black text-sm">
                اردیبهشت 98
              </span>
            </span>
          </span>

          <span>
            <span className="flex flex-col">
              <span className="text-xs">{t("categories")}</span>
              <span className="font-semibold text-black text-sm">
                خرید، مرکز تجاری
              </span>
            </span>
          </span>

          <span>
            <span className="flex flex-col">
              <span className="text-xs">{t("tags")}</span>
              <span className="font-semibold text-black text-sm">
                مکان دیدنی، مرکز تجاری، فروشگاه تجاری
              </span>
            </span>
          </span>
        </div>
        <div className="my-8">
          <div className="w-full flex-between">
            <h6></h6>
            <Link href="#"></Link>
          </div>
          <SliderCard id="best-museums" slides={slides} />
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
            <div className="">
              <Image src={downloadApp} alt="" />
            </div>
            <div className="flex flex-col gap-4 items-center">
              <Button
                text={t("downloadBazzar")}
                icon={<BsBasket3Fill />}
                iconFirst={false}
                iconSize="threeXl"
                className="!w-[240px]"
              />
              <Button
                text={t("downloadLink")}
                icon={<DiAndroid />}
                iconFirst={false}
                iconSize="threeXl"
                className="!w-[240px]"
              />
              <Button
                text={t("downloadPWA")}
                icon={<TbDeviceMobileCode />}
                iconFirst={false}
                iconSize="fourXl"
                className="!w-[240px]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.bgDownloadImage}>
        <div className="absolute bg-[#21a78865] top-0 left-0 size-full"></div>
        <div className="relative size-full flex justify-start flex-row-reverse items-center">
          <div className="w-full md:w-1/3 flex flex-col gap-4 items-center justify-center h-full text-white">
            <h5 className="font-medium text-lg"> {t("downloadApp")} </h5>
            <h4 className="font-extralight text-2xl text-wrap max-w-[284px] text-center">
              {t("allPlacesInApp")}
            </h4>
            <div className="flex-center gap-x-4">
              <Image src={bazzar} alt="Slide 4" className="max-w-[372px]" />
              <Image src={bazzar} alt="Slide 4" className="max-w-[372px]" />
            </div>
          </div>
          <div className="w-1/3 z-10 md:flex justify-center hidden">
            <Image src={mockup} alt="Slide 4" className="max-w-[372px]" />
          </div>
        </div>
      </div> */}
    </div>
  );
}
