import React from "react";

import LayoutOtherPagesComponent from "@/components/layout-other-pages/LayoutOtherPages.component";

import complaintImage from "@/assets/images/submit-complaint-page/nik-macmillan-y-xemf-qi-pr-e-unsplash@3x.png";

import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("SubmitComplaintPage");

  return (
    <>
      <LayoutOtherPagesComponent image={complaintImage} title={t("title")}>
        <p>{t("complaintText")}</p>
      </LayoutOtherPagesComponent>
    </>
  );
}
