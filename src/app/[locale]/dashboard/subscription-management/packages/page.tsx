import React from 'react'

import styles from './packages.module.css'
import Button from '@/components/Button/Button'
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();
  return (
    <div className={styles.packages}>
      <h1 className={styles.title}>{t("Dashboard.packages")}</h1>
      <div className={`${styles.cardsContainer} scroll`}>
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <span>{t("Dashboard.dailySubscription")}</span>
                <span>{`3,000 ${t("Dashboard.rial")}`}</span>
            </div>
            <ul>
                <li>{t("Dashboard.placesWithoutLimit")}</li>
                <li>{t("Dashboard.categoriesWithoutLimit")}</li>
                <li>{t("Dashboard.citiesWithoutLimit")}</li>
                <li>{t("Dashboard.allFeatures")}</li>
            </ul>
            <Button className={styles.cardButton} text={t("Dashboard.buySubscription")} outline />
        </div>
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <span>{t("Dashboard.monthlySubscription")}</span>
                <span>{`30,000 ${t("Dashboard.rial")}`}</span>
            </div>
            <ul>
                <li>{t("Dashboard.placesWithoutLimit")}</li>
                <li>{t("Dashboard.categoriesWithoutLimit")}</li>
                <li>{t("Dashboard.citiesWithoutLimit")}</li>
                <li>{t("Dashboard.allFeatures")}</li>
            </ul>
            <Button className={styles.cardButton} text={t("Dashboard.buySubscription")} outline />
        </div>
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <span>{t("Dashboard.yearlySubscription")}</span>
                <span>{`100,000 ${t("Dashboard.rial")}`}</span>
            </div>
            <ul>
                <li>{t("Dashboard.placesWithoutLimit")}</li>
                <li>{t("Dashboard.categoriesWithoutLimit")}</li>
                <li>{t("Dashboard.citiesWithoutLimit")}</li>
                <li>{t("Dashboard.allFeatures")}</li>
            </ul>
            <Button className={styles.cardButton} text={t("Dashboard.buySubscription")} outline />
        </div>
      </div>
    </div>
  )
}
