import styles from './collection.module.css';
import map from "@/assets/images/map-category/image-1@3x.jpg";
import Collection from './components/Collection';

export default function CollectionPage({ params }: { params?: { [key: string]: any } }) {
  let collection = params?.collection_slug;
  collection = decodeURIComponent(collection).replace(/-/g, ' ');

  const collections = [
    {
      imageSrc: "https://picsum.photos/id/222/300/150",
      title: "موزه ایران باستان",
      description: "قدیمی‌ترین موزه در ایران با آثار تاریخی از دوران باستان.",
      isLiked: false,
      category: "موزه",
    },
    {
      imageSrc: "https://picsum.photos/id/223/300/150",
      title: "موزه هنرهای معاصر",
      description: "مجموعه‌ای از آثار هنری مدرن و معاصر ایران و جهان.",
      isLiked: true,
      category: "موزه",
    },
    {
      imageSrc: "https://picsum.photos/id/366/300/150",
      title: "کاخ گلستان",
      description: "یکی از قدیمی‌ترین بناهای تاریخی تهران و ثبت جهانی یونسکو.",
      isLiked: false,
      category: "موزه",
    },
    {
      imageSrc: "https://picsum.photos/id/225/300/150",
      title: "موزه آبگینه و سفالینه",
      description: "نمایشگاهی از شیشه‌ها و سفال‌های تاریخی ایران.",
      isLiked: false,
      category: "موزه",
    },
    {
      imageSrc: "https://picsum.photos/id/355/300/150",
      title: "موزه فرش ایران",
      description: "مجموعه‌ای از فرش‌های تاریخی و با ارزش ایرانی.",
      isLiked: true,
      category: "موزه",
    },
  ];

  return (
    <div className={styles.collectionPageContainer}>
      <div className="w-full flex flex-col lg:flex-row">
        {/* متن توضیحات */}
        <div className="lg:w-2/3 lg:p-6 p-2 md:p-4">
          <h1 className="text-secondary text-2xl font-bold ">منتخب موزه های تهران</h1>
          <p className="mt-2 text-gray-600 ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus quaerat et fugiat. Totam perspiciatis odit consectetur at quam, culpa enim aliquid ducimus non deserunt est, dolores a, alias suscipit fugit.
          </p>

          <div className="space-y-4 mt-6">
            {collections.map((item, index) => (
              <Collection
                key={index}
                imageSrc={item.imageSrc}
                title={item.title}
                description={item.description}
                isLiked={item.isLiked}
                category={item.category}
              />
            ))}
          </div>
        </div>

        <div
          className="w-full lg:w-1/3 h-[300px] lg:h-[550px] bg-cover bg-center mt-6 lg:mt-0"
          style={{ backgroundImage: `url(${map.src})` }}
        />
      </div>
    </div>
  );
}
