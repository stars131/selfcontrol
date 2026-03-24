"use client";

import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";

export function RecordPanelLegacyPrimaryFields({
  form,
  setForm,
}: Pick<RecordPanelLegacyFormProps, "form" | "setForm">) {
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
