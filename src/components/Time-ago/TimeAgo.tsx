"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface TimeAgoProps {
  sentAt: string;
}

export default function TimeAgo({ sentAt }: TimeAgoProps) {
  const t = useTranslations("TimeAgo");
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    if (!sentAt) return;

    const isoDate = sentAt.replace(" ", "T");
    const parsedDate = new Date(isoDate);
    const now = new Date();
    const diff = now.getTime() - parsedDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let timeAgoText = t("justNow");

    if (years > 0) {
      timeAgoText = t("yearsAgo", { count: years });
    } else if (months > 0) {
      timeAgoText = t("monthsAgo", { count: months });
    } else if (days > 0) {
      timeAgoText = t("daysAgo", { count: days });
    } else if (hours > 0) {
      timeAgoText = t("hoursAgo", { count: hours });
    } else if (minutes > 0) {
      timeAgoText = t("minutesAgo", { count: minutes });
    }

    setTimeAgo(timeAgoText);
  }, [sentAt, t]);

  return <span className="text-gray-500 text-sm mt-2">{timeAgo}</span>;
}
