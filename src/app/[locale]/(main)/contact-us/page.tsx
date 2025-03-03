"use client";

import React, { useState } from "react";

import styles from "./contact-us.module.css";

import LayoutOtherPagesComponent from "@/components/layout-other-pages/LayoutOtherPages.component";

import contactUsImage from "@/assets/images/contact-us/image-7@3x.jpg";

import { useTranslations } from "next-intl";
import { AiOutlinePhone } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import TextInput from "@/components/TextInput/TextInput";
import SelectOptionComponent from "@/components/select-option/SelectOption.component";
import Button from "@/components/Button/Button";
import TextareaInputComponent from "@/components/text-area/TextareaInput.component";
import { FormProvider, useForm } from "react-hook-form";

export default function Page() {
  const t = useTranslations();
  const form = useForm();
  const [selectedCity, setSelectedCity] = useState<{ id: string; value: string } | null>(null);

  const handleSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <div className={styles["contact-us"]}>
      <LayoutOtherPagesComponent
        image={contactUsImage}
        title={t("contact-us.title")}
      >
        <div className={styles.contactUsDescription}>
          <ul>
            <li className={styles["title-desc"]}>
              <span className={styles.title}>
                <AiOutlinePhone size={24} className="me-1 text-primary" />
                {t("contact-us.tellphoneTitle")}
              </span>
              <span className={styles.desc}>02177415954</span>
            </li>
            <li className={styles["title-desc"]}>
              <span className={styles.title}>
                <HiOutlineMail size={24} className="me-1 text-primary" />
                {t("contact-us.emailTitle")}
              </span>
              <span className={styles.desc}>contactus.gashtook@gmail.com</span>
            </li>
            <li className={styles["title-desc"]}>
              <span className={styles.title}>
                <MdOutlineLocationOn size={24} className="me-1 text-primary" />
                {t("contact-us.addressTitle")}
              </span>
              <span className={styles.desc}>
                {t("contact-us.exactAddress")}
              </span>
            </li>
          </ul>
          <div className={styles.form}>
            <div className={styles["title-desc"]}>
              <h3 className={styles.title}>{t("contact-us.titleForm")}</h3>
              <span className={styles.desc}>
                {t("contact-us.descriptionFrom")}
              </span>
            </div>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className={styles.formInputs}>
                <div>
                  <TextInput
                  type={"text"}
                  inputMode={"numeric"}
                  label={t("contact-us.mobileInputLabel")}
                  name="mobile"
                  id="mobile"
                  placeHolder="09XXXXXXXXXX"
                />
                <TextInput
                  type={"text"}
                  inputMode={"numeric"}
                  label={t("contact-us.nameInputLabel")}
                  name="name"
                  id="name"
                  placeHolder={t("contact-us.nameInputPlaceholder")}
                />
                <TextInput
                  type={"text"}
                  inputMode={"numeric"}
                  label={t("contact-us.emailInputLabel")}
                  name="email"
                  id="email"
                  placeHolder="email@gmail.com"
                />
              </div>
              <div>
                <SelectOptionComponent
                  selectValue={selectedCity || { id: "", value: "" }}
                  setSelectValue={setSelectedCity}
                  label={t("contact-us.typeMessageInputLabel")}
                  placeholder={t("contact-us.typeMessageInputPlaceholder")}
                  id="select-type-message"
                  name="select-type-message"
                  options={[
                    { id: 1, value: "پیشنهاد" },
                    { id: 2, value: "انتقاد" },
                  ]}
                />
                <TextareaInputComponent
                  id="message"
                  name="message"
                  label={t("contact-us.messageInputLabel")}
                  placeholder={t("contact-us.messageInputPlaceholder")}
                  minLength={6}
                  maxLength={1000}
                />
                <Button
                  text={t("contact-us.sendButton")}
                  textColor="third"
                  color="primary"
                />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </LayoutOtherPagesComponent>
    </div>
  );
}
