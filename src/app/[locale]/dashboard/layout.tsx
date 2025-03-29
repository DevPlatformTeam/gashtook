"use client"

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { CiHeart, CiSettings } from 'react-icons/ci';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoIosNotificationsOutline, IoIosPerson } from 'react-icons/io';
import { PiBriefcaseLight } from 'react-icons/pi';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Props = {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}

interface userInfoI {
    mobile?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    image_url?: string | null;
    subscriptionStart?: string;
    subscriptionEnd?: string;
}

export default function DashboardLayout({ children, params }: Props) {

    const { locale } = params;
    const pathname = usePathname();
    const t = useTranslations('Dashboard');
    const lastSegment = pathname.split('/').pop();
    const [remainingDays, setRemainingDays] = useState<number>(0);
    const [progressPercentage, setProgressPercentage] = useState<number>(0);


    // const expireSubscription = Math.round(28 * 100 / 30);

    const navRef = useRef<HTMLDivElement>(null);

    const [userInfo, setUserInfo] = useState<userInfoI>({});

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
            setUserInfo(storedUserInfo);
        }

        if (navRef.current) {
            const activeEl = navRef.current.querySelector('[data-active="true"]');
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    }, [lastSegment]);

    useEffect(() => {
        if (userInfo.subscriptionStart && userInfo.subscriptionEnd) {
            const today = new Date();
            const startDate = new Date(userInfo.subscriptionStart);
            const endDate = new Date(userInfo.subscriptionEnd);
    
            const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const remaining = Math.floor((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
            setRemainingDays(Math.max(remaining, 0));
            setProgressPercentage(totalDays > 0 ? (remaining / totalDays) * 100 : 0);
        } else {
            setRemainingDays(0);
            setProgressPercentage(0);
        }
    }, [userInfo]);
    
    return (
        <div>
            <Header />
            <div className="flex flex-col gap-4 h-[50rem] lg:h-[47rem] lg:flex-row lg:p-4 bg-third child:bg-background child:border child:border-gray-200">
                <aside className="w-full h-fit grow-0 lg:w-4/12 xl:w-3/12 overflow-hidden lg:shadow-sm lg:rounded-2xl shrink-0">
                    {/* اطلاعات کاربر */}
                    <div className="flex flex-col p-4 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-start">
                            <span className={`size-14 rounded-full bg-primaryfade/10 text-primary ${userInfo.image_url ? "p-0" : "p-2"}`}>
                                {userInfo.image_url ?
                                    <Image className="rounded-full size-full object-cover" width={50} height={50} src={userInfo.image_url} alt="Profile Preview" unoptimized />
                                    :
                                    <IoIosPerson className='size-full' />
                                }
                            </span>
                            <div>
                                <p className="font-bold">{userInfo?.name ? userInfo.name : t("userName")}</p>
                                <p className="text-sm text-gray-500">{locale === "fa" ? userInfo?.mobile : userInfo?.email}</p>
                            </div>
                        </div>
                        <div className='pt-4'>
                            <div className='relative w-full h-[3px] rounded-full bg-gray-200 my-2'>
                                <span className="absolute h-full left-0 rounded-full bg-primary" style={{ width: `${progressPercentage}%` }}></span>
                            </div>
                            <div className='flex items-center justify-between text-gray-500 text-sm'>
                                <span>{t("expireSubscription")}</span>
                                <Link href={"/"} className='flex items-center gap-1'>
                                    {locale === 'fa' ?
                                        <>
                                            <span className='text-primary'>{remainingDays} روز</span>
                                            <FaChevronLeft />
                                        </>
                                        :
                                        <>

                                            <FaChevronRight />
                                            <span className='text-primary'>{remainingDays} days</span>
                                        </>
                                    }
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* منو/ناوبری */}
                    <nav ref={navRef} className="flex items-center justify-around p-2 gap-2 lg:flex-col text-right overflow-x-auto child:flex child:items-center child:gap-2 child:px-6 child:py-2 child:lg:p-4 child-hover:text-primary child:min-w-fit child:w-full child:rounded-lg child-hover:bg-gray-100 child:text-center child:lg:text-start child:transition child:duration-200 scroll">
                        <Link data-active={lastSegment === "notifications" ? "true" : undefined} href={`/${locale}/dashboard/notifications`} className={`${lastSegment === "notifications" && "bg-primaryfade/10 hover:!bg-primaryfade/20 text-primary"}`}>
                            <IoIosNotificationsOutline className='size-7 text-primary' />
                            <span className="font-medium rounded">{t('notifications')}</span>
                        </Link>
                        <Link data-active={lastSegment === "favorites" ? "true" : undefined} href={`/${locale}/dashboard/favorites`} className={`${lastSegment === "favorites" && "bg-primaryfade/10 hover:!bg-primaryfade/20 text-primary"}`}>
                            <CiHeart className='size-7 text-primary' />
                            <span className="font-medium rounded">{t('favorites')}</span>
                        </Link>
                        <Link data-active={lastSegment === "subscription-management" ? "true" : undefined} href={`/${locale}/dashboard/subscription-management`} className={`${lastSegment === "subscription-management" && "bg-primaryfade/10 hover:!bg-primaryfade/20 text-primary"}`}>
                            <PiBriefcaseLight className='size-7 text-primary' />
                            <span className="font-medium rounded">{t('subscriptionManagement')}</span>
                        </Link>
                        <Link data-active={lastSegment === "settings" ? "true" : undefined} href={`/${locale}/dashboard/settings`} className={`${lastSegment === "settings" && "bg-primaryfade/10 hover:!bg-primaryfade/20 text-primary"}`}>
                            <CiSettings className='size-7 text-primary' />
                            <span className="font-medium rounded">{t('settings')}</span>
                        </Link>
                    </nav>
                </aside>

                {/* محتوای اصلی داشبورد */}
                <main className="w-full max-h-full p-6 pb-0 px-2 mb-4 lg:mb-0 grow shadow-sm rounded-2xl overflow-hidden">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
