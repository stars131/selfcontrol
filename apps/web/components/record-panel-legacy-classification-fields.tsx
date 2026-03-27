"use client";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import type { RecordPanelLegacyClassificationFieldsProps } from "./record-panel-legacy-classification-fields.types";

export function RecordPanelLegacyClassificationFields({ form, setForm }: RecordPanelLegacyClassificationFieldsProps) {
  const { locale } = useStoredLocale(), { panelCopy } = getRecordPanelUiBundle(locale);
  return (
    <div className="inline-fields">
      <label className="field">
        <span className="field-label">{panelCopy.type}</span>
        <select className="input" value={form.type_code} onChange={(event) => setForm((prev) => ({ ...prev, type_code: event.target.value }))}>
          <option value="memo">{panelCopy.memo}</option>
          <option value="food">{panelCopy.food}</option>
          <option value="snack">{panelCopy.snack}</option>
          <option value="bad_experience">{panelCopy.badExperience}</option>
        </select>
      </label>
      <label className="field">
        <span className="field-label">{panelCopy.rating}</span>
        <input
          className="input"
          max="5"
          min="1"
          onChange={(event) => setForm((prev) => ({ ...prev, rating: event.target.value }))}
          placeholder="1-5"
          type="number"
          value={form.rating}
        />
      </label>
      <label className="checkbox-field">
        <input
          checked={form.is_avoid}
          onChange={(event) => setForm((prev) => ({ ...prev, is_avoid: event.target.checked }))}
          type="checkbox"
        />
        <span>{panelCopy.avoidItem}</span>
      </label>
    </div>
  );
}
