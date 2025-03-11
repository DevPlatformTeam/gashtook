"use client"

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { TbLogin } from "react-icons/tb";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./login-page.module.css";
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";
import Logo from "@/public/images/logo-white.svg";
import MainLogo from "@/assets/images/logo-english-new@2x.png";
import { useRouter } from "next/navigation";
import { FormData } from "../FormType";
import { IoArrowBack } from "react-icons/io5";

export default function LoginPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isRtl = locale === "fa";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<FormData>();
  
  const onSubmit = async (data: { email_mobile: string }) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Language": locale,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      console.log(result);


      if (response.ok) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });

        sessionStorage.setItem("temp_token", result.token);
        const encodedData = encodeURIComponent(data.email_mobile);
        router.push(`/${locale}/auth/otp?user=${encodedData}`);
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: result.error,
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: t("error-login"),
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={`${styles.bgImage} ${isRtl ? styles.roundedR : styles.roundedL}`}>
        <div className={`${styles.overlay} ${isRtl ? styles.roundedR : styles.roundedL}`}></div>
        <div className={styles.bgContent}>
          <div className={styles.logoContainer}>
            <Image className={styles.logo} src={Logo} alt="Gashtook" />
          </div>
          <div className={styles.registerSection}>
            <h3 className={styles.registerTitle}>{t("Auth.register-in-gashtook")}</h3>
            <p className={styles.registerNotice}>{t("Auth.notice-register")}</p>
            <div className={styles.registerButtonContainer}>
              <Button
                text={t("Auth.create-account")}
                type="button"
                color="third"
                textColor="primary"
                onClick={() => router.push(`/${locale}/auth/register`)}
                className={styles.registerButton}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.formContainer} ${isRtl ? styles.roundedL : styles.roundedR}`}>
        <Link href={`/${locale}`} className={`w-full flex md:hidden justify-center items-start`}>
          <Image className="inset-block-card-btn" src={MainLogo} alt="Gashtook" />
        </Link>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.loginHeader}>
              <TbLogin size={26} className={styles.loginIcon} />
              <h2 className={styles.loginTitle}>{t("Auth.login-to-account")}</h2>
            </div>
            <TextInput
              type={locale === 'fa' ? "tel" : "email"}
              inputMode={locale === 'fa' ? "numeric" : "email"}
              label={locale === 'fa' ? t("Auth.mobile") : t("Auth.email")}
              name='email_mobile'
              id={locale === 'fa' ? "mobile" : "email"}
              placeHolder={locale === 'fa' ? "09XXXXXXXXXX" : "example@gmail.com"}
              validation={locale === 'fa' ?
                { required: t("FormValidationMessages.requiredError", {value: "شماره تلفن"}), pattern: { value: /^\d{11}$/, message: t("FormValidationMessages.invalidError", {value: "شماره تلفن"}) } }
                :
                { required: t("FormValidationMessages.requiredError", {value: "Email"}), pattern: { value: /\S+@\S+\.\S+/, message: t("FormValidationMessages.invalidError", {value: "Email"}) } }
              }
            />
            <div className={styles.submitButtonContainer}>
              <Button
                type="button"
                text={t("Auth.otp-text-back-btn")}
                color="primary"
                outline
                className={styles.submitButton}
                icon={<IoArrowBack size={24} />}
                onClick={()=>router.back()}
              />
              <Button
                type="submit"
                text={t("Auth.enter")}
                color="primary"
                className={styles.submitButton}
                loading={isLoading}
                disabled={isLoading || !methods.formState.isValid}
              />
            </div>
            <div className={styles.mobileSignup}>
              <p className={styles.signupNotice}>{t("Auth.notice-register")}</p>
              <Link className={styles.signupLink} href={'/auth/register'}>
                {t("Auth.signup")}
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
