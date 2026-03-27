"use client";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";

export function RecordPanelLegacyListEmpty() {
  const { locale } = useStoredLocale();
  return <div className="notice">{getRecordPanelDetailBundle(locale).copy.noRecords}</div>;
}
