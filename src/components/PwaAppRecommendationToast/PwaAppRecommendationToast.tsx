"use client";

import { useEffect, useState } from "react";
import { FiSmartphone } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface Props {
  message?: string;
  duration?: number; // ms
  localStorageKey?: string;
}

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}
export const PwaAppRecommendationToast = ({
  message = "For best experience, open the app from your home screen.",
  duration = 5000,
  localStorageKey = "pwa_open_toast_dismissed",
}: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasDismissed = localStorage.getItem(localStorageKey) === "true";
    if (hasDismissed) return;

    const nav = window.navigator as NavigatorStandalone;

    const isInstalled = localStorage.getItem("pwa_installed") === "true";
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      nav.standalone === true;

    if (isInstalled && !isStandalone) {
      setVisible(true);
      if (duration > 0) {
        setTimeout(() => {
          setVisible(false);
        }, duration);
      }
    }
  }, [duration, localStorageKey]);

  const dismiss = () => {
    localStorage.setItem(localStorageKey, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in bg-primary text-white shadow-xl px-5 py-4 rounded-lg flex items-center gap-3 max-w-sm w-full">
      <FiSmartphone size={22} className="text-white" />
      <span className="flex-1 text-base">{message}</span>
      <button onClick={dismiss}>
        <IoClose
          size={20}
          className="text-white hover:text-red-300 transition"
        />
      </button>
    </div>
  );
};
