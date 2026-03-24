"use client";

import { RecordPanelLegacyFormActions } from "./record-panel-legacy-form-actions";
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
      <RecordPanelLegacyFormActions
        deleting={deleting}
        handleDelete={handleDelete}
        saving={saving}
        selectedRecord={selectedRecord}
      />
      <RecordPanelLegacyFormMedia
        handleUpload={handleUpload}
        mediaAssets={mediaAssets}
        selectedRecord={selectedRecord}
        uploading={uploading}
      />
    </form>
  );
}
