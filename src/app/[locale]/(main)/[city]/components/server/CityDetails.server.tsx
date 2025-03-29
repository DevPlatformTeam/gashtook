import CityDetailsClient from "../client/CityDetails.client";

import { FetchData } from "@/components/Fetch/FetchData";

interface CityDetailsServerProps {
  city: string;
  locale: string;
  citySlug: string
}

export default async function CityDetailsServer({ locale, citySlug, city }: CityDetailsServerProps) {
  const { data } = await FetchData(`cities/${citySlug}/details`);
  return <CityDetailsClient citySlug={citySlug} city={city} locale={locale} data={data} />;
}
