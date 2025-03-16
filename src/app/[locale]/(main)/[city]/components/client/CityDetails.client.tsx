"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useTranslations, useLocale } from "next-intl";

import NoDataSvg from "@/icons/NoDataSvg";
import SliderCard from "@/components/SliderCard/SliderCard";

interface CitySeo {
  title: string;
  description: string;
}

interface BudgetDetail {
  title: string;
  desc: string;
}

interface Budget {
  title: string;
  decs: string;
  money: string;
  low?: BudgetDetail | null;
  mid?: BudgetDetail | null;
  top?: BudgetDetail | null;
}

interface TransportArrival {
  _id: string;
  name: string;
  long: string;
  lat: string;
  seo: CitySeo;
  image: string;
}

interface TransportAround {
  _id: string;
  name: string;
  description: string;
  icon: string;
}

interface Transport {
  arrive: TransportArrival[];
  around: TransportAround[];
}

interface ContentItem {
  type: string;
  cnt: string;
}

interface CityData {
  _id: string;
  name: string;
  seo: CitySeo;
  budget: Budget;
  transport: Transport;
  content: ContentItem[];
  city_collections: Collections[];
}

interface Collections {
  imageSrc: string;
  title: string;
  slug: string;
}

interface CityDetailsProps {
  data: CityData;
  city: string;
  locale: string;
}

export default function CityDetailsClient({ data, city }: CityDetailsProps) {
  const t = useTranslations();
  const locale = useLocale();

  const [resize, setResize] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("city");
  const [activeTabLeft, setActiveTabLeft] = useState(0);
  const [activeTabWidth, setActiveTabWidth] = useState(0);

  const updateOffset = useCallback((tab: HTMLElement | null) => {
    if (tab) {
      setActiveTabWidth(tab.clientWidth);
      setActiveTabLeft(tab.offsetLeft);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setResize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const tab = document.querySelector(".active-tab") as HTMLElement | null;
    if (tab) {
      updateOffset(tab);
    }
  }, [activeTab, resize, updateOffset]);

  const tabs = useMemo(
    () => [
      { key: "city", label: `${t("CityDetail.About")} ${city}` },
      { key: "collection", label: `${t("CityDetail.Collections")}` },
      { key: "transport", label: `${t("CityDetail.Transportation")}` },
      { key: "budget", label: `${t("CityDetail.Budget")}` },
    ],
    [city, t],
  );

  const renderContent = () => {
    switch (activeTab) {
      case "city":
        return (
          <p className="text-justify leading-7">
            {data?.content?.[0]?.cnt || t('CityDetail.NoData') }{" "}
            {/* TODO city show dynamic */}
          </p>
        );
      case "collection":
        return data?.city_collections && data?.city_collections.length > 0 ? (
          <div className="h-full min-h-72 md:min-h-80 xl:min-h-96 rounded-2xl p-0 m-0">
            <SliderCard
              showPagination={true}
              mdPerView={2}
              xlPerView={3}
              slidesPerView={1.3}
              id="best-museums"
              slides={data?.city_collections}
              textOnCard={true}
              city={city}
            />
          </div>
        ) : (
          <div className="w-full h-full flex-center flex-col grow gap-4">
            <NoDataSvg className="max-w-36 h-36" />
            <p className="text-center text-gray-500">
              {t("CityDetail.CollectionsNotFound")}
            </p>
          </div>
        );
      case "transport":
        return (
          <div>
            <h1 className="text-center text-xl font-bold mb-4">
              {t("CityDetail.Arrive-To")} {city}
            </h1>
            <ul className={`${locale == 'fa' ? "text-right" : 'text-left'} mb-6`}>
              {data?.transport?.arrive?.map((item) => (
                <li key={item._id} className="mb-2">
                  <a
                    href="#"
                    className="text-primary font-semibold hover:underline"
                  >
                    {item.name}
                  </a>
                </li>
              )) || <p> { t('CityDetail.NoData') } </p>}
            </ul>
            <h2 className="text-center text-lg font-bold mb-3">
              {t("CityDetail.Urban", { city: `${city}` })}
            </h2>
            <ul className={`${locale == 'fa' ? 'text-right' : 'text-left'}`}>
              {data?.transport?.around?.map((item) => (
                <li key={item._id} className="mb-4">
                  <div className="flex items-center">
                    <span className={`text-2xl text-primary`}></span>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.description}
                  </p>
                </li>
              )) || <p> { t('CityDetail.NoData') } </p>}
            </ul>
          </div>
        );
      case "budget":
        return (
          <div className="text-center">
            {
              data?.budget?.title && data?.budget?.decs ? <div>
              <div>
                <span className="text-xl font-bold border-b-2 border-b-primary">
                  {data?.budget?.title}
                </span>
                <p className="my-4">
                  {data?.budget?.decs || t('CityDetail.NoData') }
                </p>
              </div>

              <div className="my-2">
                <span className="text-xl font-bold border-b-2 border-b-primary">
                  {t("CityDetail.Currency")}
                </span>
                <p
                  className="my-4"
                  dangerouslySetInnerHTML={{ __html: data?.budget?.money }}
                />
              </div>

              {data?.budget?.low ? (
                <div className="my-2">
                  <span className="text-xl font-bold border-b-2 border-b-primary">
                    {data?.budget?.low?.title || t("CityDetail.Currency")}
                  </span>
                  <p className="my-4">
                    {data?.budget?.low?.desc || t('CityDetail.NoData') }
                  </p>
                </div>
              ) : (
                ""
              )}

              {data?.budget?.mid ? (
                <div className="my-2">
                  <span className="text-xl font-bold border-b-2 border-b-primary">
                    {data?.budget?.mid?.title || t("CityDetail.Currency")}
                  </span>
                  <p className="my-4">
                    {data?.budget?.mid?.desc || t('CityDetail.NoData') }
                  </p>
                </div>
              ) : (
                ""
              )}

              {data?.budget?.top ? (
                <div className="my-2">
                  <span className="text-xl font-bold border-b-2 border-b-primary">
                    {data?.budget?.top?.title || t("CityDetail.Currency")}
                  </span>
                  <p className="my-4">
                    {data?.budget?.top?.desc || t('CityDetail.NoData') }
                  </p>
                </div>
              ) : (
                ""
              )}
            </div> : <p>{ t('CityDetail.NoData') }</p>
            }
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-96 mx-auto mt-16 container mb-10 transition-all">
      <div className="relative w-full border-b border-gray-300 pb-3">
        <div className="flex justify-evenly flex-wrap mx-auto h-fit">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`grow text-xs lg:text-lg font-medium relative transition-all w-fit ${
                activeTab === key ? "text-primary active-tab" : "text-secondary"
              }`}
            >
              {label}
            </button>
          ))}
          <span
            className={
              "absolute bottom-0 left-0 h-[3px] bg-primary transition-all rounded-t-full"
            }
            style={{ width: activeTabWidth, left: activeTabLeft }}
          ></span>
        </div>
      </div>

      <div className={`mt-10 h-full flex flex-col grow text-secondary ${locale == 'fa' ? 'text-right' : 'text-left'} text-sm`}>
        {renderContent()}
      </div>
    </div>
  );
}
