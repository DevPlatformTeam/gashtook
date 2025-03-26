"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

interface ViewsAlertProps {
  views: number;
}

export default function ViewsAlert({ views }: ViewsAlertProps) {
  useEffect(() => {
    if (views > 0) {
      Swal.fire({
        title: "بازدید باقی مانده",
        text: `شما ${views} بازدید دیگر دارید.`,
        icon: "info",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }, [views]);

  return null;
}
