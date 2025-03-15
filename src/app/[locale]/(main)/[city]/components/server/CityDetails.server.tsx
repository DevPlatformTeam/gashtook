import CityDetailsClient from "../client/CityDetails.client";

import { FetchData } from "@/components/Fetch/FetchData";

interface CityDetailsServerProps {
  city: string;
  locale: string;
  citySlug: string
}

export default async function CityDetailsServer({ city, locale, citySlug }: CityDetailsServerProps) {
  const { data } = await FetchData(`cities/${citySlug}/details`);
  return <CityDetailsClient city={city} locale={locale} data={data} />;
}
