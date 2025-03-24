"use client";

import React, { useState } from "react";
import styles from "../contact-us.module.css";
import { useTranslations } from "next-intl";
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";
import TextareaInputComponent from "@/components/text-area/TextareaInput.component";
import { FormProvider, useForm } from "react-hook-form";
import SelectOptionComponent from "@/components/select-option/SelectOption.component";
import Swal from 'sweetalert2';

export default function ContactForm() {
  const t = useTranslations();

  const methods = useForm();
  const { handleSubmit, formState: { isSubmitted, isLoading, isSubmitting } } = methods;

  const [typeMessage, setTypeMessage] = useState<{ id: string; value: string } | null>(null);
  

  const onSubmit = async (data: object) => {

    if (!typeMessage) {
      Swal.fire({
        icon: "error",
        title: t("ToastMessages.titleError"),
        text: t("contact-us.typeMessageInputPlaceholder"), 
      });
      return;
    }
  
    const payload = {
      ...data,
      subject: typeMessage.value,
    };
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: t("contact-us.successSend"),
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      } else if (response.status === 400 || response.status === 422) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("contact-us.faildSend"),
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("contact-us.faildSend"),
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: t("contact-us.faildSend"),
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
      console.error("Fetch Error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formInputs}>
        <div>
          <TextInput
            type={"tel"}
            inputMode={"numeric"}
            label={t("contact-us.mobileInputLabel")}
            name="mobile"
            id="mobile"
            placeHolder="09XXXXXXXXXX"
            maxLength={11}
            validation={{required: "شماره تلفن الزامی است", pattern: { value: /09\d{9}$/, message: "شماره تلفن نامعتبر است" }}}
          />
          <TextInput
            type={"text"}
            label={t("contact-us.nameInputLabel")}
            name="name"
            id="name"
            placeHolder={t("contact-us.nameInputPlaceholder")}
            validation={{required: "نام الزامی است"}}
          />
          <TextInput
            type={"text"}
            label={t("contact-us.emailInputLabel")}
            name="email"
            id="email"
            placeHolder="email@gmail.com"
            validation={{required: "ایمیل الزامی است", pattern: { value: /\S+@\S+\.\S+/, message: "ایمیل نامعتبر است" }}}
          />
        </div>
        <div>
          <div>
            <SelectOptionComponent
              selectValue={typeMessage}
              setSelectValue={setTypeMessage}
              label={t("contact-us.typeMessageInputLabel")}
              placeholder={t("contact-us.typeMessageInputPlaceholder")}
              id="select-type-message"
              name="select-type-message"
              options={[
                { id: 1, value: "پیشنهاد" },
                { id: 2, value: "انتقاد" },
              ]}
            />
            {isSubmitted && !typeMessage && <p className="text-red-500 mt-2 text-sm">نوع پیام الزامی است</p>}
          </div>
          <TextareaInputComponent
            name="message"
            id="message"
            label={t("contact-us.messageInputLabel")}
            placeholder={t("contact-us.messageInputPlaceholder")}
            maxLength={1000}
            validation={{ required: "پیام الزامی است", minLength: { value: 6, message: "پیام باید حداقل 6 کاراکتر باشد" }}}
          />
         <Button
           type="submit"
           text={t("contact-us.sendButton")}
           textColor="third"
           color="primary"
           loading={isSubmitting} // نمایش لودر
           disabled={isSubmitting} // غیرفعال کردن دکمه هنگام ارسال فرم
         />

        </div>
      </form>
    </FormProvider>
  );
}
