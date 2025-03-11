"use client"

import Button from '@/components/Button/Button';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react'
import { PiBriefcaseLight } from 'react-icons/pi';

interface Subscription {
  type: string;
  price: string;
  orderNumber: string;
  status: boolean;
  Referencecode: string;
}

export default function Page() {

  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  const data: Subscription[] = [
    {
      type: t("Dashboard.yearlySubscription"),
      price: `100,000 ${t("Dashboard.rial")}`,
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
    {
      type: t("Dashboard.dailySubscription"),
      price: `3,000 ${t("Dashboard.rial")}`,
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
    {
      type: t("Dashboard.dailySubscription"),
      price: `3,000 ${t("Dashboard.rial")}`,
      orderNumber: "159",
      status: false,
      Referencecode: "1234567890",
    },
    {
      type: t("Dashboard.dailySubscription"),
      price: `3,000 ${t("Dashboard.rial")}`,
      orderNumber: "159",
      status: false,
      Referencecode: "1234567890",
    },
    {
      type: t("Dashboard.dailySubscription"),
      price: `3,000 ${t("Dashboard.rial")}`,
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
    {
      type: t("Dashboard.dailySubscription"),
      price: `3,000 ${t("Dashboard.rial")}`,
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
    {
      type: t("Dashboard.dailySubscription"),
      price: `3,000 ${t("Dashboard.rial")}`,
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
    {
      type: t("Dashboard.dailySubscription"),
      price: `3,000 ${t("Dashboard.rial")}`,
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
    {
      type: t("Dashboard.dailySubscription"),
      price: `3,000 ${t("Dashboard.rial")}`,
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
    {
      type: t("Dashboard.dailySubscription"),
      price: `3,000 ${t("Dashboard.rial")}`,
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
  ];
  return (
    <div className="h-full text-start">
      <h1 className="hidden lg:block text-xl font-bold pb-4 mx-6 border-b-2 border-gray-200">{t("Dashboard.subscriptionManagement")}</h1>
      {data.length > 0 ? <table className="flex !text-center lg:text-lg text-xs flex-col w-full h-full px-6 overflow-y-auto scroll pt-4 pb-10">
        <thead className='w-full flex justify-between items-center child:text-gray-400 child:w-1/5 pb-4 border-b border-gray-100'>
          <th>
            <span>{t("Dashboard.subscriptionType")}</span>
          </th>
          <th>
            <span>{t("Dashboard.price")}</span>
          </th>
          <th>
            <span>{t("Dashboard.orderNumber")}</span>
          </th>
          <th>
            <span>{t("Dashboard.status")}</span>
          </th>
          <th>
            <span>{t("Dashboard.referenceCode")}</span>
          </th>
        </thead>
        <tbody className='w-full flex flex-col gap-3 divide-y divide-gray-100 child:pt-3'>
          {data.map((card, index) => (
            <tr key={index} className='w-full flex justify-between items-center child:w-1/4 child:text-secondary'>
              <td>{card.type}</td>
              <td>{card.price}</td>
              <td>{card.orderNumber}</td>
              <td>{card.status ? <span className='text-primary'>{locale === 'fa' ? 'فعال' : 'Active'}</span> : <span className='text-red-400'>{locale === 'fa' ? 'غیرفعال' : 'Inactive'}</span>}</td>
              <td>{card.Referencecode}</td>
            </tr>
          ))}
        </tbody>
        <div className='mt-10 w-full flex-center'>
          <Button onClick={() => router.push('subscription-management/packages')} text={locale === 'fa' ? "خرید اشتراک" : "Buy Subscription"} color='primary' textColor='background' />
        </div>
      </table> :
        <div className={"w-full h-full flex-center flex-col"}>
          <PiBriefcaseLight className="size-20 text-gray-500" />
          <p className="text-center text-gray-500">{t("Dashboard.notFound", { type: locale === "fa" ? "اشتراکی" : "subscription" })}</p>
          <Button text={locale === 'fa' ? "خرید اشتراک" : "Buy Subscription"} color='primary' textColor='background' className='font-normal mt-8 px-8' />
        </div>
      }
    </div>
  );
}
