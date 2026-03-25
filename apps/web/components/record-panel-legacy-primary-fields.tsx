"use client";

import type { RecordPanelLegacyPrimaryFieldsProps } from "./record-panel-legacy-primary-fields.types";

export function RecordPanelLegacyPrimaryFields({
  form,
  setForm,
}: RecordPanelLegacyPrimaryFieldsProps) {
  return (
    <>
      <label className="field">
        <span className="field-label">Title</span>
        <input
          className="input"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Optional title"
        />
      </label>
      <label className="field">
        <span className="field-label">Content</span>
        <textarea
          className="textarea"
          value={form.content}
          onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
          placeholder="Write a note, food review, or reminder"
        />
      </label>
    </>
  );
}
