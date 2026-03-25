"use client";

import type { RecordEditorMetadataFieldsProps } from "./record-editor-metadata-fields.types";

export function RecordEditorMetadataFields({
  canWriteWorkspace,
  form,
  onOccurredAtChange,
  onRatingChange,
  onTypeCodeChange,
  panelCopy,
}: RecordEditorMetadataFieldsProps) {
  return (
    <div className="inline-fields">
      <label className="field">
        <span className="field-label">{panelCopy.type}</span>
        <select
          className="input"
          disabled={!canWriteWorkspace}
          value={form.type_code}
          onChange={(event) => onTypeCodeChange(event.target.value)}
        >
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
          type="number"
          disabled={!canWriteWorkspace}
          min="1"
          max="5"
          value={form.rating}
          onChange={(event) => onRatingChange(event.target.value)}
          placeholder="1-5"
        />
      </label>
      <label className="field">
        <span className="field-label">{panelCopy.occurredAt}</span>
        <input
          className="input"
          type="datetime-local"
          disabled={!canWriteWorkspace}
          value={form.occurred_at}
          onChange={(event) => onOccurredAtChange(event.target.value)}
        />
      </label>
    </div>
  );
}
