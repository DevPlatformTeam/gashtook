import { useTranslations } from 'next-intl';
import React from 'react';
import { RxDashboard } from 'react-icons/rx';

export default function DashboardPage() {

  const t = useTranslations();

  return (
    <div className="h-full text-right flex flex-col">
      <h1 className="hidden lg:block text-2xl px-4 font-bold mb-4">{t("Dashboard.dashboard")}</h1>
      <div className="h-full flex-center flex-col gap-4 text-gray-400">
        <RxDashboard className='text-[4rem]' />
        <h2 className='text-2xl font-bold'>{t("Dashboard.welcomeText")}</h2>
      </div>
    </div>
  );
}
