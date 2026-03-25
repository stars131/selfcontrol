"use client";

import type { LocaleCode } from "../lib/locale";
import type { LanguageSwitcherProps } from "./language-switcher.types";

const LABEL_BY_LOCALE: Record<LocaleCode, string> = {
  "zh-CN": "语言",
  en: "Language",
  ja: "言語",
};

const DISPLAY_OPTIONS: Array<{ value: LocaleCode; label: string }> = [
  { value: "zh-CN", label: "简体中文" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

export function LanguageSwitcher({
  locale,
  onChange,
}: LanguageSwitcherProps) {
  return (
    <label className="locale-switcher">
      <span className="field-label">{LABEL_BY_LOCALE[locale]}</span>
      <select
        className="input"
        value={locale}
        onChange={(event) => onChange(event.target.value as LocaleCode)}
      >
        {DISPLAY_OPTIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
