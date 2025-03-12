"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Image from "next/image";
import { useLocale } from "next-intl";

import Map from "@/assets/images/map-category/image-1@3x.jpg";

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
  low: BudgetDetail;
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
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: CityData;
}

interface CityDetailsProps {
  data: ApiResponse;
  city: string;
  locale: string;
}

export default function CityDetailsClient({ data, city, locale }: CityDetailsProps) {
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
      { key: "city", label: "درباره تهران" },
      { key: "areas", label: "مناطق شهری" },
      { key: "transport", label: "حمل و نقل" },
      { key: "budget", label: "بودجه" },
    ],
    [],
  );

  const renderContent = () => {
    switch (activeTab) {
      case "city":
        return <p>{data?.data?.content?.[0]?.cnt || "اطلاعاتی موجود نیست."}</p>;
      case "areas":
        return (
          <Image src={Map} alt="map" className="w-[70%] h-[400px] mx-auto" />
        );
      case "transport":
        return (
          <div>
            <h1 className="text-center text-xl font-bold mb-4">
              رسیدن به تهران
            </h1>
            <ul className="text-right mb-6">
              {data?.data?.transport?.arrive?.map((item) => (
                <li key={item._id} className="mb-2">
                  <a
                    href="#"
                    className="text-primary font-semibold hover:underline"
                  >
                    {item.name}
                  </a>
                </li>
              )) || <p>اطلاعاتی موجود نیست.</p>}
            </ul>
            <h2 className="text-center text-lg font-bold mb-3">
              حمل و نقل شهری تهران
            </h2>
            <ul className="text-right">
              {data?.data?.transport?.around?.map((item) => (
                <li key={item._id} className="mb-4">
                  <div className="flex items-center">
                    <span
                      className={`text-2xl text-primary ml-2 ${item.icon}`}
                    ></span>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.description}
                  </p>
                </li>
              )) || <p>اطلاعاتی موجود نیست.</p>}
            </ul>
          </div>
        );
      case "budget":
        return (
          <div className="text-center">
            <h1 className="text-xl font-bold mb-4">
              {data?.data?.budget?.title || "بودجه"}
            </h1>
            <p className="mb-6">
              {data?.data?.budget?.decs || "اطلاعاتی موجود نیست."}
            </p>
            <h2 className="text-lg font-bold">
              {data?.data?.budget?.low?.title || "حداقل هزینه"}
            </h2>
            <p className="text-gray-700">
              {data?.data?.budget?.low?.desc || "اطلاعاتی موجود نیست."}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-96 max-w-3xl mx-auto mt-16 container mb-10 transition-all">
      <div className="relative w-full border-b border-gray-300 pb-3">
        <div className="flex justify-evenly flex-wrap mx-auto h-fit">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`grow text-[14px] lg:text-lg font-medium relative transition-all w-fit ${
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

      <div className="mt-10 text-secondary text-right text-sm">
        {renderContent()}
      </div>
    </div>
  );
}
