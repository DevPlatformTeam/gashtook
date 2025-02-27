import React from 'react'

import styles from './packages.module.css'
import Button from '@/components/Button/Button'

export default function page() {
  return (
    <div className={styles.packages}>
      <h1 className={styles.title}>خرید اشتراک</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <span>اشتراک روزانه</span>
                <span>3,0000 تومان</span>
            </div>
            <ul>
                <li>مکان ها بدون محدودیت</li>
                <li>دسته ها بدون محدودیت</li>
                <li>شهرها بدون محدودیت</li>
                <li>همه امکانات</li>
            </ul>
            <Button className={styles.cardButton} text='خرید اشتراک' outline />
        </div>
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <span>اشتراک ماهانه</span>
                <span>30,0000 تومان</span>
            </div>
            <ul>
                <li>مکان ها بدون محدودیت</li>
                <li>دسته ها بدون محدودیت</li>
                <li>شهرها بدون محدودیت</li>
                <li>همه امکانات</li>
            </ul>
            <Button className={styles.cardButton} text='خرید اشتراک' outline />
        </div>
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <span>اشتراک سالیانه</span>
                <span>100,0000 تومان</span>
            </div>
            <ul>
                <li>مکان ها بدون محدودیت</li>
                <li>دسته ها بدون محدودیت</li>
                <li>شهرها بدون محدودیت</li>
                <li>همه امکانات</li>
            </ul>
            <Button className={styles.cardButton} text='خرید اشتراک' outline />
        </div>
      </div>
    </div>
  )
}
