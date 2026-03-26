"use client";
import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
export function MapPanelUnavailableNotice() {
  const { locale } = useStoredLocale();
  const { panelCopy } = getRecordPanelUiBundle(locale);
  return (
    <section className="record-card" style={{ marginTop: 20 }}>
      <div className="eyebrow">{panelCopy.mapTitle}</div>
      <div className="notice" style={{ marginTop: 12 }}>
        {panelCopy.mapUnavailable}
      </div>
    </section>
  );
}
