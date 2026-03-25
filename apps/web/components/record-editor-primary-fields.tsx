"use client";

import type { RecordEditorPrimaryFieldsProps } from "./record-editor-primary-fields.types";

export function RecordEditorPrimaryFields({
  canWriteWorkspace,
  editorLabel,
  form,
  onContentChange,
  onTitleChange,
  panelCopy,
}: RecordEditorPrimaryFieldsProps) {
  return (
    <>
      <div className="eyebrow">{editorLabel}</div>
      <label className="field">
        <span className="field-label">{panelCopy.title}</span>
        <input
          className="input"
          disabled={!canWriteWorkspace}
          value={form.title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder={panelCopy.optionalTitle}
        />
      </label>
      <label className="field">
        <span className="field-label">{panelCopy.content}</span>
        <textarea
          className="textarea"
          disabled={!canWriteWorkspace}
          value={form.content}
          onChange={(event) => onContentChange(event.target.value)}
          placeholder={panelCopy.contentPlaceholder}
        />
      </label>
    </>
  );
}
