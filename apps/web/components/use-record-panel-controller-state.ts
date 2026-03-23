"use client";

import { useState } from "react";

import {
  createEmptyForm,
  createEmptyReminderForm,
  type LocationReviewFormState,
  type ReminderFormState,
} from "../lib/record-panel-forms";
import type { RecordFilterState } from "../lib/types";
import type { ViewMode } from "./record-panel-v2.types";

export function useRecordPanelControllerState(recordFilter: RecordFilterState) {
  const [form, setForm] = useState(createEmptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [refreshingMediaId, setRefreshingMediaId] = useState<string | null>(null);
  const [retryingMediaId, setRetryingMediaId] = useState<string | null>(null);
  const [bulkRetryingDeadLetter, setBulkRetryingDeadLetter] = useState(false);
  const [downloadingMediaId, setDownloadingMediaId] = useState<string | null>(null);
  const [deletingMediaId, setDeletingMediaId] = useState<string | null>(null);
  const [reminderForm, setReminderForm] = useState<ReminderFormState>(createEmptyReminderForm);
  const [savingReminder, setSavingReminder] = useState(false);
  const [locationReviewForm, setLocationReviewForm] = useState<LocationReviewFormState>({
    status: "pending",
    note: "",
  });
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const [filterDraft, setFilterDraft] = useState<RecordFilterState>(recordFilter);
  const [presetName, setPresetName] = useState("");
  const [selectedDeadLetterIds, setSelectedDeadLetterIds] = useState<string[]>([]);
  const [error, setError] = useState("");

  return {
    form,
    setForm,
    saving,
    setSaving,
    deleting,
    setDeleting,
    uploading,
    setUploading,
    refreshingMediaId,
    setRefreshingMediaId,
    retryingMediaId,
    setRetryingMediaId,
    bulkRetryingDeadLetter,
    setBulkRetryingDeadLetter,
    downloadingMediaId,
    setDownloadingMediaId,
    deletingMediaId,
    setDeletingMediaId,
    reminderForm,
    setReminderForm,
    savingReminder,
    setSavingReminder,
    locationReviewForm,
    setLocationReviewForm,
    viewMode,
    setViewMode,
    filterDraft,
    setFilterDraft,
    presetName,
    setPresetName,
    selectedDeadLetterIds,
    setSelectedDeadLetterIds,
    error,
    setError,
  };
}
