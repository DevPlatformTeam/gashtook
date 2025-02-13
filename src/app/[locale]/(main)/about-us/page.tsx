import React from "react";

import LayoutOtherPagesComponent from "@/components/layout-other-pages/LayoutOtherPages.component";

import aboutUsImage from "@/assets/images/about-us/austin-distel-w-d-1-l-rb-9-oe-eo-unsplash@3x.jpg";

import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("about-us");

  return (
    <>
      <LayoutOtherPagesComponent image={aboutUsImage} title={t("title")}>
        <p>{t("aboutUsDescription")}</p>
      </LayoutOtherPagesComponent>
    </>
  );
}
