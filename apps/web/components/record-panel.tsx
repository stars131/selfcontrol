"use client";

import { useMemo } from "react";

import { createRecordPanelLegacyActions } from "./record-panel-legacy-actions";
import { RecordPanelLegacyForm } from "./record-panel-legacy-form";
import { RecordPanelLegacyList } from "./record-panel-legacy-list";
import { useRecordPanelLegacyState } from "./record-panel-legacy-state";
import { RecordPanelLegacyStats } from "./record-panel-legacy-stats";
import { useRecordPanelLegacySync } from "./record-panel-legacy-sync";
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
  const avoidCount = records.filter((record) => record.is_avoid).length;
  const foodCount = records.filter((record) => record.type_code === "food").length;
  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedRecordId) ?? null,
    [records, selectedRecordId],
  );
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
