"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Modal from "@/components/Modal/Modal";

interface SubscriptionData {
  payer: string;
  order: string;
  cost: string;
  start: string;
  end: string;
  title: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface BuySubscriptionModalProps {
  sku: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function BuySubscriptionModal({
  sku,
  isOpen,
  onClose,
}: BuySubscriptionModalProps) {
  const locale = useLocale();
  const t = useTranslations("Payment");
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return; 
    setLoading(true);
    const fetchSubscriptionData = async () => {
      try {
        const response = await fetch("/api/dashboard/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": locale,
          },
          credentials: "include",
          body: JSON.stringify({ sku }), 
        });
        const data: ApiResponse<SubscriptionData> = await response.json();

        if (!response.ok) {
          throw new Error(data.message || t("requestFailed"));
        }

        setSubscriptionData(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [locale, t, sku, isOpen]);

  const handlePay = async () => {
    if (!subscriptionData) return;
    try {
      const response = await fetch("/api/dashboard/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale,
        },
        credentials: "include",
        body: JSON.stringify({ orderId: subscriptionData.order }),
      });
      const data: ApiResponse<{url: string}> = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("requestFailed"));
      }

      if (data?.data?.url) {
        window.location.assign(data.data.url);
        return;
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      footerBtn={t("pay")}
      title={t("factorTitle")}
      showFooterBtn={!error}
      body={
        <div className="flex flex-col gap-5 text-base">
          {loading ? (
            <div className="animate-pulse flex flex-col gap-5 text-base">
              <div className="w-5/6 h-8 bg-gray-300 rounded mx-auto"></div>
              <div className="w-3/4 h-8 bg-gray-300 rounded mx-auto"></div>
              <div className="flex gap-x-8">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="flex-1 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="flex gap-x-8">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="flex-1 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="flex gap-x-8">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="flex-1 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="flex gap-x-8">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="flex-1 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center text-xl mt-6">{error}</div>
          ) : subscriptionData ? (
            <>
              <p className="text-center text-lg mt-2 mb-8">
                {subscriptionData.title}
              </p>

              <div className="flex gap-x-8">
                <span>{t("payer")}:</span>
                <span>{subscriptionData.payer}</span>
              </div>
              <div className="flex gap-x-8">
                <span>{t("cost")}:</span>
                <span>{subscriptionData.cost}</span>
              </div>
              <div className="flex gap-x-8">
                <span>{t("start")}:</span>
                <span>{subscriptionData.start}</span>
              </div>
              <div className="flex gap-x-9">
                <span>{t("end")}:</span>
                <span>{subscriptionData.end}</span>
              </div>
            </>
          ) : null}
        </div>
      }
      onFooterAction={handlePay}
    />
  );
}
