"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

interface ViewsAlertProps {
  views: number;
}

export default function ViewsAlert({ views }: ViewsAlertProps) {
  const t = useTranslations("ViewsAlert"); 

  useEffect(() => {
    if (views > 0) {
      Swal.fire({
        title: t("title"),
        text: t("text", { count: views }),
        icon: "info",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }, [views, t]);

  return null;
}
