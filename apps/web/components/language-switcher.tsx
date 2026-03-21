"use client";

import { LOCALE_OPTIONS, type LocaleCode } from "../lib/locale";

export function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: LocaleCode;
  onChange: (locale: LocaleCode) => void;
}) {
  return (
    <label className="locale-switcher">
      <span className="field-label">Language</span>
      <select
        className="input"
        value={locale}
        onChange={(event) => onChange(event.target.value as LocaleCode)}
      >
        {LOCALE_OPTIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
