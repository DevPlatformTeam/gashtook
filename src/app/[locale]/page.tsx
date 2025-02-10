import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FaCoffee } from "react-icons/fa";
import Button from "@/components/Button/Button";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>

      <div className="flex flex-col gap-4 p-10">
        <Button text="دکمه اصلی" color="primary" />
        <Button text="با آیکون" color="secondary" icon={<FaCoffee />} />
        <Button text="Outline" color="primary" outline />
        <Button text="Outline + آیکون" color="secondary" outline icon={<FaCoffee />} />
        <Button text="متن سفارشی" color="primary" textColor="foreground" />
        <Button text="دکمه بزرگ" color="secondary" className="text-lg px-6 py-3" />
      </div>
    </div>
  );
}
