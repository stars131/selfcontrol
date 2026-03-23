"use client";

import { useEffect, useMemo, useState } from "react";

import { RecordPanelLegacyForm } from "./record-panel-legacy-form";
import { RecordPanelLegacyList } from "./record-panel-legacy-list";
import { RecordPanelLegacyStats } from "./record-panel-legacy-stats";
import type { RecordPanelFormState, RecordPanelProps } from "./record-panel.types";

const EMPTY_FORM: RecordPanelFormState = {
  title: "",
  content: "",
  type_code: "memo",
  rating: "",
  is_avoid: false,
};

function getRecordPanelErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

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
  const [form, setForm] = useState<RecordPanelFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedRecord) {
      setForm(EMPTY_FORM);
      return;
    }
    setForm({
      title: selectedRecord.title ?? "",
      content: selectedRecord.content ?? "",
      type_code: selectedRecord.type_code,
      rating: selectedRecord.rating ? String(selectedRecord.rating) : "",
      is_avoid: selectedRecord.is_avoid,
    });
  }, [selectedRecord]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.content.trim()) {
      setError("Content is required");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await onSaveRecord({
        recordId: selectedRecord?.id,
        title: form.title.trim() || undefined,
        content: form.content.trim(),
        type_code: form.type_code,
        rating: form.rating ? Number(form.rating) : null,
        is_avoid: form.is_avoid,
      });
    } catch (caught) {
      setError(getRecordPanelErrorMessage(caught, "Failed to save record"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecord) {
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await onDeleteRecord(selectedRecord.id);
    } catch (caught) {
      setError(getRecordPanelErrorMessage(caught, "Failed to delete record"));
    } finally {
      setDeleting(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedRecord) {
      return;
    }
    setUploading(true);
    setError("");
    try {
      await onUploadMedia(selectedRecord.id, file);
      event.target.value = "";
    } catch (caught) {
      setError(getRecordPanelErrorMessage(caught, "Failed to upload media"));
    } finally {
      setUploading(false);
    }
  };

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
