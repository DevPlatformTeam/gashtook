import styles from './collection.module.css';
import Collection from './components/Collection';
import { FetchData } from "@/components/Fetch/FetchData";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import Map from '@/components/Map/Map';

type Place = {
  image_url: string;
  name: string;
  is_liked: boolean;
  slug: string;
  seo: {
    description: string;
  }
}

function Skeleton() {
  return (
    <div className={styles.collectionPageContainer}>
      <div className="w-full flex flex-col lg:flex-row py-8 animate-pulse">
        <div className="lg:w-2/3 lg:px-6 px-2 md:px-4">
          <div className="h-8 w-2/5 bg-gray-300 rounded-md mb-4"></div>
          <div className="space-y-3 mb-6 mt-3">
            <div className="h-4 w-full bg-gray-300 rounded-md"></div>
            <div className="h-4 w-full bg-gray-300 rounded-md"></div>
            <div className="h-4 w-full bg-gray-300 rounded-md"></div>
            <div className="h-4 w-full bg-gray-300 rounded-md"></div>
            <div className="h-4 w-3/5 bg-gray-300 rounded-md"></div>
          </div>

          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex border border-gray-200 rounded-md p-4 space-x-4">
                <div className="w-36 h-24 bg-gray-300 rounded-md"></div>

                <div className="flex-1 space-y-2  mt-1">
                  <div className="h-5 w-3/5 bg-gray-300 rounded-md mr-6"></div>

                  <div className="flex items-center space-x-2 mt-14 mr-6">
                    <div className="h-8 w-36 bg-gray-300 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* بخش نقشه */}
        <div className="w-full lg:w-1/3 h-[300px] lg:h-[550px] bg-gray-300 rounded-md mt-6 lg:mt-0"></div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { [key: string]: string } }) {
  const { locale, city, collection_slug } = params;
  const { data } = await FetchData(`cities/${city}/collections/${collection_slug}`);
  const seo = data?.collection;
  const appName = locale === 'fa' ? 'گشتوک' : 'Gashtook';
  const cityName = seo?.city || city;

  return {
    title: `${cityName} - ${seo?.name} | ${appName}`,
    description: seo?.description,
  };
}

export default async function CollectionPage({ params }: { params: { city: string; collection_slug: string, locale:string } }) {
  const { city, collection_slug, locale } = params;
  const t = await getTranslations();

  const { data, error, status } = await FetchData(`cities/${city}/collections/${collection_slug}`);

  if (status === 402) {
    redirect(`/${locale}/buy-subscription`);
  } else if (status === 401) {
    redirect(`/${locale}/auth/login`);
  }

  if (error || !data?.collection) {
    return <Skeleton />;
  }

  const locations = data.places.map((place: Place & { lat: string; long: string; category_slug: string; sub_category_slug: string }) => ({
    lat: parseFloat(place.lat),
    lng: parseFloat(place.long),
    title: place.name,
    imageSrc: place.image_url,
    category: place.category_slug,
    subCategory: place.sub_category_slug,
    slug: place.slug,
  }));

  return (
    <div className={styles.collectionPageContainer}>
      <div className="w-full flex flex-col lg:flex-row py-8">
        <div className="lg:w-2/3 lg:px-6 px-2 md:px-4">
          <h1 className="text-secondary text-2xl font-bold">{data.collection.name}</h1>
          <p className="mt-2 text-gray-600 text-justify leading-8">{data.collection.description}</p>

          <div className="space-y-4 mt-6">
            {data.places.map((place: Place, index: number) => (
              <Collection
                key={index}
                imageSrc={place.image_url}
                title={place.name}
                description={place.seo?.description || t('Collections.nodesc')}
                isLiked={place.is_liked}
                category={t('Collections.place')}
                place={place.slug}
              />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3 h-[300px] lg:h-[550px] mt-6 lg:mt-0">
          <Map locations={locations} />
        </div>
      </div>
    </div>
  );
}
