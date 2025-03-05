import React from "react";

import styles from "./textareaInputStyle.module.css";
import { useFormContext } from "react-hook-form";

type Props = {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  minLength?: number;
  maxLength?: number;
  validation?: object;
};

export default function TextareaInputComponent({
  id,
  name,
  placeholder,
  label,
  minLength,
  maxLength,
  validation,
}: Props) {

  const { register, formState: { errors } } = useFormContext();

  return (
    <div className={styles["text-area-input"]}>
      <label htmlFor={id}>{label}</label>
      <textarea
        {...register("message", validation)}
        name={name}
        id={id}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
      ></textarea>
      {errors[name] && (
        <p className="text-red-500 text-sm">{(errors[name]?.message as string) || "خطای نامعتبر"}</p>
      )}
    </div>
  );
}
