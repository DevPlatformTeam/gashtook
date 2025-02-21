import { useTranslations } from "next-intl";
import { Link, routing } from "@/i18n/routing";
import { FaCoffee } from "react-icons/fa";
import Button from "@/components/Button/Button";
import CheckBox from "@/components/CheckBox/CheckBox";

import { notFound } from "next/navigation";
// import SelectOptionComponent from "@/components/Select-option/SelectOption.component";
// import SearchInputComponents from "@/components/Search-comments/SearchInput.components";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("HomePage");

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return notFound();
  }

  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>

      <div className="flex flex-col gap-4 p-10">
        <Button text="دکمه اصلی" color="primary" />
        <Button text="با آیکون" color="secondary" icon={<FaCoffee />} />
        <Button text="Outline" color="primary" outline />
        <Button
          text="Outline + آیکون"
          color="secondary"
          outline
          icon={<FaCoffee />}
        />
        <Button text="متن سفارشی" color="primary" textColor="foreground" />
        <Button
          text="دکمه بزرگ"
          color="secondary"
          className="text-lg px-6 py-3"
        />
        <CheckBox label="شرایط را قبول دارم" isChecked={true} />

        {/* <SelectOptionComponent
          options={[
            { id: 1, value: "option 1" },
            { id: 2, value: "option 2" },
            { id: 3, value: "option 3" },
          ]}
          name="select-option"
          id="select-option"
        />
        <SearchInputComponents id="search" placeholder="سرچ کنید...." /> */}
      </div>
    </div>
  );
}
