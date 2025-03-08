"use client"

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";

import { FiUserPlus } from "react-icons/fi";

import styles from "./register-page.module.css";
import TextInput from "@/components/TextInput/TextInput";

import Button from "@/components/Button/Button";

import Logo from "@/public/images/logo-white.svg";
import { FormProvider, useForm } from "react-hook-form";
import CheckBox from "@/components/CheckBox/CheckBox";
import { useRouter } from "next/navigation";
import { FormData } from "../FormType";

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const isRtl = locale === "fa";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<FormData>();
  const onSubmit = async (data: { email_mobile: string }) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale, // Pass locale from next-intl
        },
        body: JSON.stringify(data),
        credentials: "include", // Ensures Laravel sets a cookie
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
        sessionStorage.setItem("temp_token", result.token); // Store temporary token
        
        const encodedData = encodeURIComponent(data.email_mobile);
        router.push(`/${locale}/auth/otp?user=${encodedData}`);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full lg:w-2/3 lg:h-4/5 xl:w-1/2 flex justify-center rounded-md">
      <div
        className={`${styles.bgImage} ${isRtl ? "rounded-r-md" : "rounded-l-md"}`}
      >
        <div
          className={`absolute bg-[#21a788c4] top-0 left-0 size-full ${isRtl ? "rounded-r-md" : "rounded-l-md"}`}
        ></div>
        <div className="flex flex-col relative z-50 size-full">
          <div
            className={`w-full flex pt-8 px-8 justify-${isRtl ? "end" : "start"} items-start`}
          >
            <Image className="inset-block-card-btn" src={Logo} alt="Gashtook" />
          </div>
          <div className="w-full h-full flex-center flex-col text-third px-6">
            <h3 className="text-2xl font-bold mb-4">{t("login-to-account")}</h3>
            <p className="min-h-12">{t("notice-login")}</p>
            <div className="w-full flex justify-end mt-12">
              <Button
                text={t("login-to-account")}
                color="third"
                textColor="primary"
                type="button"
                className="!px-8 !py-2 !font-[400]"
                onClick={()=> router.push(`/${locale}/auth/login`)}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`lg:w-1/2 md:w-1/2 w-full bg-white flex flex-col justify-center px-12 ${isRtl ? "rounded-l-md" : "rounded-r-md"} `}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex items-center gap-x-1 mb-6 text-slate-700">
              <FiUserPlus size={26} />
              <h2 className="font-semibold text-md mx-2">
                {t("create-account")}
              </h2>
            </div>
            <TextInput
              type={locale === 'fa' ? "tel" : "email"}
              inputMode={locale === 'fa' ? "numeric" : "email"}
              label={locale === 'fa' ? t("mobile") : t("email")}
              name='email_mobile'
              id={locale === 'fa' ? "mobile" : "email"}
              placeHolder={locale === 'fa' ? "09XXXXXXXXXX" : "example@gmail.com"}
              validation={locale === 'fa' ?
                { required: "شماره تلفن الزامی است", pattern: { value: /^\d{11}$/, message: "شماره تلفن نامعتبر است" } }
                :
                { required: "ایمیل الزامی است", pattern: { value: /\S+@\S+\.\S+/, message: "ایمیل نامعتبر است" } }
              }
            />
            <div className="flex justify-between items-center">
              <CheckBox label={t("register-rules")} labelClassName="text-sm !text-gray-500" />
            </div>
            <div className="flex justify-center mt-12">
              <Button
                type="submit"
                text={t("create-account")}
                color="primary"
                className="!px-12 !py-2 !font-[400]"
                loading={isLoading}
                disabled={isLoading || !methods.formState.isValid}
              />
            </div>
            <div className="lg:hidden md:hidden flex flex-col justify-center text-center mt-12">
              <p className="text-sm mb-6">{t("notice-login")}</p>
              <Link className="text-primary" href={'/auth/login'}>
                {t("signin")}
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
