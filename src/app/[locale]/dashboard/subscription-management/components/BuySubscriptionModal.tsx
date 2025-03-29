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

  const [redirecting, setRedirecting] = useState<boolean>(false);

  const handleOnClose = () => {
    setError(null);
    onClose();
  }
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
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "خطایی رخ داده است";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [locale, t, sku, isOpen]);

  const handlePay = async () => {
    if (!subscriptionData) return;
    try {
      setRedirecting(true); 
      const response = await fetch("/api/dashboard/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale,
        },
        credentials: "include",
        body: JSON.stringify({ orderId: subscriptionData.order }),
      });
      const data: ApiResponse<{ url: string }> = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("requestFailed"));
      }

      if (data?.data?.url) {
        window.location.assign(data.data.url);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "خطایی رخ داده است";
      setError(errorMessage);
      setRedirecting(false);
    }
  };

  const renderBody = () => {
    if (redirecting) {
      return (
        <div className="animate-pulse flex flex-col items-center justify-center min-h-[200px]">
          <p className="animate-pulse text-center text-lg mb-4">{t("redirectingToBank")}</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="animate-pulse flex flex-col gap-5 text-base">
          {/* اسکلت لودر */}
          <div className="w-5/6 h-8 bg-gray-300 rounded mx-auto"></div>
          <div className="w-3/4 h-8 bg-gray-300 rounded mx-auto"></div>
          {[...Array(4)].map((_, i) => (
            <div className="flex gap-x-8" key={i}>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="flex-1 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500 text-center text-xl">{error}</div>;
    }

    if (subscriptionData) {
      return (
        <div className="flex flex-col gap-5">
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
        </div>
      );
    }

    return null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnClose}
      footerBtn={t("pay")}
      title={t("factorTitle")}
      body={renderBody()}
      onFooterAction={handlePay}
      showFooterBtn={!error && !redirecting && !loading}
    />
  );
}
