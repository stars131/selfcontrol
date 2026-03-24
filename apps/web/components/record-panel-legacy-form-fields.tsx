"use client";

import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";

export function RecordPanelLegacyFormFields({
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
      <div className="inline-fields">
        <label className="field">
          <span className="field-label">Type</span>
          <select
            className="input"
            value={form.type_code}
            onChange={(event) => setForm((prev) => ({ ...prev, type_code: event.target.value }))}
          >
            <option value="memo">memo</option>
            <option value="food">food</option>
            <option value="snack">snack</option>
            <option value="bad_experience">bad_experience</option>
          </select>
        </label>
        <label className="field">
          <span className="field-label">Rating</span>
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
          <span>Avoid item</span>
        </label>
      </div>
    </>
  );
}
