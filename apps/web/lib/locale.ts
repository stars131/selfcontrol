"use client";

import { useEffect, useState } from "react";

export type LocaleCode = "en" | "zh-CN" | "ja";

const LOCALE_KEY = "selfcontrol.locale";
const DEFAULT_LOCALE: LocaleCode = "zh-CN";

export const LOCALE_OPTIONS: Array<{ value: LocaleCode; label: string }> = [
  { value: "zh-CN", label: "简体中文" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

export function getStoredLocale(): LocaleCode {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const value = window.localStorage.getItem(LOCALE_KEY);
  if (value === "en" || value === "zh-CN" || value === "ja") {
    return value;
  }
  return DEFAULT_LOCALE;
}

export function setStoredLocale(locale: LocaleCode): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(LOCALE_KEY, locale);
  window.dispatchEvent(new CustomEvent("selfcontrol:locale-change", { detail: locale }));
}

export function useStoredLocale() {
  const [locale, setLocale] = useState<LocaleCode>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocale(getStoredLocale());

    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent<LocaleCode>;
      const nextLocale = customEvent.detail;
      if (nextLocale === "en" || nextLocale === "zh-CN" || nextLocale === "ja") {
        setLocale(nextLocale);
        return;
      }
      setLocale(getStoredLocale());
    };

    window.addEventListener("selfcontrol:locale-change", handleChange as EventListener);
    return () => {
      window.removeEventListener("selfcontrol:locale-change", handleChange as EventListener);
    };
  }, []);

  return {
    locale,
    setLocale: (value: LocaleCode) => {
      setLocale(value);
      setStoredLocale(value);
    },
  };
}
