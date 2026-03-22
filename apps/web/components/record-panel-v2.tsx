"use client";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { fetchMediaBlob } from "../lib/api";
import { useStoredLocale } from "../lib/locale";
import { formatByteCount } from "../lib/record-panel-format";
import { canRetryMediaIssue } from "../lib/record-panel-media";
import {
  createEmptyForm,
  createEmptyReminderForm,
  formatDatetimeInput,
  readLocationForm,
  readLocationReviewForm,
  type LocationReviewFormState,
  type RecordFormState,
  type ReminderFormState,
} from "../lib/record-panel-forms";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import { MapPanel, type LocationDraft } from "./map-panel";
import { LocationReviewPanel } from "./location-review-panel";
import { DeadLetterRecoveryPanel } from "./dead-letter-recovery-panel";
import { MediaAssetSection } from "./media-asset-section";
import { MediaStorageOverview } from "./media-storage-overview";
import { RecentMediaIssuesPanel } from "./recent-media-issues-panel";
import { RecordSearchPanel } from "./record-search-panel";
import { RecordResultsView } from "./record-results-view";
import { RecordPanelStats } from "./record-panel-stats";
import { RecordReminderPanel } from "./record-reminder-panel";
import { SearchPresetList } from "./search-preset-list";
import { readLocationHistory, readLocationReview } from "../lib/location";
import type {
  LocationReview,
  MediaAsset,
  MediaDeadLetterOverview,
  MediaProcessingOverview,
  MediaStorageSummary,
  RecordFilterState,
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  TimelineDay,
} from "../lib/types";

type ViewMode = "timeline" | "list";

