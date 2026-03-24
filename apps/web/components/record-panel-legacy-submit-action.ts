"use client";
import type { FormEvent } from "react";
import { getRecordPanelErrorMessage } from "./record-panel-legacy-action-error";
import type { RecordPanelLegacySubmitActionInput } from "./record-panel-legacy-action-input.types";
export function createRecordPanelLegacySubmitAction({
  form,
  onSaveRecord,
  selectedRecord,
  setError,
  setSaving,
}: RecordPanelLegacySubmitActionInput) {
  return async (event: FormEvent<HTMLFormElement>) => {
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
}
