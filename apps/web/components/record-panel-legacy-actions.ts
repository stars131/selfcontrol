"use client";

import type { ChangeEvent, FormEvent } from "react";

import type { RecordItem } from "../lib/types";
import type { RecordPanelFormState, RecordPanelProps } from "./record-panel.types";

function getRecordPanelErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function createRecordPanelLegacyActions({
  form,
  onDeleteRecord,
  onSaveRecord,
  onUploadMedia,
  selectedRecord,
  setDeleting,
  setError,
  setSaving,
  setUploading,
}: {
  form: RecordPanelFormState;
  onDeleteRecord: RecordPanelProps["onDeleteRecord"];
  onSaveRecord: RecordPanelProps["onSaveRecord"];
  onUploadMedia: RecordPanelProps["onUploadMedia"];
  selectedRecord: RecordItem | null;
  setDeleting: (value: boolean) => void;
  setError: (value: string) => void;
  setSaving: (value: boolean) => void;
  setUploading: (value: boolean) => void;
}) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
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

  return {
    handleSubmit,
    handleDelete,
    handleUpload,
  };
}
