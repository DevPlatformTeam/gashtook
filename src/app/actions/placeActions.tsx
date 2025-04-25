// In placeActions.tsx
'use server';

import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';

// Define response types
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

// Create a serializable error response
type ErrorResult = {
    isError: true;
    message: string;
    code: number;
}

// Combined return type
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
    // Get the locale from the request headers
    const locale = await getLocale();
    
    try {
        // Get the token from cookies
        const token = cookies().get('token')?.value;

        if (!token) {
            return {
                isError: true,
                message: locale === 'fa' ? 'درخواست شما نیازمند احراز هویت است' : 'Unauthorized',
                code: 401
            };
        }

        // Base URL from server environment variable
        const baseUrl = process.env.BASE_URL_API;

        if (!baseUrl) {
            return {
                isError: true,
                message: locale === 'fa' ? 'آدرس API یافت نشد' : 'API base URL not found',
                code: 500
            };
        }

        let url: string;

        // Determine which API endpoint to use
        if (subCategory) {
            url = `${baseUrl}/places/${city}/${category}/${subCategory}`;
        } else if (category || mainCategory) {
            const categoryParam = isSubCategories ? category : mainCategory;
            url = `${baseUrl}/places/${city}/${categoryParam}`;
        } else {
            url = `${baseUrl}/places/${city}`;
        }

        // Fetch data from the API
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept-Language': locale,
                'Accept': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return {
                isError: true,
                message: locale === 'fa' ? 'خطا در دریافت اطلاعات' : `Error fetching data (${response.status})`,
                code: response.status
            };
        }

        const data = await response.json();
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