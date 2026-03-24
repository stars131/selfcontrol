"use client";

import { useMemo } from "react";

import { useStoredLocale } from "../lib/locale";
import { buildRecordPanelLocalizedViewData } from "./record-panel-controller-localized-view-data";

export function useRecordPanelControllerLocalizedViewData() {
  const { locale } = useStoredLocale();
  const localizedViewData = useMemo(() => buildRecordPanelLocalizedViewData(locale), [locale]);

  return {
    locale,
    ...localizedViewData,
  };
}
