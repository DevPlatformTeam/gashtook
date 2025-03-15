import { getTranslations } from "next-intl/server";
import CityDetailsServer from "../components/server/CityDetails.server";


export default async function CityDetails({
  params,
}: {
  params: { city: string; locale: string };
}) {

  const { locale, city } = params;
  const t = await getTranslations();
  const cityFa = t.raw(`city`).filter((item: { id: string, value: string }) => item.id === city)[0]?.value;

  return (
    <CityDetailsServer locale={locale} citySlug={city} city={locale == 'fa' ? cityFa : city} />
  );
};