export function RecordPanelV2({
  authToken,
  canWriteWorkspace,
  workspaceId,
  records,
  selectedRecordId,
  timelineDays,
  mediaAssets,
  mediaDeadLetterOverview,
  mediaProcessingOverview,
  mediaStorageSummary,
  reminders,
  onSelectRecord,
  onSaveRecord,
  onCreateReminder,
  onDeleteMedia,
  onUpdateReminder,
  onDeleteReminder,
  onDeleteRecord,
  onBulkRetryMediaDeadLetter,
  onRefreshMediaStatus,
  onApplyRecordFilter,
  onApplyLocationFilter,
  onCreateSearchPreset,
  onDeleteSearchPreset,
  onRetryMedia,
  onUploadMedia,
  onResetFilter,
  recordFilter,
  searchPresets,
  savingSearchPreset,
  filteringRecords,
}: {
  authToken: string | null;
  canWriteWorkspace: boolean;
  workspaceId: string;
  records: RecordItem[];
  timelineDays: TimelineDay[];
  selectedRecordId: string | null;
  mediaAssets: MediaAsset[];
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  mediaProcessingOverview: MediaProcessingOverview | null;
  mediaStorageSummary: MediaStorageSummary | null;
  reminders: ReminderItem[];
  onSelectRecord: (recordId: string | null) => void;
  onSaveRecord: (input: {
    recordId?: string;
    title?: string;
    content: string;
    type_code: string;
    rating?: number | null;
    occurred_at?: string;
    is_avoid: boolean;
    extra_data?: Record<string, unknown>;
  }) => Promise<void>;
  onCreateReminder: (input: {
    recordId: string;
    title?: string;
    message?: string;
    remind_at: string;
    channel_code?: string;
  }) => Promise<void>;
  onDeleteMedia: (mediaId: string) => Promise<void>;
  onUpdateReminder: (
    reminderId: string,
    input: Partial<{
      title: string | null;
      message: string | null;
      remind_at: string | null;
      status: string;
      is_enabled: boolean;
    }>,
  ) => Promise<void>;
  onDeleteReminder: (reminderId: string) => Promise<void>;
  onDeleteRecord: (recordId: string) => Promise<void>;
  onBulkRetryMediaDeadLetter: (input: {
    mediaIds?: string[];
    retryStates?: string[];
    limit?: number;
  }) => Promise<void>;
  onRefreshMediaStatus: (mediaId: string) => Promise<void>;
  onApplyRecordFilter: (nextFilter: RecordFilterState) => Promise<void>;
  onApplyLocationFilter: (
    nextFilter: Pick<RecordFilterState, "placeQuery" | "reviewStatus" | "mappedOnly">,
  ) => Promise<void>;
  onCreateSearchPreset: (name: string, nextFilter: RecordFilterState) => Promise<void>;
  onDeleteSearchPreset: (presetId: string) => Promise<void>;
  onRetryMedia: (mediaId: string) => Promise<void>;
  onUploadMedia: (recordId: string, file: File) => Promise<void>;
  onResetFilter: () => Promise<void>;
  recordFilter: RecordFilterState;
  searchPresets: SearchPresetItem[];
  savingSearchPreset: boolean;
  filteringRecords: boolean;
}) {
  const { locale } = useStoredLocale();
  const avoidCount = records.filter((record) => record.is_avoid).length;
  const foodCount = records.filter((record) => record.type_code === "food").length;
  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedRecordId) ?? null,
    [records, selectedRecordId],
  );
  const [form, setForm] = useState<RecordFormState>(createEmptyForm);
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

  useEffect(() => {
    setSelectedDeadLetterIds((current) => current.filter((item) => actionableDeadLetterIds.has(item)));
  }, [actionableDeadLetterIds]);

  useEffect(() => {
    if (!selectedRecord) {
      setForm(createEmptyForm());
      setLocationReviewForm({
        status: "pending",
        note: "",
      });
      return;
    }

    setForm({
      title: selectedRecord.title ?? "",
      content: selectedRecord.content ?? "",
      type_code: selectedRecord.type_code,
      rating: selectedRecord.rating ? String(selectedRecord.rating) : "",
      occurred_at: formatDatetimeInput(selectedRecord.occurred_at),
      is_avoid: selectedRecord.is_avoid,
      location: readLocationForm(selectedRecord),
    });
    setLocationReviewForm(readLocationReviewForm(selectedRecord));
  }, [selectedRecord]);

  useEffect(() => {
    if (!selectedRecord) {
      setReminderForm(createEmptyReminderForm());
      return;
    }

    setReminderForm({
      title: selectedRecord.title ?? "",
      message: "",
      remind_at: "",
    });
  }, [selectedRecord]);

  useEffect(() => {
    setFilterDraft(recordFilter);
  }, [recordFilter]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.content.trim()) {
      setError(detailCopy.contentRequiredError);
      return;
    }

    const latitude = form.location.latitude.trim() ? Number(form.location.latitude) : null;
    const longitude = form.location.longitude.trim() ? Number(form.location.longitude) : null;

    if (form.location.latitude.trim() && (latitude === null || Number.isNaN(latitude))) {
      setError(detailCopy.latitudeInvalidError);
      return;
    }

    if (form.location.longitude.trim() && (longitude === null || Number.isNaN(longitude))) {
      setError(detailCopy.longitudeInvalidError);
      return;
    }

    setSaving(true);
    setError("");
    try {
      const hasLocation =
        form.location.place_name.trim() ||
        form.location.address.trim() ||
        latitude !== null ||
        longitude !== null;

      await onSaveRecord({
        recordId: selectedRecord?.id,
        title: form.title.trim() || undefined,
        content: form.content.trim(),
        type_code: form.type_code,
        rating: form.rating ? Number(form.rating) : null,
        occurred_at: form.occurred_at ? new Date(form.occurred_at).toISOString() : undefined,
        is_avoid: form.is_avoid,
        extra_data: hasLocation
          ? {
              location: {
                place_name: form.location.place_name.trim() || undefined,
                address: form.location.address.trim() || undefined,
                latitude: latitude ?? undefined,
                longitude: longitude ?? undefined,
                source: form.location.source || "manual",
              },
              location_review: {
                status: locationReviewForm.status || "pending",
                note: locationReviewForm.note.trim() || undefined,
              },
            }
          : {
              location: null,
              location_review: null,
            },
      });

      if (!selectedRecord) {
        setForm(createEmptyForm());
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.saveRecordError);
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
      setError(caught instanceof Error ? caught.message : detailCopy.deleteRecordError);
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
      setError(caught instanceof Error ? caught.message : detailCopy.uploadMediaError);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateReminderSubmit = async () => {
    if (!selectedRecord) {
      setError("Save or select a record before adding a reminder");
      return;
    }
    if (!reminderForm.remind_at) {
      setError(detailCopy.reminderTimeRequiredError);
      return;
    }

    setSavingReminder(true);
    setError("");
    try {
      await onCreateReminder({
        recordId: selectedRecord.id,
        title: reminderForm.title.trim() || selectedRecord.title || undefined,
        message: reminderForm.message.trim() || undefined,
        remind_at: new Date(reminderForm.remind_at).toISOString(),
        channel_code: "in_app",
      });
      setReminderForm((prev) => ({
        ...prev,
        message: "",
        remind_at: "",
      }));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.createReminderError);
    } finally {
      setSavingReminder(false);
    }
  };

  const handleRefreshMedia = async (mediaId: string) => {
    setRefreshingMediaId(mediaId);
    setError("");
    try {
      await onRefreshMediaStatus(mediaId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.refreshMediaError);
    } finally {
      setRefreshingMediaId(null);
    }
  };

  const handleRetryMediaProcessing = async (mediaId: string) => {
    setRetryingMediaId(mediaId);
    setError("");
    try {
      await onRetryMedia(mediaId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.retryMediaError);
    } finally {
      setRetryingMediaId(null);
    }
  };

  const handleToggleDeadLetterSelection = (mediaId: string, checked: boolean) => {
    setSelectedDeadLetterIds((current) => {
      if (checked) {
        return current.includes(mediaId) ? current : [...current, mediaId];
      }
      return current.filter((item) => item !== mediaId);
    });
  };

  const handleSelectAllDeadLetter = () => {
    setSelectedDeadLetterIds(
      (mediaDeadLetterOverview?.items ?? [])
        .filter((item) => canRetryMediaIssue(item))
        .map((item) => item.media_id),
    );
  };

  const handleClearDeadLetterSelection = () => {
    setSelectedDeadLetterIds([]);
  };

  const handleBulkRetryDeadLetter = async (mode: "selected" | "all") => {
    setBulkRetryingDeadLetter(true);
    setError("");
    try {
      await onBulkRetryMediaDeadLetter(
        mode === "selected"
          ? { mediaIds: selectedDeadLetterIds }
          : { retryStates: ["manual_only", "exhausted", "disabled"], limit: 50 },
      );
      if (mode === "selected") {
        setSelectedDeadLetterIds([]);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.bulkRetryError);
    } finally {
      setBulkRetryingDeadLetter(false);
    }
  };

  const handleDownloadMedia = async (asset: MediaAsset) => {
    if (!authToken) {
      setError(detailCopy.notAuthenticated);
      return;
    }

    setDownloadingMediaId(asset.id);
    setError("");
    try {
      const blob = await fetchMediaBlob(authToken, workspaceId, asset.id);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = asset.original_filename || `${asset.id}.bin`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.downloadMediaError);
    } finally {
      setDownloadingMediaId(null);
    }
  };

  const handleDeleteMediaAsset = async (mediaId: string) => {
    setDeletingMediaId(mediaId);
    setError("");
    try {
      await onDeleteMedia(mediaId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.deleteMediaError);
    } finally {
      setDeletingMediaId(null);
    }
  };

  const handleApplyFilter = async () => {
    setError("");
    try {
      await onApplyRecordFilter(filterDraft);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.applyFilterError);
    }
  };

  const handleSavePreset = async () => {
    if (!presetName.trim()) {
      setError(detailCopy.presetNameRequiredError);
      return;
    }

    setError("");
    try {
      await onCreateSearchPreset(presetName.trim(), filterDraft);
      setPresetName("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.savePresetError);
    }
  };

  const handleDeletePreset = async (presetId: string) => {
    setError("");
    try {
      await onDeleteSearchPreset(presetId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : detailCopy.deletePresetError);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">{panelCopy.workspace}</div>
          <h2 className="title" style={{ fontSize: 22 }}>
            {panelCopy.structuredResults}
          </h2>
          <div className="muted" style={{ marginTop: 8 }}>
            {workspaceId}
          </div>
        </div>
        <div className="action-row">
          <button className="button secondary" disabled={!canWriteWorkspace} type="button" onClick={() => onSelectRecord(null)}>
            {panelCopy.newRecord}
          </button>
        </div>
      </div>
      <div className="panel-body">
        <RecordPanelStats
          avoidCount={avoidCount}
          avoidLabel={panelCopy.avoid}
          foodCount={foodCount}
          foodLabel={panelCopy.food}
          visibleRecordCount={records.length}
          visibleRecordsLabel={panelCopy.visibleRecords}
        />

        <RecordSearchPanel
          canWriteWorkspace={canWriteWorkspace}
          currentFilterSummary={summarizeRecordFilterLabel(recordFilter)}
          filterDraft={filterDraft}
          filteringRecords={filteringRecords}
          onApplyFilter={handleApplyFilter}
          onAvoidOnlyChange={(value) =>
            setFilterDraft((current) => ({
              ...current,
              avoidOnly: value,
            }))
          }
          onPresetNameChange={setPresetName}
          onQueryChange={(value) =>
            setFilterDraft((current) => ({
              ...current,
              query: value,
            }))
          }
          onResetFilter={onResetFilter}
          onSavePreset={handleSavePreset}
          onTypeCodeChange={(value) =>
            setFilterDraft((current) => ({
              ...current,
              typeCode: value,
            }))
          }
          panelCopy={panelCopy}
          presetName={presetName}
          savingSearchPreset={savingSearchPreset}
        />
        <SearchPresetList
          applyPresetLabel={panelCopy.applyPreset}
          canWriteWorkspace={canWriteWorkspace}
          deletePresetLabel={panelCopy.deletePreset}
          emptyLabel={panelCopy.noSavedFilters}
          filteringRecords={filteringRecords}
          onApplyPreset={onApplyRecordFilter}
          onDeletePreset={handleDeletePreset}
          presets={searchPresets}
          savedPresetLabel={panelCopy.savedPreset}
          summarizeRecordFilterLabel={summarizeRecordFilterLabel}
        />

        <MapPanel
          records={records}
          selectedRecordId={selectedRecordId}
          onSelectRecord={onSelectRecord}
          filteringRecords={filteringRecords}
          locationFilter={recordFilter}
          onApplyLocationFilter={onApplyLocationFilter}
          draftLocation={canWriteWorkspace ? form.location : null}
          onDraftLocationChange={
            canWriteWorkspace
              ? (nextLocation) =>
                  setForm((prev) => ({
                    ...prev,
                    location: nextLocation,
                  }))
              : undefined
          }
        />

        <form className="record-card form-stack" style={{ marginTop: 20 }} onSubmit={handleSubmit}>
          <div className="eyebrow">{selectedRecord ? panelCopy.editRecord : panelCopy.newManualRecord}</div>
          <label className="field">
            <span className="field-label">{panelCopy.title}</span>
            <input
              className="input"
              disabled={!canWriteWorkspace}
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder={panelCopy.optionalTitle}
            />
          </label>
          <label className="field">
            <span className="field-label">{panelCopy.content}</span>
            <textarea
              className="textarea"
              disabled={!canWriteWorkspace}
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              placeholder={panelCopy.contentPlaceholder}
            />
          </label>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">{panelCopy.type}</span>
              <select
                className="input"
                disabled={!canWriteWorkspace}
                value={form.type_code}
                onChange={(event) => setForm((prev) => ({ ...prev, type_code: event.target.value }))}
              >
                <option value="memo">{panelCopy.memo}</option>
                <option value="food">{panelCopy.food}</option>
                <option value="snack">{panelCopy.snack}</option>
                <option value="bad_experience">{panelCopy.badExperience}</option>
              </select>
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.rating}</span>
              <input
                className="input"
                type="number"
                disabled={!canWriteWorkspace}
                min="1"
                max="5"
                value={form.rating}
                onChange={(event) => setForm((prev) => ({ ...prev, rating: event.target.value }))}
                placeholder="1-5"
              />
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.occurredAt}</span>
              <input
                className="input"
                type="datetime-local"
                disabled={!canWriteWorkspace}
                value={form.occurred_at}
                onChange={(event) => setForm((prev) => ({ ...prev, occurred_at: event.target.value }))}
              />
            </label>
          </div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">{panelCopy.placeName}</span>
              <input
                className="input"
                disabled={!canWriteWorkspace}
                value={form.location.place_name}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, place_name: event.target.value, source: "manual" },
                  }))
                }
                placeholder={panelCopy.placePlaceholder}
              />
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.address}</span>
              <input
                className="input"
                disabled={!canWriteWorkspace}
                value={form.location.address}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, address: event.target.value, source: "manual" },
                  }))
                }
                placeholder={panelCopy.addressPlaceholder}
              />
            </label>
            <label className="checkbox-field">
              <input
                checked={form.is_avoid}
                disabled={!canWriteWorkspace}
                type="checkbox"
                onChange={(event) => setForm((prev) => ({ ...prev, is_avoid: event.target.checked }))}
              />
              <span>{panelCopy.avoidItem}</span>
            </label>
          </div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">{panelCopy.latitude}</span>
              <input
                className="input"
                inputMode="decimal"
                disabled={!canWriteWorkspace}
                value={form.location.latitude}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, latitude: event.target.value, source: "manual" },
                  }))
                }
                placeholder="30.274100"
              />
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.longitude}</span>
              <input
                className="input"
                inputMode="decimal"
                disabled={!canWriteWorkspace}
                value={form.location.longitude}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: { ...prev.location, longitude: event.target.value, source: "manual" },
                  }))
                }
                placeholder="120.155100"
              />
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.locationSource}</span>
              <input className="input" disabled value={form.location.source || "manual"} />
            </label>
          </div>
          <LocationReviewPanel
            canWriteWorkspace={canWriteWorkspace}
            formatHistoryTimestampLabel={formatHistoryTimestampLabel}
            formatReviewStatusLabel={formatReviewStatusLabel}
            hasSelectedRecord={Boolean(selectedRecord)}
            onMarkConfirmed={() =>
              setLocationReviewForm((prev) => ({
                ...prev,
                status: "confirmed",
              }))
            }
            onMarkNeedsReview={() =>
              setLocationReviewForm((prev) => ({
                ...prev,
                status: "needs_review",
              }))
            }
            onNoteChange={(value) =>
              setLocationReviewForm((prev) => ({
                ...prev,
                note: value,
              }))
            }
            onResetReview={() =>
              setLocationReviewForm({
                status: "pending",
                note: "",
              })
            }
            onStatusChange={(value) =>
              setLocationReviewForm((prev) => ({
                ...prev,
                status: value,
              }))
            }
            panelCopy={panelCopy}
            reviewForm={locationReviewForm}
            selectedLocationHistory={selectedLocationHistory}
            selectedLocationReview={selectedLocationReview}
            summarizeHistoryActionLabel={summarizeHistoryActionLabel}
          />
          {error ? <div className="notice error">{error}</div> : null}
          <div className="action-row">
            <button className="button" disabled={saving || !canWriteWorkspace} type="submit">
              {saving ? panelCopy.saving : selectedRecord ? panelCopy.updateRecord : panelCopy.createRecord}
            </button>
            {selectedRecord ? (
              <button className="button secondary" disabled={deleting || !canWriteWorkspace} onClick={handleDelete} type="button">
                {deleting ? panelCopy.deleting : panelCopy.deleteRecord}
              </button>
            ) : null}
          </div>
          {selectedRecord ? (
            <>
              <label className="field">
                <span className="field-label">{panelCopy.uploadAttachment}</span>
                <input disabled={!canWriteWorkspace} onChange={handleUpload} type="file" />
              </label>
              {uploading ? <div className="notice">{panelCopy.uploadingMedia}</div> : null}
              <MediaStorageOverview
                allTrackedFilesPresentLabel={panelCopy.allTrackedFilesPresent}
                formatFileCountLabel={formatFileCountLabel}
                localLabel={panelCopy.local}
                mediaAssetCount={mediaAssets.length}
                mediaProcessingOverview={mediaProcessingOverview}
                mediaStorageSummary={mediaStorageSummary}
                missingFilesLabel={panelCopy.missingFiles}
                needsAttentionLabel={panelCopy.needsAttention}
                processingCompletedLabel={panelCopy.processingCompleted}
                queuedLabel={panelCopy.queued}
                queueStateLabel={panelCopy.queueState}
                remoteLabel={panelCopy.remote}
                selectedRecordMediaSizeLabel={formatByteCount(selectedRecordMediaSizeBytes)}
                storageHealthLabel={panelCopy.storageHealth}
                storageMixLabel={panelCopy.storageMix}
                thisRecordMediaLabel={panelCopy.thisRecordMedia}
                workspaceStorageLabel={panelCopy.workspaceStorage}
              />
              {mediaProcessingOverview ? (
                <>
                  <RecentMediaIssuesPanel
                    canWriteWorkspace={canWriteWorkspace}
                    formatHistoryTimestampLabel={formatHistoryTimestampLabel}
                    locale={locale}
                    mediaIssueCopy={mediaIssueCopy}
                    mediaProcessingOverview={mediaProcessingOverview}
                    onRetryMediaProcessing={handleRetryMediaProcessing}
                    retryingMediaId={retryingMediaId}
                    workspaceId={workspaceId}
                  />
                  <DeadLetterRecoveryPanel
                    bulkRetryingDeadLetter={bulkRetryingDeadLetter}
                    canWriteWorkspace={canWriteWorkspace}
                    formatHistoryTimestampLabel={formatHistoryTimestampLabel}
                    locale={locale}
                    mediaDeadLetterOverview={mediaDeadLetterOverview}
                    mediaIssueCopy={mediaIssueCopy}
                    onBulkRetryAll={() => handleBulkRetryDeadLetter("all")}
                    onBulkRetrySelected={() => handleBulkRetryDeadLetter("selected")}
                    onClearSelection={handleClearDeadLetterSelection}
                    onRetryMediaProcessing={handleRetryMediaProcessing}
                    onSelectAll={handleSelectAllDeadLetter}
                    onToggleSelection={handleToggleDeadLetterSelection}
                    retryingMediaId={retryingMediaId}
                    selectedDeadLetterIds={selectedDeadLetterIds}
                    workspaceId={workspaceId}
                  />
                </>
              ) : null}
              <MediaAssetSection
                authToken={authToken}
                canWriteWorkspace={canWriteWorkspace}
                deletingMediaId={deletingMediaId}
                downloadingMediaId={downloadingMediaId}
                formatHistoryTimestampLabel={formatHistoryTimestampLabel}
                largestFilePrefixLabel={detailCopy.largestFilePrefix}
                largestItemName={mediaStorageSummary?.largest_item_name ?? null}
                largestItemSizeLabel={mediaStorageSummary?.largest_item_size_label ?? null}
                mediaAssets={mediaAssets}
                mediaIssueCopy={mediaIssueCopy}
                noMediaLabel={detailCopy.noMedia}
                onDeleteMediaAsset={handleDeleteMediaAsset}
                onDownloadMedia={handleDownloadMedia}
                onRefreshMedia={handleRefreshMedia}
                onRetryMediaProcessing={handleRetryMediaProcessing}
                refreshingMediaId={refreshingMediaId}
                retryingMediaId={retryingMediaId}
                workspaceId={workspaceId}
              />

              <RecordReminderPanel
                canWriteWorkspace={canWriteWorkspace}
                channelInApp={detailCopy.channelInApp}
                channelLabel={detailCopy.channelLabel}
                createReminderLabel={detailCopy.createReminder}
                deleteReminderLabel={detailCopy.deleteReminder}
                enableReminderLabel={detailCopy.enableReminder}
                formatReminderEnabledLabel={formatReminderEnabledLabel}
                formatReminderStatusLabel={formatReminderStatusLabel}
                formatReminderTimestampLabel={formatReminderTimestampLabel}
                markReminderDoneLabel={detailCopy.markReminderDone}
                noRemindersLabel={detailCopy.noReminders}
                onCreateReminder={handleCreateReminderSubmit}
                onDeleteReminder={onDeleteReminder}
                onMarkReminderDone={(reminder) =>
                  onUpdateReminder(reminder.id, {
                    status: "completed",
                    is_enabled: false,
                  })
                }
                onMessageChange={(value) =>
                  setReminderForm((prev) => ({
                    ...prev,
                    message: value,
                  }))
                }
                onRemindAtChange={(value) =>
                  setReminderForm((prev) => ({
                    ...prev,
                    remind_at: value,
                  }))
                }
                onTitleChange={(value) =>
                  setReminderForm((prev) => ({
                    ...prev,
                    title: value,
                  }))
                }
                onToggleReminderEnabled={(reminder) =>
                  onUpdateReminder(reminder.id, {
                    is_enabled: !reminder.is_enabled,
                  })
                }
                pauseReminderLabel={detailCopy.pauseReminder}
                reminderForm={reminderForm}
                reminderNoteLabel={detailCopy.reminderNoteLabel}
                reminderNotePlaceholder={detailCopy.reminderNotePlaceholder}
                reminderSectionDescription={detailCopy.reminderSectionDescription}
                reminderSectionTitle={detailCopy.reminderSectionTitle}
                reminderTitleLabel={detailCopy.reminderTitleLabel}
                reminderTitlePlaceholder={detailCopy.reminderTitlePlaceholder}
                remindAtLabel={detailCopy.remindAtLabel}
                reminders={reminders}
                savingReminder={savingReminder}
                savingReminderLabel={detailCopy.savingReminder}
                selectedRecordTitle={selectedRecord?.title ?? null}
                untitledReminderLabel={detailCopy.untitledReminder}
              />
            </>
          ) : null}
        </form>
        <RecordResultsView
          avoidLabel={detailCopy.avoidLabel}
          flatListViewLabel={detailCopy.flatListView}
          formatAvoidCountLabel={formatAvoidCountLabel}
          formatRecordTimestampLabel={formatRecordTimestampLabel}
          formatReviewStatusLabel={formatReviewStatusLabel}
          formatTimelineCountLabel={formatTimelineCountLabel}
          formatTimelineDateLabel={formatTimelineDateLabel}
          mapPrefixLabel={detailCopy.mapPrefix}
          noContentLabel={detailCopy.noContent}
          noRecordsLabel={detailCopy.noRecords}
          onSelectRecord={onSelectRecord}
          onViewModeChange={setViewMode}
          ratingPrefixLabel={detailCopy.ratingPrefix}
          records={records}
          selectedRecordId={selectedRecordId}
          timelineDayLabel={detailCopy.timelineDayLabel}
          timelineDays={timelineDays}
          timelineViewLabel={detailCopy.timelineView}
          unknownPlaceLabel={detailCopy.unknownPlace}
          untitledRecordLabel={detailCopy.untitledRecord}
          viewMode={viewMode}
        />
      </div>
    </section>
  );
}

