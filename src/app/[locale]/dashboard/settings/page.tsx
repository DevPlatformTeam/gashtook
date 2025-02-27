"use client"

import React from 'react';

import styles from './settings.module.css';

import { FormProvider, useForm } from 'react-hook-form';

import { useLocale, useTranslations } from 'next-intl';

import SelectOptionComponent from '@/components/select-option/SelectOption.component';
import TextInput from '@/components/TextInput/TextInput';
import { IoIosPerson } from 'react-icons/io';
import Button from '@/components/Button/Button';

export default function Page() {

  const locale = useLocale();
  const methods = useForm();

  const t = useTranslations();
  const cities = t.raw("city");


  return (
    <div className="h-full text-right">
      <h1 className="text-xl font-bold mx-6 pb-4 border-b border-gray-200">تنظیمات کاربری</h1>
      <div className={styles.containerForms}>
        <FormProvider {...methods}>
          <form className={styles.form}>
            <div className='flex-center flex-col gap-4'>
              <span className='size-20 rounded-full bg-primaryfade/10 text-primary p-4'>
                <IoIosPerson className='size-full' />
              </span>
              <Button className='child:!text-red-400' text={locale === 'fa' ? 'حذف تصویر' : 'Delete Profole'} color='third' outline textColor='secondary' />
              <Button text={locale === 'fa' ? 'ویرایش پروفایل' : 'Edit Profile'} color='primary' outline textColor='background' />
            </div>
            <div className='w-full md:w-2/3 xl:w-1/2 flex flex-col items-center mt-8'>
              <TextInput
                label={locale === 'fa' ? 'نام و نام خانوادگی' : 'Name and Family'}
                name='name'
                id='name'
                placeHolder={locale === 'fa' ? 'نام و نام خانوادگی خود را وارد کنید' : 'Enter your name and family'}
                type={'text'}
              />
              <TextInput
                label={locale === 'fa' ? 'شماره تلفن' : 'Email'}
                name={locale === 'fa' ? 'phone' : 'email'}
                id={locale === 'fa' ? 'phone' : 'email'}
                placeHolder={locale === 'fa' ? 'شماره تلفن خود را وارد کنید' : 'Enter your phone number'}
                type={locale === 'fa' ? 'tel' : 'email'}
              />
              <SelectOptionComponent
                className='w-full'
                label={locale === 'fa' ? 'شهر' : 'City'}
                name='city'
                id='city'
                placeholder={locale === 'fa' ? 'شهر' : 'City'}
                options={cities}
              />
            </div>
            <Button className='w-full md:w-1/4 xl:w-1/6 mt-8 text-lg' text={locale === 'fa' ? 'ذخیره اطلاعات' : 'Save'} color='primary' textColor='background' />
          </form>
        </FormProvider>
        <FormProvider {...methods}>
          <form className={styles.form}>
            <div className='w-full md:w-2/3 xl:w-1/2 flex flex-col items-center md:child:w-1/2 md:flex-row md:gap-10'>
              <TextInput
                label={locale === 'fa' ? 'رمز عبور' : 'password'}
                name='password'
                id='password'
                placeHolder={locale === 'fa' ? 'رمز عبور خود را وارد کنید' : 'Enter your password'}
                type={'password'}
              />
              <TextInput
                label={locale === 'fa' ? 'تکرار رمز عبور' : 'Confirm Password'}
                name={locale === 'fa' ? 'confirmPassword' : 'confirmPassword'}
                id={locale === 'fa' ? 'confirmPassword' : 'confirmPassword'}
                placeHolder={locale === 'fa' ? 'تکرار رمز عبور خود را وارد کنید' : 'Enter your password again'}
                type={'password'}
              />
            </div>
            <Button className='w-full md:w-1/4 xl:w-1/6 mt-8 md:mt-4 text-lg' text={locale === 'fa' ? 'ذخیره اطلاعات' : 'Save'} color='primary' textColor='background' />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
