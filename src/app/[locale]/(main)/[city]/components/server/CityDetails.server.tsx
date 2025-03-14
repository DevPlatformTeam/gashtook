import CityDetailsClient from "../client/CityDetails.client";

import { FetchData } from "@/components/Fetch/FetchData";

interface CityDetailsServerProps {
  city: string;
  locale: string;
  citySlug: string
}

const fetchData = async () => {
  // در اینجا درخواست API سمت سرور زده می‌شود (اگر نیاز باشد)
  return {
    success: true,
    message: "درخواست با موفقیت انجام شد.",
    data: {
      _id: "5c3353648cc35fd5006f74f2",
      name: "تهران",
      seo: {
        title: "شهر تهران",
        description: "پایتختی بزرگ با مردمانی از سراسر این خاک...",
      },
      budget: {
        title: "مخارج زندگی",
        decs: "به منظور شناخت و اطلاع از وضعیت زندگی در شهر تهران...",
        low: {
          title: "حداقل هزینه لازم برای زندگی در تهران",
          desc: "به منظور امرار معاش و بهره مندی از حداقل امکانات...",
        },
      },
      transport: {
        arrive: [
          {
            _id: "5d2a2bc7e3b27d601b56a816",
            name: "هتل فرودگاه امام خمینی",
            long: "51.155373096466064",
            lat: "35.40585670492782",
            seo: { title: "هتل فرودگاه امام خمینی | گشتوک", description: "" },
            image: "هتل-فرودگاه-امام-خمینی.jpg",
          },
        ],
        around: [
          {
            _id: "5c4f1c1942b44912526b4d05",
            name: "هواپیما",
            description: "داشتن یک دستیار هوشــمند براي انجام کارهاي مختلف...",
            icon: "fas fa-plane",
          },
        ],
      },
      content: [
        {
          type: "te",
          cnt: "آب و هوای استان در مناطق کوهستانی، معتدل و در دشت ها نیمه بیابانی...",
        },
      ],
    },
  };
};

export default async function CityDetailsServer({ city, locale, citySlug }: CityDetailsServerProps) {
  const { data, error } = await FetchData(`cities/${citySlug}/details`);
  console.log(data, error);
  return <CityDetailsClient city={city} locale={locale} data={data} />;
}
