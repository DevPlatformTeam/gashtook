import React from 'react'

import styles from "./textareaInputStyle.module.css";

type Props = {
    id: string;
    name: string;
    placeholder: string;
    label: string;
    minLength?: number;
    maxLength?: number;
}

export default function TextareaInputComponent({id, name, placeholder, label, minLength, maxLength}: Props) {
  return (
    <div className={styles["text-area-input"]}>
        <label htmlFor={id}>{label}</label>
        <textarea name={name} id={id} placeholder={placeholder} minLength={minLength} maxLength={maxLength}></textarea>
    </div>
  )
}
