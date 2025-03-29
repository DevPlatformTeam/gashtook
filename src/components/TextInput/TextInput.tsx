import { useFormContext } from "react-hook-form";
import styles from "./textinput.module.css";
import { InputHTMLAttributes } from "react";
import { useLocale } from "next-intl";

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id: string;
  placeHolder: string;
  type: "text" | "password" | "number" | "tel" | "email";
  inputMode?:
    | "text"
    | "search"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
  className?: string;
  validation?: object;
  autocomplete?: string;
}

export default function TextInput({
  label,
  name,
  id,
  placeHolder,
  type,
  inputMode = "text",
  validation = {},
  className,
  ...props
}: ITextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const locale = useLocale();

  return (
    <div className={`block w-full mb-6 ${className ?? ""}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        {...register(name, validation)}
        type={type}
        autoComplete={props.autoComplete || "on"}
        inputMode={inputMode}
        className={`${styles.input} ${errors[name] && "!outline-red-500 focus:!outline-red-500"}`}
        id={id}
        placeholder={placeHolder}
        {...props}
        dir={locale === "fa" ? "rtl" : "ltr"}
      />
      {errors[name] && (
        <p className={styles.error}>{(errors[name]?.message as string) || "خطای نامعتبر"}</p>
      )}
    </div>
  );
}