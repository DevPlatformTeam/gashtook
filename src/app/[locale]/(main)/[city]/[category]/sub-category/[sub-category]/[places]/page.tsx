import { useTranslations } from "next-intl";

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Button from '@/components/Button/Button';

import { IoHeart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

import styles from './places.module.css';
import Image from 'next/image';

export default function PlacesPage({ params }: { params?: { [key: string]: any } }) {
	const t = useTranslations("Places");

	return (
		<div className="container my-12">
			<div className="flex-between">
				<Breadcrumb />
				<Button outline={true} color="secondary" text={t('favourite')} icon={<IoMdHeartEmpty />} />
			</div>
			<div className={styles.placesContainer}>
				<div className={styles.col1}>
					<h1> ایران مال تهران </h1>
					<div className={styles.Image}>
						<Image className='object-fit' width={730} height={450} src="https://picsum.photos/id/142/730/450" alt='' />
					</div>
					<p>
					باغ نگارستان، از باغ های زیباییست که از قاجار به جا مانده باغ نگارستان، باغ زیبایی بوده است با قصری باشکوه، که در آن عکس های بسیاری از فتحعلی شاه و درباریان قرار داشته؛ به همین دلیل هم نام آن را نگارستان گذاشتند، هرچند امروزه دیگر اثری از آن قصر زیبای درون باغ، نیست.
					میگویند قتلگاه قائم مقام فراهانی هم ،همین باغ بوده است. هرچه که هست، باغ بسیار زیباییست که در دل تهران جای گرفته. در این باغ، موزه مکتب کمال الملک هم قرار دارد. همینطور کافه های زیبا و محیط دلنشینی که بازدید این باغ را دلپذیر تر کرده اند
					</p>
				</div>
				<div className={styles.col2}>
					<h4> {t('onMap')} </h4>
					<iframe 
						loading="lazy" 
						src="https://balad.ir/embed?p=1V27gb9hxuSRwq" 
						title="مشاهده «شرکت ملک آنلاین» روی نقشه بلد" 
						width="100%" 
						height="450" 
						allowFullScreen
						aria-hidden="false"
						tabIndex={0}
					/>
					<div className={styles.contactInformation}>
						<h5> {t('contactInfo')} </h5>
					</div>

				</div>
			</div>
		</div>
	)
}