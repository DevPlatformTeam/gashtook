"use client";

import React, { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { useForm, FormProvider } from "react-hook-form";

import { TbDeviceMobileMessage } from "react-icons/tb";

import Swal from "sweetalert2";

import styles from "../login/login-page.module.css";

import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";
import Logo from "@/public/images/logo-white.svg";
import MainLogo from "@/assets/images/logo-english-new@2x.png";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function OtpPage() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userParam = searchParams.get("user");
  const isRtl = locale === "fa";

  const [user, setUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(
    parseInt(process.env.NEXT_PUBLIC_OTP_TIMER_MINUTES || "2") * 60
  );

  useEffect(() => {
    if (userParam) {
      setUser(decodeURIComponent(userParam));
    } else {
      router.push(`/${locale}/`);
    }
  }, [userParam, router, locale]);

  // Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format Timer: MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const methods = useForm<{ otp: string }>();

  const onSubmit = async (data: { otp: string }) => {
    try {
      setIsLoading(true);
      const tempToken = sessionStorage.getItem("temp_token");

      if (!tempToken) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("error-otp"),
          showConfirmButton: false,
        });
        router.push(`/${locale}/auth/login`);
        return;
      }

      const response = await fetch("/api/auth/otp-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale,
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify({ email_mobile: user, code: data.otp }),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
        });
        sessionStorage.removeItem("temp_token");
        localStorage.removeItem("userInfo");
        localStorage.setItem("userInfo", JSON.stringify(result.data.user));
        router.push(`/${locale}/dashboard`);
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: result.error,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: t("error-otp"),
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const tempToken = sessionStorage.getItem("temp_token");

      if (!tempToken) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("error-otp"),
          showConfirmButton: false,
        });
        router.push(`/${locale}/auth/login`);
        return;
      }

      setResendDisabled(true);
      setTimeLeft(parseInt(process.env.NEXT_PUBLIC_OTP_TIMER_MINUTES || "2") * 60);

      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale,
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify({ email_mobile: user }),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: t("otp-resend-success"),
          showConfirmButton: false,
          timer: 5000,
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: result.error,
          showConfirmButton: false,
          timer: 5000,
        });
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: t("otp-resend-error"),
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

  return (
    <div className={styles.loginPage}>
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
                onClick={() => router.push(`/${locale}/auth/login`)}
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
              <TbDeviceMobileMessage size={26} />
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
              validation={{ required: "کد تایید الزامی است", pattern: { value: /^\d{5}$/, message: "کد تایید نامعتبر است" } }}
              minLength={5}
              maxLength={5}
            />

            <div className="flex-center">
              <p hidden={timeLeft <= 0} className={styles.otpTimer}>{t("otp-expires-in")} {formatTime(timeLeft)}</p>

              <div hidden={resendDisabled} className={styles.resendOtpContainer}>
                <Button
                  type="button"
                  text={t("otp-resend-btn")}
                  color="secondary"
                  onClick={resendOtp}
                  disabled={resendDisabled}
                  className={styles.resendOtpButton}
                />
              </div>
            </div>
            <div className={styles.submitButtonContainer}>
              <Button
                type="button"
                text={t("otp-text-back-btn")}
                color="primary"
                outline
                className={styles.submitButton}
                icon={<IoArrowBack size={24} />}
                onClick={()=>router.back()}
              />
              <Button
                type="submit"
                text={t("otp-text-btn")}
                color="primary"
                className={styles.submitButton}
                loading={isLoading}
                disabled={isLoading || !methods.formState.isValid}
              />
            </div>

          </form>
        </FormProvider>
      </div>
    </div>
  );
}
