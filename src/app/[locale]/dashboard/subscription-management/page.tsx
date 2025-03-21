"use client";

import Button from "@/components/Button/Button";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PiBriefcaseLight } from "react-icons/pi";
import React, { useEffect, useState } from "react";
import number_format from "@/utils/number_format";
import Swal from "sweetalert2";

interface Subscription {
  type: string;
  price: string;
  orderNumber: number;
  status: boolean;
  referenceCode: string;
}

export default function Page() {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();

  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/invoices", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const formattedData: Subscription[] = result.data.map((item) => ({
            type: item.subscriptions[0],
            price: `${item.total_price} ${t("Dashboard.rial")}`,
            orderNumber: item.oid,
            status: item.status === 1,
            referenceCode: item.refid,
          }));
          setSubscriptions(formattedData);
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("Dashboard.error-login"),
          text: error instanceof Error ? error.message : String(error),
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  return (
    <div className="h-full text-start">
      <h1 className="hidden lg:block text-xl font-bold pb-4 mx-6 border-b-2 border-gray-200">
        {t("Dashboard.subscriptionManagement")}
      </h1>

      {loading ? (
        <SkeletonTable />
      ) : subscriptions && subscriptions.length > 0 ? (
        <table className="flex !text-center lg:text-lg text-xs flex-col w-full h-full px-6 overflow-y-auto scroll pt-4 pb-10">
          <thead className="w-full flex justify-between items-center child:text-gray-400 child:w-1/5 pb-4 border-b border-gray-100">
            <th>{t("Dashboard.subscriptionType")}</th>
            <th>{t("Dashboard.price")} ({t("Dashboard.rial")})</th>
            <th>{t("Dashboard.orderNumber")}</th>
            <th>{t("Dashboard.status")}</th>
            <th>{t("Dashboard.referenceCode")}</th>
          </thead>
          <tbody className="w-full flex flex-col gap-3 divide-y divide-gray-100 child:pt-3">
            {subscriptions.map((sub, index) => (
              <tr key={index} className="w-full flex justify-between items-center child:w-1/4 child:text-secondary">
                <td>{sub.type}</td>
                <td>{number_format(parseInt(sub.price), locale)}</td>
                <td>{sub.orderNumber}</td>
                <td>
                  {sub.status ? (
                    <span className="text-primary">{t("Dashboard.active")}</span>
                  ) : (
                    <span className="text-red-400">{t("Dashboard.inactive")}</span>
                  )}
                </td>
                <td>{sub.referenceCode}</td>
              </tr>
            ))}
          </tbody>
          <div className="mt-10 w-full flex-center">
            <Button onClick={() => router.push("subscription-management/packages")} text={t("Dashboard.buySubscription")} color="primary" textColor="background" />
          </div>
        </table>
      ) : (
        <div className="w-full h-full flex-center flex-col">
          <PiBriefcaseLight className="size-20 text-gray-500" />
          <p className="text-center text-gray-500">{t("Dashboard.notFound", { type: t("Dashboard.subscriptionType") })}</p>
          <Button onClick={() => router.push("subscription-management/packages")} text={t("Dashboard.buySubscription")} color="primary" textColor="background" className="font-normal mt-8 px-8" />
        </div>
      )}
    </div>
  );
}

function SkeletonTable() {
  return (
    <table className="flex !text-center lg:text-lg text-xs flex-col w-full h-full px-6 overflow-y-auto scroll pt-4 pb-10">
      <thead className="w-full flex justify-between items-center child:text-gray-400 child:w-1/5 pb-4 border-b border-gray-100">
        {[...Array(5)].map((_, index) => (
          <th key={index}>
            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
          </th>
        ))}
      </thead>
      <tbody className="w-full flex flex-col gap-3 divide-y divide-gray-100 child:pt-3">
        {[...Array(6)].map((_, index) => (
          <tr key={index} className="w-full flex justify-between items-center child:w-1/4">
            {[...Array(5)].map((_, idx) => (
              <td key={idx}>
                <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
