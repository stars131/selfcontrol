"use client";

import type { useRecordPanelControllerState } from "./use-record-panel-controller-state";

type ControllerState = ReturnType<typeof useRecordPanelControllerState>;

export type RecordPanelControllerHandlerGroupStateInput = Pick<
  ControllerState,
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
