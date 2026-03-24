"use client";

import { createRecordPanelLegacyActions } from "./record-panel-legacy-actions";
import { RecordPanelLegacyForm } from "./record-panel-legacy-form";
import { RecordPanelLegacyList } from "./record-panel-legacy-list";
import { useRecordPanelLegacyState } from "./record-panel-legacy-state";
import { RecordPanelLegacyStats } from "./record-panel-legacy-stats";
import { useRecordPanelLegacySync } from "./record-panel-legacy-sync";
import { useRecordPanelLegacyViewData } from "./use-record-panel-legacy-view-data";
import type { RecordPanelProps } from "./record-panel.types";

export function RecordPanel({
  workspaceId,
  records,
  selectedRecordId,
  mediaAssets,
  onSelectRecord,
  onSaveRecord,
  onDeleteRecord,
  onUploadMedia,
  onResetFilter,
}: RecordPanelProps) {
  const { avoidCount, foodCount, selectedRecord } = useRecordPanelLegacyViewData({
    records,
    selectedRecordId,
  });
  const {
    form,
    setForm,
    saving,
    setSaving,
    deleting,
    setDeleting,
    uploading,
    setUploading,
    error,
    setError,
  } = useRecordPanelLegacyState();
  useRecordPanelLegacySync({ selectedRecord, setForm });
  const { handleSubmit, handleDelete, handleUpload } = createRecordPanelLegacyActions({
    form,
    onDeleteRecord,
    onSaveRecord,
    onUploadMedia,
    selectedRecord,
    setDeleting,
    setError,
    setSaving,
    setUploading,
  });

  return (
    <section className="panel">
      <RecordPanelLegacyStats
        avoidCount={avoidCount}
        foodCount={foodCount}
        recordCount={records.length}
        workspaceId={workspaceId}
        onResetFilter={onResetFilter}
      />
      <div className="panel-body">
        <RecordPanelLegacyForm
          deleting={deleting}
          error={error}
          form={form}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          handleUpload={handleUpload}
          mediaAssets={mediaAssets}
          saving={saving}
          selectedRecord={selectedRecord}
          setForm={setForm}
          uploading={uploading}
        />
        <RecordPanelLegacyList
          records={records}
          selectedRecordId={selectedRecordId}
          onSelectRecord={onSelectRecord}
        />
      </div>
    </section>
  );
}
