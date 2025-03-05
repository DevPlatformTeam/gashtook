"use client"
import React from "react";
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
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const router = useRouter();
  const isRtl = locale === "fa";

  const methods = useForm();
  
  const onSubmit = async (data: unknown) => {
    try {
      const response = await fetch("/api/auth/login", {
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
        router.push(`/${locale}/auth/otp-verify`); // Redirect to OTP page
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
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
            <h3 className={styles.registerTitle}>{t("register-in-gashtook")}</h3>
            <p className={styles.registerNotice}>{t("notice-register")}</p>
            <div className={styles.registerButtonContainer}>
              <Button
                text={t("create-account")}
                type="button"
                color="third"
                textColor="primary"
                onClick={()=> router.push(`/${locale}/auth/register`)}
                className={styles.registerButton}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.formContainer} ${isRtl ? styles.roundedL : styles.roundedR}`}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.loginHeader}>
              <TbLogin size={26} className={styles.loginIcon} />
              <h2 className={styles.loginTitle}>{t("login-to-account")}</h2>
            </div>
            <TextInput
              type={locale === 'fa' ? "tel" : "email"}
              inputMode={locale === 'fa' ? "numeric" : "email"}
              label={locale === 'fa' ? t("mobile") : t("email")}
              name={locale === 'fa' ? "mobile" : "email"}
              id={locale === 'fa' ? "mobile" : "email"}
              placeHolder={locale === 'fa' ? "09XXXXXXXXXX" : "example@gmail.com"}
              validation={locale === 'fa' ? 
                {required: "شماره تلفن الزامی است", pattern: { value: /^\d{11}$/, message: "شماره تلفن نامعتبر است" }}
                :
                {required: "ایمیل الزامی است", pattern: { value: /\S+@\S+\.\S+/, message: "ایمیل نامعتبر است" }}
              }
            />
            <div className={styles.submitButtonContainer}>
              <Button
                type="submit"
                text={t("enter")}
                color="primary"
                className={styles.submitButton}
              />
            </div>
            <div className={styles.mobileSignup}>
              <p className={styles.signupNotice}>{t("notice-register")}</p>
              <Link className={styles.signupLink} href={'/auth/register'}>
                {t("signup")}
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
