"use client"

import React from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { TbDeviceMobileMessage } from "react-icons/tb";
import { useForm, FormProvider } from "react-hook-form";
import styles from "../login/login-page.module.css";
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
  const onSubmit = (data: unknown) => {
    console.log(data);
    
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
              <TbDeviceMobileMessage size={32} className={styles.loginIcon} />
              <h2 className={styles.loginTitle}>{t("otp-title")}</h2>
            </div>
            <TextInput
              type="text"
              inputMode="numeric"
              label={t("otp-label-input")}
              name="otp"
              id="otp"
              placeHolder="****"
              className="child:text-center"
              validation={{required: "کد تایید الزامی است", pattern: { value: /^\d{4}$/, message: "کد تایید نامعتبر است" }}}
              minLength={4}
              maxLength={4}
            />
            <div className={styles.submitButtonContainer}>
              <Button
                type="submit"
                text={t("otp-text-btn")}
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
