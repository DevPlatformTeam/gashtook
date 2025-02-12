import React from 'react'

import Image from "next/image";

import { StaticImageData } from "next/image";

import styles from "./layoutOtherPages.module.css";

type Props = {
    image: StaticImageData;
    title: string;
    children: React.ReactNode;
}

export default function LayoutOtherPagesComponent({ image, title, children }: Props) {
    return (
        <div className={styles.layoutOtherPages}>
            <div className={styles.image}>
                <Image src={image} alt={title} />
            </div>
            <div className={styles.content}>
                <h1>{title}</h1>
                {children}
            </div>
        </div>
    )
}
