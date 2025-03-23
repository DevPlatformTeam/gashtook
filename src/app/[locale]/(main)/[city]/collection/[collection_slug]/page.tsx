import styles from './collection.module.css';
import Collection from './components/Collection';
import { FetchData } from "@/components/Fetch/FetchData";
import { getTranslations } from "next-intl/server";
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

export default async function CollectionPage({ params }: { params: { city: string; collection_slug: string } }) {
  const { city, collection_slug } = params;
  // const collectionName = decodeURIComponent(collection_slug ?? '').replace(/-/g, ' ');
  const t = await getTranslations();

  const { data, error } = await FetchData(`cities/${city}/collections/${collection_slug}`);

  if (error || !data?.collection) {
    return <div className="text-center text-red-500 p-4">❌ خطا در دریافت اطلاعات</div>;
  }

    const locations = data.places.map((place: Place & {lat: string; long: string; category_slug: string; sub_category_slug: string}) => ({
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
                imageSrc={place.image_url || "https://via.placeholder.com/300x150"}
                title={place.name}
                description={place.seo?.description || "بدون توضیحات"}
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
