import React from "react";

import LayoutOtherPagesComponent from "@/components/layout-other-pages/LayoutOtherPages.component";

import rulesImage from "@/assets/images/rules/amy-hirschi-uwpo-02-k-55-zw-unsplash@3x.jpg";

import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("rules");

  return (
    <>
      <LayoutOtherPagesComponent image={rulesImage} title={t("title")}>
        <p>{t("rulesDescription")}</p>
      </LayoutOtherPagesComponent>
    </>
  );
}
