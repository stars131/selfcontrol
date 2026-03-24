"use client";

import { RecordPanelLegacyFormFields } from "./record-panel-legacy-form-fields";
import { RecordPanelLegacyFormMedia } from "./record-panel-legacy-form-media";
import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";

export function RecordPanelLegacyForm({
  deleting,
  error,
  form,
  handleDelete,
  handleSubmit,
  handleUpload,
  mediaAssets,
  saving,
  selectedRecord,
  setForm,
  uploading,
}: RecordPanelLegacyFormProps) {
  return (
    <form className="record-card form-stack" style={{ marginTop: 20 }} onSubmit={(event) => void handleSubmit(event)}>
      <div className="eyebrow">{selectedRecord ? "Edit record" : "New manual record"}</div>
      <RecordPanelLegacyFormFields form={form} setForm={setForm} />
      {error ? <div className="notice error">{error}</div> : null}
      <div className="action-row">
        <button className="button" disabled={saving} type="submit">
          {saving ? "Saving..." : selectedRecord ? "Update record" : "Create record"}
        </button>
        {selectedRecord ? (
          <button className="button secondary" disabled={deleting} onClick={() => void handleDelete()} type="button">
            {deleting ? "Deleting..." : "Delete record"}
          </button>
        ) : null}
      </div>
      <RecordPanelLegacyFormMedia
        handleUpload={handleUpload}
        mediaAssets={mediaAssets}
        selectedRecord={selectedRecord}
        uploading={uploading}
      />
    </form>
  );
}
