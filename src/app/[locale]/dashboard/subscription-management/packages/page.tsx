"use client";

import React, { useEffect, useState } from "react";
import styles from "./packages.module.css";
import Button from "@/components/Button/Button";
import { useTranslations, useLocale } from "next-intl";
import Swal from "sweetalert2";
import NoDataSvg from "@/icons/NoDataSvg";
import BuySubscriptionModal from "../components/BuySubscriptionModal";

interface Subscription {
  name: string;
  price: string;
  features: string[];
  period: string;
  sku: string;
}

export default function Page() {
  const t = useTranslations();
  const locale = useLocale();
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedSku, setSelectedSku] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/subscription", {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const formattedData: Subscription[] = result.data.map((item: { name: string, price: string, features: string, period: string, sku: string }) => ({
            name: item.name,
            price: `${parseInt(item.price).toLocaleString('fa-IR')} ${t("Dashboard.rial")}`,
            features: item.features.split("،"), 
            period: item.period,
            sku: item.sku,
          }));
          setSubscriptions(formattedData);
        } else {
          setSubscriptions([]);
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("error-login"),
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

  const handleBuyClick = (sku: string) => {
    setSelectedSku(sku);
    setModalOpen(true);
  };

  return (
    <div className={styles.packages}>
      <h1 className={styles.title}>{t("Dashboard.packages")}</h1>
      <div className={`${styles.cardsContainer} scroll`}>
        {loading ? (
          [...Array(3)].map((_, index) => <SkeletonCard key={index} />)
        ) : subscriptions && subscriptions.length > 0 ? (
          subscriptions.map((sub, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <span>{sub.name}</span>
                <span>{sub.price}</span>
              </div>
              <ul>
                {sub.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Button
                className={styles.cardButton}
                text={t("Dashboard.buySubscription")}
                outline
                onClick={() => handleBuyClick(sub.sku)}
              />
            </div>
          ))
        ) : (
            <div className="w-full h-full flex-center flex-col gap-4">
            <NoDataSvg className="max-w-48 h-48" />
            <p className="text-center text-gray-500">
              {t("Dashboard.notFound", { type: locale === "fa" ? "پکیج" : "Package" })}
            </p>
          </div>
        )}
      </div>
      {/* نمایش مودال با ارسال sku انتخاب‌شده */}
      <BuySubscriptionModal
        sku={selectedSku}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className={`${styles.card} animate-pulse`}>
      <div className={styles.cardHeader}>
        <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
        <div className="w-1/4 h-5 bg-gray-300 rounded"></div>
      </div>
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="w-3/4 h-4 bg-gray-300 rounded"></li>
        ))}
      </ul>
      <div className={`${styles.cardButton} w-full h-10 bg-gray-300 rounded`}></div>
    </div>
  );
}
