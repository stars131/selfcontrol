"use client";

import { useMemo, useState } from "react";

import { readLocationHistory, readLocationReview } from "../lib/location";
import { useStoredLocale } from "../lib/locale";
import { formatByteCount } from "../lib/record-panel-format";
import { canRetryMediaIssue } from "../lib/record-panel-media";
import {
  createEmptyForm,
  createEmptyReminderForm,
  type LocationReviewFormState,
  type ReminderFormState,
} from "../lib/record-panel-forms";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import type { LocationReview, RecordFilterState } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { createRecordPanelControllerMediaHandlers } from "./record-panel-controller-media-handlers";
import { createRecordPanelControllerRecordHandlers } from "./record-panel-controller-record-handlers";
import type { ViewMode } from "./record-panel-v2.types";
import { useRecordPanelControllerSync } from "./use-record-panel-controller-sync";

export function useRecordPanelController({
  authToken,
  workspaceId,
  records,
  selectedRecordId,
  mediaAssets,
  mediaDeadLetterOverview,
  onSaveRecord,
  onCreateReminder,
  onDeleteMedia,
  onDeleteRecord,
  onBulkRetryMediaDeadLetter,
  onRefreshMediaStatus,
  onApplyRecordFilter,
  onCreateSearchPreset,
  onDeleteSearchPreset,
  onRetryMedia,
  onUploadMedia,
  recordFilter,
}: ControllerProps) {
  const { locale } = useStoredLocale();
  const avoidCount = records.filter((record) => record.is_avoid).length;
  const foodCount = records.filter((record) => record.type_code === "food").length;
  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedRecordId) ?? null,
    [records, selectedRecordId],
  );

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

  const selectedLocationReview = useMemo<LocationReview | null>(
    () => readLocationReview(selectedRecord?.extra_data),
    [selectedRecord],
  );
  const selectedLocationHistory = useMemo(
    () => readLocationHistory(selectedRecord?.extra_data).slice().reverse(),
    [selectedRecord],
  );
  const selectedRecordMediaSizeBytes = useMemo(
    () => mediaAssets.reduce((sum, asset) => sum + asset.size_bytes, 0),
    [mediaAssets],
  );
  const actionableDeadLetterIds = useMemo(
    () =>
      new Set(
        (mediaDeadLetterOverview?.items ?? [])
          .filter((item) => canRetryMediaIssue(item))
          .map((item) => item.media_id),
      ),
    [mediaDeadLetterOverview],
  );

  const { mediaIssueCopy, panelCopy } = useMemo(() => getRecordPanelUiBundle(locale), [locale]);
  const {
    copy: detailCopy,
    formatAvoidCountLabel,
    formatFileCountLabel,
    formatHistoryTimestampLabel,
    formatRecordTimestampLabel,
    formatReminderEnabledLabel,
    formatReminderStatusLabel,
    formatReminderTimestampLabel,
    formatReviewStatusLabel,
    formatTimelineCountLabel,
    formatTimelineDateLabel,
    summarizeHistoryActionLabel,
    summarizeRecordFilterLabel,
  } = useMemo(() => getRecordPanelDetailBundle(locale), [locale]);

  useRecordPanelControllerSync({
    actionableDeadLetterIds,
    recordFilter,
    selectedRecord,
    setFilterDraft,
    setForm,
    setLocationReviewForm,
    setReminderForm,
    setSelectedDeadLetterIds,
  });

  const recordHandlers = createRecordPanelControllerRecordHandlers({
    detailCopy,
    filterDraft,
    form,
    locationReviewForm,
    onApplyRecordFilter,
    onCreateReminder,
    onCreateSearchPreset,
    onDeleteRecord,
    onDeleteSearchPreset,
    onSaveRecord,
    presetName,
    reminderForm,
    selectedRecord,
    setDeleting,
    setError,
    setForm,
    setPresetName,
    setReminderForm,
    setSaving,
    setSavingReminder,
  });
  const mediaHandlers = createRecordPanelControllerMediaHandlers({
    authToken,
    detailCopy,
    mediaDeadLetterOverview,
    onBulkRetryMediaDeadLetter,
    onDeleteMedia,
    onRefreshMediaStatus,
    onRetryMedia,
    onUploadMedia,
    selectedDeadLetterIds,
    selectedRecord,
    setBulkRetryingDeadLetter,
    setDeletingMediaId,
    setDownloadingMediaId,
    setError,
    setRefreshingMediaId,
    setRetryingMediaId,
    setSelectedDeadLetterIds,
    setUploading,
    workspaceId,
  });

  return {
    locale,
    avoidCount,
    foodCount,
    selectedRecord,
    form,
    setForm,
    saving,
    deleting,
    uploading,
    refreshingMediaId,
    retryingMediaId,
    bulkRetryingDeadLetter,
    downloadingMediaId,
    deletingMediaId,
    reminderForm,
    setReminderForm,
    savingReminder,
    locationReviewForm,
    setLocationReviewForm,
    viewMode,
    setViewMode,
    filterDraft,
    setFilterDraft,
    presetName,
    setPresetName,
    selectedDeadLetterIds,
    error,
    selectedLocationReview,
    selectedLocationHistory,
    selectedRecordMediaSizeLabel: formatByteCount(selectedRecordMediaSizeBytes),
    mediaIssueCopy,
    panelCopy,
    detailCopy,
    formatAvoidCountLabel,
    formatFileCountLabel,
    formatHistoryTimestampLabel,
    formatRecordTimestampLabel,
    formatReminderEnabledLabel,
    formatReminderStatusLabel,
    formatReminderTimestampLabel,
    formatReviewStatusLabel,
    formatTimelineCountLabel,
    formatTimelineDateLabel,
    summarizeHistoryActionLabel,
    summarizeRecordFilterLabel,
    ...recordHandlers,
    ...mediaHandlers,
  };
}
