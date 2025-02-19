import styles from './collection.module.css';

export default function CollectionPage({ params }: { params?: { [key: string]: any } }) {

  let collection = params?.collection_slug;
  collection = decodeURIComponent(collection).replace(/-/g, ' ');

  return (
    <div className={styles.collectionPageContainer}>
      <div className="">
        <h1> {collection} </h1>
        <p>
        اگر اکتشاف در تاریخ و دانستن حقایق تاریخی برایتان جذاب است، حتما از دیدن موزه ها لذت می برید. تهران با داشتن ۳۳ موزه در سطح شهر، همه روزه علاقه مندان را به سمت خود می کشاند. در این قسمت شما را با مجموعه ای از موزه ها آشنا می کنیم که طرفداران زیادی دارند و گردشگران داخلی و خارجی از رفتن به آنجا استقبال می کنند
        </p>
      </div>
      <div className=""></div>
    </div>
  )
}