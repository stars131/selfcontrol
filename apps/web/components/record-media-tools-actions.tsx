"use client";

import type { RecordMediaToolsActionsProps } from "./record-media-tools-actions.types";

export function RecordMediaToolsActions({
  canWriteWorkspace,
  deleteButtonLabel,
  deleting,
  error,
  hasSelectedRecord,
  onDelete,
  onUpload,
  saveButtonLabel,
  saving,
  uploadAttachmentLabel,
  uploading,
  uploadingMediaLabel,
}: RecordMediaToolsActionsProps) {
  return (
    <>
      {error ? <div className="notice error">{error}</div> : null}
      <div className="action-row">
        <button className="button" disabled={saving || !canWriteWorkspace} type="submit">
          {saveButtonLabel}
        </button>
        {hasSelectedRecord ? (
          <button className="button secondary" disabled={deleting || !canWriteWorkspace} onClick={onDelete} type="button">
            {deleteButtonLabel}
          </button>
        ) : null}
      </div>
      {hasSelectedRecord ? (
        <>
          <label className="field">
            <span className="field-label">{uploadAttachmentLabel}</span>
            <input disabled={!canWriteWorkspace} onChange={onUpload} type="file" />
          </label>
          {uploading ? <div className="notice">{uploadingMediaLabel}</div> : null}
        </>
      ) : null}
    </>
  );
}
