'use server';

import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';

type ApiResponse = {
    success: boolean;
    message: string;
    errors: string[];
    code: number;
    data: Places[];
}

type Places = {
    lat: string;
    long: string;
    image_url: string;
    slug: string;
    name: string;
    category_slug: string;
    sub_category_slug: string;
    is_liked: boolean; 
    favorites_count: string;
}

type ErrorResult = {
    isError: true;
    message: string;
    code: number;
}

type ActionResult = ApiResponse | ErrorResult;

export async function getPlaces({
    city,
    mainCategory = '',
    category = '',
    subCategory = '',
    isSubCategories = false
}: {
    city: string|string[];
    mainCategory?: string;
    category?: string;
    subCategory?: string;
    isSubCategories?: boolean;
}): Promise<ActionResult> {
    const locale = await getLocale();
    
    try {
        const token = cookies().get('token')?.value;

        if (!token) {
            return {
                isError: true,
                message: locale === 'fa' ? 'درخواست شما نیازمند احراز هویت است' : 'Unauthorized',
                code: 401
            };
        }

        const baseUrl = process.env.BASE_URL_API;

        if (!baseUrl) {
            return {
                isError: true,
                message: locale === 'fa' ? "خطای داخلی بروز کرده است." : "Internal error contact support",
                code: 500
            };
        }

        let url: string;

        if (subCategory) {
            url = `${baseUrl}/places/${city}/${category}/${subCategory}`;
        } else if (category || mainCategory) {
            const categoryParam = isSubCategories ? category : mainCategory;
            url = `${baseUrl}/places/${city}/${categoryParam}`;
        } else {
            url = `${baseUrl}/places/${city}`;
        }

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept-Language': locale,
                'Accept': 'application/json'
            },
            cache: 'no-store'
        });

        const data = await response.json();
        const errorMsg = locale === 'fa' ? 'خطا در دریافت اطلاعات' : `Error fetching data!`;
    
        if (!response.ok) {
            return {
                isError: true,
                message: data?.message || errorMsg,
                code: response.status
            };
        }

        return data;
    } catch (error) {
        console.error('Error fetching places:', error);
        
        return {
            isError: true,
            message: error instanceof Error ? error.message : String(error),
            code: 500
        };
    }
}