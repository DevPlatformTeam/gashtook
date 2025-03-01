"use client";

import { useState } from "react";

const tabs = [
  { 
    id: "tehran", 
    label: "درباره تهران", 
    content: `
      تهران پایتخت ایران است و دارای جمعیتی بالغ بر ۸ میلیون نفر می‌باشد. 
      این شهر یکی از بزرگترین و مهم‌ترین مراکز اقتصادی، فرهنگی و سیاسی ایران محسوب می‌شود.
      آب‌وهوای تهران به دلیل موقعیت جغرافیایی آن متغیر است و تابستان‌های گرم و زمستان‌های سرد دارد.
    ` 
  },
  { 
    id: "areas", 
    label: "مناطق شهری", 
    content: `
      تهران دارای ۲۲ منطقه شهری است که هرکدام ویژگی‌های خاص خود را دارند. 
      از مناطق مشهور می‌توان به منطقه ۱ (نیاوران، زعفرانیه)، منطقه ۱۲ (بازار تهران) و منطقه ۵ (آریاشهر، جنت‌آباد) اشاره کرد.
      هر منطقه شهرداری مجزا و خدمات مختص به خود را دارد.
    ` 
  },
  { 
    id: "transport", 
    label: "حمل و نقل", 
    content: `
      حمل و نقل عمومی تهران شامل مترو، اتوبوس، تاکسی و دوچرخه‌های اشتراکی است. 
      مترو تهران یکی از سریع‌ترین و به‌صرفه‌ترین روش‌های جابجایی در شهر محسوب می‌شود.
      علاوه بر این، اتوبوس‌های تندرو (BRT) نقش مهمی در کاهش ترافیک دارند.
    ` 
  },
  { 
    id: "budget", 
    label: "بودجه", 
    content: `
      بودجه شهرداری تهران از منابع مختلفی تأمین می‌شود، از جمله مالیات‌های شهری، عوارض و کمک‌های دولتی.
      بخشی از بودجه صرف توسعه زیرساخت‌های حمل‌ونقل، زیباسازی شهری و ارائه خدمات عمومی می‌شود.
      مدیریت بهینه بودجه یکی از چالش‌های بزرگ مدیریت شهری تهران است.
    ` 
  }
];


export default function CityDetails({ params }: { params?: { [key: string]: any } }) {
  const [activeTab, setActiveTab] = useState("tehran");

  return (
    <div className="w-full max-w-3xl mx-auto mt-16">
      <div className="relative w-full border-b border-gray-300 pb-3">
        <div className="flex justify-center gap-x-12 max-w-3xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[14px] font-medium relative transition-colors duration-300 ${
                activeTab === tab.id ? "text-primary" : "text-secondary"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute -bottom-[13px] left-0 w-full h-[3px] bg-primary"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-10 text-secondary text-right text-sm">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </p>
    </div>
  );
}
