import CityDetailsClient from "../client/CityDetails.client";
import { redirect, notFound } from "next/navigation";
import { FetchData } from "@/components/Fetch/FetchData";

interface CityDetailsServerProps {
  city: string;
  locale: string;
  citySlug: string
}

export default async function CityDetailsServer({ locale, citySlug, city }: CityDetailsServerProps) {
  const { data, status } = await FetchData(`cities/${citySlug}/details`);  
  if (status === 401) {
    return redirect(`/auth/login`);
  } else if (status === 404) {
    return notFound();
  }
  return <CityDetailsClient citySlug={citySlug} city={city} locale={locale} data={data} />;
}
