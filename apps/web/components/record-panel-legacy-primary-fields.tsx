"use client";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import type { RecordPanelLegacyPrimaryFieldsProps } from "./record-panel-legacy-primary-fields.types";

export function RecordPanelLegacyPrimaryFields({ form, setForm }: RecordPanelLegacyPrimaryFieldsProps) {
  const { locale } = useStoredLocale(), { panelCopy } = getRecordPanelUiBundle(locale);
  return (
    <>
      <label className="field">
        <span className="field-label">{panelCopy.title}</span>
        <input className="input" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} placeholder={panelCopy.optionalTitle} />
      </label>
      <label className="field">
        <span className="field-label">{panelCopy.content}</span>
        <textarea className="textarea" value={form.content} onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))} placeholder={panelCopy.contentPlaceholder} />
      </label>
    </>
  );
}
