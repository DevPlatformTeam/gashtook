import React from 'react'
import { useTranslations } from "next-intl";
import { Link } from '@/i18n/routing';
import { useLocale } from "next-intl";
import Image from 'next/image';

import { TbLogin } from "react-icons/tb";

import styles from './login-page.module.css';
import TextInput from '@/components/TextInput/TextInput';

import Button from '@/components/Button/Button';

import Logo from "@/public/images/logo-white.svg";

export default function LoginPage() {
	const t = useTranslations("Auth");
	const locale = useLocale();
	const isRtl = locale === "fa";

	return (
		<div className="lg:w-2/3 lg:h-4/5 md:w-full h-full w-full flex justify-center rounded-md">
			<div className={`${styles.bgImage} ${isRtl ? 'rounded-r-md' : 'rounded-l-md'}`}>
				<div className={`absolute bg-[#21a788c4] top-0 left-0 size-full ${isRtl ? 'rounded-r-md' : 'rounded-l-md'}`}>
				</div>
				<div className="relative z-50 size-full">
					<div className={`w-full h-1/2 flex pt-8 px-8 justify-${isRtl ? 'end' : 'start'} items-start`}>
						<Image className='inset-block-card-btn' src={Logo} alt='Gashtook' />
					</div>
					<div className="w-full h-1/2 text-third px-6">
						<h3 className='text-2xl font-bold mb-4'>{t('register-in-gashtook')}</h3>
						<p>{t(('notice-register'))}</p>
						<div className='flex justify-end mt-12'>
							<Button text={t('create-account')} color='third' textColor='primary' className='!px-8 !py-2 !font-[400]' />
						</div>
					</div>
				</div>
			</div>

			<div className={`lg:w-1/2 md:w-1/2 w-full bg-white flex flex-col justify-center px-12 ${isRtl ? 'rounded-l-md' : 'rounded-r-md'} `}>
				<div className="">
					<div className="flex items-center gap-x-1 mb-6 text-slate-700">
						<TbLogin size={26} />
						<h2 className='font-semibold text-md'>
							{t('login-to-account')}
						</h2>
					</div>
					<TextInput type={'text'} inputMode={'numeric'} label={t('mobile')} name='mobile' id='mobile' placeHolder='09XXXXXXXXXX' />
					<TextInput type={'password'} label={t('password')} name='mobile' id='mobile' placeHolder='**********' />
					<div className="flex justify-between items-center">
						<span>
							<Link href="/" className="text-secondary text-sm">
								{t('forgetpassword')}
							</Link>
							<span className='w-full h-[1.5px] mt-0.5 bg-secondary block'></span>
						</span>
						<span>
							{t('remember-me')}
						</span>
					</div>
					<div className='flex lg:justify-end md:justify-end justify-center mt-12'>
						<Button text={t('enter')} color='primary' className='!px-12 !py-2 !font-[400]' />
					</div>
					<div className="lg:hidden md:hidden flex flex-col justify-center text-center mt-12">
						<p className='text-sm mb-6'>{t('notice-register')}</p>
						<Link className='text-primary' href={'/'}>
							{t('signup')}
						</Link>
					</div>
				</div>
			</div>

		</div>
	)
}
