"use client";

import React, { useState } from "react";
import styles from "../contact-us.module.css";
import { useTranslations } from "next-intl";
import TextInput from "@/components/TextInput/TextInput";
import SelectOptionComponent from "@/components/select-option/SelectOption.component";
import Button from "@/components/Button/Button";
import TextareaInputComponent from "@/components/text-area/TextareaInput.component";
import { FormProvider, useForm } from "react-hook-form";

export default function ContactForm() {
  const t = useTranslations();
  const methods = useForm();

  const { handleSubmit, register, formState: { errors } } = methods;
  const [selectedCity, setSelectedCity] = useState<{ id: string; value: string } | null>(null);

  
  interface ContactFormData { // 👈 انتقال به بیرون از تابع
    name: string;
    email: string;
    mobile: string;
    message: string;
    subject: string;
  }
  
  const onSubmit = async (data: object) => {
    console.log("sub");
    console.log(errors);
    console.log(data);

    
    
    const payload = {
      ...data,
      subject: selectedCity?.value || "",
    };

    try {
      const response = await fetch(`${process.env.BASE_URL_API}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Server Response:", result);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formInputs}>
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
            selectValue={selectedCity}
            setSelectValue={setSelectedCity}
            {...register("subject", { required: true })}
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
            {...register("message", { required: true })}
            label={t("contact-us.messageInputLabel")}
            placeholder={t("contact-us.messageInputPlaceholder")}
            minLength={6}
            maxLength={1000}
          />
          <Button
            text={t("contact-us.sendButton")}
            textColor="third"
            color="primary"
            type="submit"
            onClick={() => console.log("Button clicked")} 
          />

        </div>
      </form>
    </FormProvider>
    </div>
  );
}
