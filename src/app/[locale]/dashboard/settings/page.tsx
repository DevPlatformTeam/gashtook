"use client";

import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import SelectOptionComponent from "@/components/select-option/SelectOption.component";
import TextInput from "@/components/TextInput/TextInput";
import { IoIosPerson } from "react-icons/io";
import Button from "@/components/Button/Button";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface userInfoI {
  mobile?: string;
  email?: string | null;
  name: string;
  image?: FileList | null;
}

export default function Page() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();

  const methods = useForm<userInfoI>({
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      image: null,
    },
  });
  const [selectedCity, setSelectedCity] = useState<{ id: string; value: string } | null>(null);
  const [userInfo, setUserInfo] = useState<userInfoI | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const cities = t.raw("city");

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
    if (storedUserInfo && Object.keys(storedUserInfo).length > 0) {
      setUserInfo(storedUserInfo);
      methods.reset({
        name: storedUserInfo.name || "",
        mobile: storedUserInfo.mobile || "",
        email: storedUserInfo.email || "",
        image: storedUserInfo.image_url || "",
      });
    }
  }, [methods]);


  const imageFiles = methods.watch("image");
  useEffect(() => {
    if (typeof imageFiles !== "string") {
      if (imageFiles && imageFiles.length > 0) {
        const file = imageFiles[0];
        const objectUrl = URL.createObjectURL(file);
        setImagePreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      } else {
        setImagePreview(null);
      }
    } else {
      setImagePreview(imageFiles)
    }
  }, [imageFiles]);

  const onSubmit = async (data: userInfoI) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email || "");
      formData.append("mobile", data.mobile || userInfo?.mobile || "");

      if (data.image instanceof FileList && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const response = await fetch("/api/dashboard/settings", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: result.message || "اطلاعات با موفقیت ثبت شد",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
        localStorage.setItem("userInfo", JSON.stringify(result.data));
        router.push(`/${locale}/dashboard`);
      } else {
        let errorMessage = result.message || "خطایی رخ داده است"; // Start with the general message

        if (result.errors) {
            let detailedErrors = "";
            for (const field in result.errors) {
                if (result.errors.hasOwnProperty(field)) {
                    const fieldErrors = result.errors[field];
                    detailedErrors += `${field}: ${fieldErrors.join(", ")}\n`; // Format each field's errors
                }
            }
            if (detailedErrors) {
                errorMessage = detailedErrors; // Replace the general message with detailed errors
            }
        }
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error in form submission:", error);
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

  const handleSelectImage = () => {
    const inputFile = document.getElementById("image") as HTMLInputElement;
    inputFile?.click();
  };

  return (
    <div className="h-full text-start">
      <h1 className="hidden lg:block text-xl font-bold mx-6 pb-4 border-b-2 border-gray-200">
        {t("Dashboard.settings")}
      </h1>
      <div className={`${styles.containerForms} scroll`}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
            <div className="flex-center flex-col gap-4">
              <span className={`size-48 rounded-full bg-primaryfade/10 text-primary ${imagePreview ? "p-0" : "p-4"}`}>
                {imagePreview ? (
                  <Image className="rounded-full size-full object-cover" width={80} height={80} src={imagePreview} alt="Profile Preview" unoptimized />
                ) : (
                  <IoIosPerson className="size-full" />
                )}
              </span>
              {/* <Button
                type="button"
                className="child:!text-red-400"
                text={locale === "fa" ? "حذف تصویر" : "Delete Profile"}
                color="third"
                outline
                textColor="secondary"
              /> */}
              <input
                className="hidden"
                type="file"
                id="image"
                {...methods.register("image")}
              />
              <Button onClick={handleSelectImage} type="button" text={locale === "fa" ? "ویرایش پروفایل" : "Edit Profile"} color="primary" outline textColor="background" />
            </div>
            <div className="w-full md:w-2/3 xl:w-1/2 flex flex-col items-center mt-8">
              <TextInput
                label={locale === "fa" ? "نام و نام خانوادگی" : "Name and Family"}
                name="name"
                id="name"
                placeHolder={locale === "fa" ? "نام و نام خانوادگی خود را وارد کنید" : "Enter your name and family"}
                type="text"
                validation={{
                  required: t("FormValidationMessages.requiredError", {
                    value: locale === "fa" ? "نام و نام خانوادگی" : "First name and last name",
                  }),
                }}
              />
              <TextInput
                label={locale === "fa" ? "شماره تلفن" : "Email"}
                name={locale === "fa" ? "mobile" : "email"}
                id={locale === "fa" ? "mobile" : "email"}
                placeHolder={locale === "fa" ? "شماره تلفن خود را وارد کنید" : "Enter your mobile number"}
                type={locale === "fa" ? "tel" : "email"}
              />
              <SelectOptionComponent
                selectValue={selectedCity}
                setSelectValue={setSelectedCity}
                className="w-full last:!text-sm"
                label={locale === "fa" ? "شهر" : "City"}
                name="city"
                id="city"
                placeholder={locale === "fa" ? "شهر" : "City"}
                options={cities}
              />
            </div>
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading || !methods.formState.isDirty}
              className="w-full md:w-1/4 xl:w-1/6 mt-8 text-lg"
              text={locale === "fa" ? "ذخیره اطلاعات" : "Save"}
              color="primary"
              textColor="background"
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}