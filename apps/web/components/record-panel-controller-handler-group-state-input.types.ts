"use client";
import type { BuildRecordPanelControllerStateResultInput } from "./record-panel-controller-state-result.types";

export type RecordPanelControllerHandlerGroupStateInput = Pick<
  BuildRecordPanelControllerStateResultInput,
  | "filterDraft"
  | "form"
  | "locationReviewForm"
  | "presetName"
  | "reminderForm"
  | "selectedDeadLetterIds"
  | "setBulkRetryingDeadLetter"
  | "setDeleting"
  | "setDeletingMediaId"
  | "setDownloadingMediaId"
  | "setError"
  | "setForm"
  | "setPresetName"
  | "setRefreshingMediaId"
  | "setReminderForm"
  | "setRetryingMediaId"
  | "setSaving"
  | "setSavingReminder"
  | "setSelectedDeadLetterIds"
  | "setUploading"
>;
