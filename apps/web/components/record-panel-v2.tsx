"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { fetchMediaBlob } from "../lib/api";
import { useStoredLocale } from "../lib/locale";
import { formatByteCount } from "../lib/record-panel-format";
import {
  getMediaIssueAction,
  getMediaIssueLabel,
  getProcessingStatusLabel,
  getRetryStateLabel,
} from "../lib/media-issue-display";
import {
  buildMediaIssueSettingsHref,
  canRetryMediaIssue,
} from "../lib/record-panel-media";
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
import { MediaAssetCard } from "./media-asset-card";
import { RecordSummaryCard } from "./record-summary-card";
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
        <div className="stats-grid">
          <div className="stat-card">
            <div className="eyebrow">{panelCopy.visibleRecords}</div>
            <div className="title" style={{ fontSize: 20 }}>
              {records.length}
            </div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">{panelCopy.food}</div>
            <div className="title" style={{ fontSize: 20 }}>
              {foodCount}
            </div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">{panelCopy.avoid}</div>
            <div className="title" style={{ fontSize: 20 }}>
              {avoidCount}
            </div>
          </div>
        </div>

        <div className="record-card form-stack" style={{ marginTop: 20 }}>
          <div className="eyebrow">{panelCopy.advancedSearch}</div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">{panelCopy.textQuery}</span>
              <input
                className="input"
                value={filterDraft.query}
                onChange={(event) =>
                  setFilterDraft((current) => ({
                    ...current,
                    query: event.target.value,
                  }))
                }
                placeholder={panelCopy.textQueryPlaceholder}
              />
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.type}</span>
              <select
                className="input"
                value={filterDraft.typeCode}
                onChange={(event) =>
                  setFilterDraft((current) => ({
                    ...current,
                    typeCode: event.target.value,
                  }))
                }
              >
                <option value="all">{panelCopy.all}</option>
                <option value="memo">{panelCopy.memo}</option>
                <option value="food">{panelCopy.food}</option>
                <option value="snack">{panelCopy.snack}</option>
                <option value="bad_experience">{panelCopy.badExperience}</option>
              </select>
            </label>
            <label className="field">
              <span className="field-label">{panelCopy.avoid}</span>
              <select
                className="input"
                value={filterDraft.avoidOnly}
                onChange={(event) =>
                  setFilterDraft((current) => ({
                    ...current,
                    avoidOnly: event.target.value as RecordFilterState["avoidOnly"],
                  }))
                }
              >
                <option value="all">{panelCopy.allRecords}</option>
                <option value="avoid">{panelCopy.avoidOnlyOption}</option>
                <option value="normal">{panelCopy.nonAvoidOnly}</option>
              </select>
            </label>
          </div>
          <div className="action-row">
            <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void handleApplyFilter()}>
              {filteringRecords ? panelCopy.filtering : panelCopy.applyAdvancedFilter}
            </button>
            <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onResetFilter()}>
              {panelCopy.resetList}
            </button>
          </div>
          <div className="muted">{summarizeRecordFilterLabel(recordFilter)}</div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">{panelCopy.presetName}</span>
              <input
                className="input"
                disabled={!canWriteWorkspace}
                value={presetName}
                onChange={(event) => setPresetName(event.target.value)}
                placeholder={panelCopy.presetPlaceholder}
              />
            </label>
            <div className="field" style={{ alignSelf: "end" }}>
              <button
                className="button secondary"
                disabled={savingSearchPreset || !canWriteWorkspace}
                type="button"
                onClick={() => void handleSavePreset()}
              >
                {savingSearchPreset ? panelCopy.savingPreset : panelCopy.saveCurrentFilter}
              </button>
            </div>
          </div>
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
        </div>

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
          <div className="record-card form-stack">
            <div className="eyebrow">{panelCopy.locationReview}</div>
            <div className="muted">
              {panelCopy.locationReviewDescription}
            </div>
            <div className="inline-fields">
              <label className="field">
                <span className="field-label">{panelCopy.reviewStatus}</span>
                <select
                  className="input"
                  disabled={!canWriteWorkspace}
                  value={locationReviewForm.status}
                  onChange={(event) =>
                    setLocationReviewForm((prev) => ({
                      ...prev,
                      status: event.target.value,
                    }))
                  }
                >
                  <option value="pending">{panelCopy.pending}</option>
                  <option value="confirmed">{panelCopy.confirmed}</option>
                  <option value="needs_review">{panelCopy.needsReview}</option>
                </select>
              </label>
              <label className="field" style={{ gridColumn: "span 2" }}>
                <span className="field-label">{panelCopy.reviewNote}</span>
                <input
                  className="input"
                  disabled={!canWriteWorkspace}
                  value={locationReviewForm.note}
                  onChange={(event) =>
                    setLocationReviewForm((prev) => ({
                      ...prev,
                      note: event.target.value,
                    }))
                  }
                  placeholder={panelCopy.reviewNotePlaceholder}
                />
              </label>
            </div>
            <div className="action-row">
              <button
                className="button secondary"
                type="button"
                disabled={!canWriteWorkspace}
                onClick={() =>
                  setLocationReviewForm((prev) => ({
                    ...prev,
                    status: "confirmed",
                  }))
                }
              >
                {panelCopy.markConfirmed}
              </button>
              <button
                className="button secondary"
                type="button"
                disabled={!canWriteWorkspace}
                onClick={() =>
                  setLocationReviewForm((prev) => ({
                    ...prev,
                    status: "needs_review",
                  }))
                }
              >
                {panelCopy.markNeedsReview}
              </button>
              <button
                className="button secondary"
                type="button"
                disabled={!canWriteWorkspace}
                onClick={() =>
                  setLocationReviewForm({
                    status: "pending",
                    note: "",
                  })
                }
              >
                {panelCopy.resetReview}
              </button>
            </div>
            {selectedRecord && selectedLocationReview ? (
              <div className="detail-grid">
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.storedStatus}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {formatReviewStatusLabel(selectedLocationReview.status)}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.lastUpdated}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {formatHistoryTimestampLabel(selectedLocationReview.updated_at)}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.confirmedAt}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {selectedLocationReview.confirmed_at
                      ? formatHistoryTimestampLabel(selectedLocationReview.confirmed_at)
                      : panelCopy.notConfirmed}
                  </div>
                </div>
              </div>
            ) : null}
            {selectedRecord ? (
              <div className="history-list">
                {selectedLocationHistory.length ? (
                  selectedLocationHistory.slice(0, 6).map((entry) => (
                    <article className="history-item" key={`${entry.changed_at}-${entry.action_code}`}>
                      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div className="eyebrow">{summarizeHistoryActionLabel(entry)}</div>
                          <div style={{ marginTop: 8, fontWeight: 600 }}>
                            {entry.place_name || entry.address || panelCopy.unnamedLocation}
                          </div>
                        </div>
                        <div className="muted">{formatHistoryTimestampLabel(entry.changed_at)}</div>
                      </div>
                      <div className="muted" style={{ marginTop: 8 }}>
                        {entry.address || panelCopy.noAddress}
                      </div>
                      {(entry.latitude ?? null) !== null && (entry.longitude ?? null) !== null ? (
                        <div className="muted" style={{ marginTop: 8 }}>
                          {entry.latitude}, {entry.longitude}
                        </div>
                      ) : null}
                      <div className="tag-row">
                        {entry.source ? <span className="tag">{entry.source}</span> : null}
                        {entry.review_status ? <span className="tag">{formatReviewStatusLabel(entry.review_status)}</span> : null}
                      </div>
                      {entry.review_note ? (
                        <div className="muted" style={{ marginTop: 8 }}>
                          {entry.review_note}
                        </div>
                      ) : null}
                    </article>
                  ))
                ) : (
                  <div className="notice">
                    {panelCopy.noLocationHistory}
                  </div>
                )}
              </div>
            ) : null}
          </div>
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
              <div className="detail-grid" style={{ marginBottom: 16 }}>
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.thisRecordMedia}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {formatFileCountLabel(mediaAssets.length)} / {formatByteCount(selectedRecordMediaSizeBytes)}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.workspaceStorage}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {mediaStorageSummary
                      ? `${formatFileCountLabel(mediaStorageSummary.total_count)} / ${mediaStorageSummary.total_size_label}`
                      : "-"}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{panelCopy.storageHealth}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {mediaStorageSummary
                      ? mediaStorageSummary.missing_file_count
                        ? `${mediaStorageSummary.missing_file_count} ${panelCopy.missingFiles}`
                        : panelCopy.allTrackedFilesPresent
                      : "-"}
                  </div>
                </div>
              </div>
              {mediaProcessingOverview ? (
                <>
                  <div className="detail-grid" style={{ marginBottom: 16 }}>
                    <div className="subtle-card">
                      <div className="eyebrow">{panelCopy.processingCompleted}</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.completed_count}/{mediaProcessingOverview.total_count}
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">{panelCopy.needsAttention}</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.failed_count + mediaProcessingOverview.deferred_count}
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">{panelCopy.queueState}</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.pending_count + mediaProcessingOverview.processing_count} {panelCopy.queued}
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">{panelCopy.storageMix}</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.local_item_count} {panelCopy.local} / {mediaProcessingOverview.remote_item_count} {panelCopy.remote}
                      </div>
                    </div>
                  </div>
                  <div className="tag-row" style={{ marginBottom: 16 }}>
                    {Object.entries(mediaProcessingOverview.by_storage_provider).map(([providerCode, count]) => (
                      <span className="tag" key={providerCode}>
                        {providerCode}: {count}
                      </span>
                    ))}
                  </div>
                    <div className="record-card form-stack" style={{ marginBottom: 16 }}>
                    <div className="eyebrow">{mediaIssueCopy.recentIssuesTitle}</div>
                    <div className="muted">
                      {mediaIssueCopy.recentIssuesDescription}
                    </div>
                    {mediaProcessingOverview.recent_issues.length ? (
                      <div className="record-list compact-list" style={{ marginTop: 16 }}>
                        {mediaProcessingOverview.recent_issues.map((issue) => (
                          <article className="record-card" key={issue.media_id}>
                            <div className="eyebrow">{issue.media_type}</div>
                            <div>{issue.original_filename}</div>
                            <div className="tag-row">
                              <span className="tag">{getProcessingStatusLabel(locale, issue.processing_status)}</span>
                              <span className="tag">{issue.storage_provider}</span>
                              {issue.processing_source ? <span className="tag">{issue.processing_source}</span> : null}
                              {issue.remote_fetch_status ? (
                                <span className="tag">{mediaIssueCopy.fetchPrefix} {issue.remote_fetch_status}</span>
                              ) : null}
                              {issue.extraction_mode ? <span className="tag">{issue.extraction_mode}</span> : null}
                              {issue.processing_retry_state ? (
                                <span className="tag">
                                  {mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, issue.processing_retry_state)}
                                </span>
                              ) : null}
                              {getMediaIssueLabel(locale, issue) ? (
                                <span className="tag">{getMediaIssueLabel(locale, issue)}</span>
                              ) : null}
                              {typeof issue.processing_retry_count === "number" ? (
                                <span className="tag">
                                  {mediaIssueCopy.retries} {issue.processing_retry_count}
                                  {typeof issue.processing_retry_max_attempts === "number"
                                    ? `/${issue.processing_retry_max_attempts}`
                                    : ""}
                                </span>
                              ) : null}
                            </div>
                            <div className="muted" style={{ marginTop: 8 }}>
                              {mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(issue.processing_last_attempt_at)}
                            </div>
                            {issue.processing_last_failure_at ? (
                              <div className="muted" style={{ marginTop: 6 }}>
                                {mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(issue.processing_last_failure_at)}
                              </div>
                            ) : null}
                            {issue.processing_retry_next_attempt_at ? (
                              <div className="muted" style={{ marginTop: 6 }}>
                                {mediaIssueCopy.nextRetry}: {formatHistoryTimestampLabel(issue.processing_retry_next_attempt_at)}
                              </div>
                            ) : null}
                            {getMediaIssueAction(locale, issue).label ? (
                              <div className="notice" style={{ marginTop: 10 }}>
                                {getMediaIssueAction(locale, issue).label}
                                {getMediaIssueAction(locale, issue).detail ? `: ${getMediaIssueAction(locale, issue).detail}` : ""}
                              </div>
                            ) : null}
                            {canWriteWorkspace || buildMediaIssueSettingsHref(workspaceId, issue) ? (
                              <div className="action-row" style={{ marginTop: 10 }}>
                                {canWriteWorkspace && canRetryMediaIssue(issue) ? (
                                  <button
                                    className="button secondary"
                                    disabled={retryingMediaId === issue.media_id}
                                    type="button"
                                    onClick={() => void handleRetryMediaProcessing(issue.media_id)}
                                  >
                                    {retryingMediaId === issue.media_id ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
                                  </button>
                                ) : null}
                                {buildMediaIssueSettingsHref(workspaceId, issue) ? (
                                  <Link
                                    className="button secondary"
                                    href={buildMediaIssueSettingsHref(workspaceId, issue) ?? "#"}
                                  >
                                    {mediaIssueCopy.openSettings}
                                  </Link>
                                ) : null}
                              </div>
                            ) : null}
                            {issue.processing_error ? (
                              <div className="notice error" style={{ marginTop: 10 }}>
                                {issue.processing_error}
                              </div>
                            ) : null}
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="notice" style={{ marginTop: 16 }}>
                        {mediaIssueCopy.noRecentIssues}
                      </div>
                    )}
                  </div>
                  <div className="record-card form-stack" style={{ marginBottom: 16 }}>
                    <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div className="eyebrow">{mediaIssueCopy.deadLetterTitle}</div>
                        <div className="muted" style={{ marginTop: 8 }}>
                          {mediaIssueCopy.deadLetterDescription}
                        </div>
                      </div>
                      <div className="tag-row">
                        <span className="tag">
                          {mediaDeadLetterOverview?.total_count ?? 0} {mediaIssueCopy.itemSuffix}
                        </span>
                        {mediaDeadLetterOverview
                          ? Object.entries(mediaDeadLetterOverview.by_retry_state).map(([retryState, count]) => (
                              <span className="tag" key={retryState}>
                                {getRetryStateLabel(locale, retryState)}: {count}
                              </span>
                            ))
                          : null}
                        {mediaDeadLetterOverview
                          ? Object.entries(mediaDeadLetterOverview.by_issue_category).map(([issueCategory, count]) => (
                              <span className="tag" key={issueCategory}>
                                {getMediaIssueLabel(locale, { issue_category: issueCategory, issue_label: null })}: {count}
                              </span>
                            ))
                          : null}
                      </div>
                    </div>
                    {mediaDeadLetterOverview?.items.length ? (
                      <>
                        <div className="action-row">
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter}
                            type="button"
                            onClick={handleSelectAllDeadLetter}
                          >
                            {mediaIssueCopy.selectVisible}
                          </button>
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length}
                            type="button"
                            onClick={handleClearDeadLetterSelection}
                          >
                            {mediaIssueCopy.clearSelection}
                          </button>
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length}
                            type="button"
                            onClick={() => void handleBulkRetryDeadLetter("selected")}
                          >
                            {bulkRetryingDeadLetter
                              ? mediaIssueCopy.retrying
                              : `${mediaIssueCopy.retrySelectedPrefix} (${selectedDeadLetterIds.length})`}
                          </button>
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter}
                            type="button"
                            onClick={() => void handleBulkRetryDeadLetter("all")}
                          >
                            {bulkRetryingDeadLetter ? mediaIssueCopy.retrying : mediaIssueCopy.retryAll}
                          </button>
                        </div>
                        <div className="record-list compact-list">
                          {mediaDeadLetterOverview.items.map((item) => (
                            <article className="record-card" key={item.media_id}>
                              <label className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                  <input
                                    checked={selectedDeadLetterIds.includes(item.media_id)}
                                    disabled={bulkRetryingDeadLetter || !canRetryMediaIssue(item)}
                                    type="checkbox"
                                    onChange={(event) =>
                                      handleToggleDeadLetterSelection(item.media_id, event.target.checked)
                                    }
                                  />
                                  <div>
                                    <div className="eyebrow">{item.media_type}</div>
                                    <div>{item.original_filename}</div>
                                  </div>
                                </div>
                                <div className="tag-row">
                                  <span className="tag">{getProcessingStatusLabel(locale, item.processing_status)}</span>
                                  <span className="tag">{item.storage_provider}</span>
                                  {item.processing_retry_state ? (
                                    <span className="tag">
                                      {mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, item.processing_retry_state)}
                                    </span>
                                  ) : null}
                                  {getMediaIssueLabel(locale, item) ? (
                                    <span className="tag">{getMediaIssueLabel(locale, item)}</span>
                                  ) : null}
                                </div>
                              </label>
                              <div className="muted" style={{ marginTop: 8 }}>
                                {mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(item.processing_last_attempt_at)}
                              </div>
                              {item.processing_last_failure_at ? (
                                <div className="muted" style={{ marginTop: 6 }}>
                                  {mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(item.processing_last_failure_at)}
                                </div>
                              ) : null}
                              {typeof item.processing_retry_count === "number" ? (
                                <div className="muted" style={{ marginTop: 6 }}>
                                  {mediaIssueCopy.retryBudgetUsed}: {item.processing_retry_count}
                                  {typeof item.processing_retry_max_attempts === "number"
                                    ? ` / ${item.processing_retry_max_attempts}`
                                    : ""}
                                </div>
                              ) : null}
                              {getMediaIssueAction(locale, item).label ? (
                                <div className="notice" style={{ marginTop: 10 }}>
                                  {getMediaIssueAction(locale, item).label}
                                  {getMediaIssueAction(locale, item).detail ? `: ${getMediaIssueAction(locale, item).detail}` : ""}
                                </div>
                              ) : null}
                              {canWriteWorkspace || buildMediaIssueSettingsHref(workspaceId, item) ? (
                                <div className="action-row" style={{ marginTop: 10 }}>
                                  {canWriteWorkspace && canRetryMediaIssue(item) ? (
                                    <button
                                      className="button secondary"
                                      disabled={retryingMediaId === item.media_id}
                                      type="button"
                                      onClick={() => void handleRetryMediaProcessing(item.media_id)}
                                    >
                                      {retryingMediaId === item.media_id ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
                                    </button>
                                  ) : null}
                                  {buildMediaIssueSettingsHref(workspaceId, item) ? (
                                    <Link
                                      className="button secondary"
                                      href={buildMediaIssueSettingsHref(workspaceId, item) ?? "#"}
                                    >
                                      {mediaIssueCopy.openSettings}
                                    </Link>
                                  ) : null}
                                </div>
                              ) : null}
                              {item.processing_error ? (
                                <div className="notice error" style={{ marginTop: 10 }}>
                                  {item.processing_error}
                                </div>
                              ) : null}
                            </article>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="notice">{mediaIssueCopy.noDeadLetter}</div>
                    )}
                  </div>
                </>
              ) : null}
              {mediaStorageSummary?.largest_item_name ? (
                <div className="muted" style={{ marginBottom: 16 }}>
                  {detailCopy.largestFilePrefix}: {mediaStorageSummary.largest_item_name} ({mediaStorageSummary.largest_item_size_label})
                </div>
              ) : null}
              <div className="record-list compact-list">
                {mediaAssets.length ? (
                  mediaAssets.map((asset) => (
                    <MediaAssetCard
                      asset={asset}
                      authToken={authToken}
                      canWriteWorkspace={canWriteWorkspace}
                      deletingMediaId={deletingMediaId}
                      downloadingMediaId={downloadingMediaId}
                      formatHistoryTimestampLabel={formatHistoryTimestampLabel}
                      key={asset.id}
                      mediaIssueCopy={mediaIssueCopy}
                      onDeleteMediaAsset={handleDeleteMediaAsset}
                      onDownloadMedia={handleDownloadMedia}
                      onRefreshMedia={handleRefreshMedia}
                      onRetryMediaProcessing={handleRetryMediaProcessing}
                      refreshingMediaId={refreshingMediaId}
                      retryingMediaId={retryingMediaId}
                      workspaceId={workspaceId}
                    />
                  ))
                ) : (
                  <div className="notice">{detailCopy.noMedia}</div>
                )}
              </div>

              <div className="record-card form-stack">
                <div className="eyebrow">{detailCopy.reminderSectionTitle}</div>
                <div className="muted">
                  {detailCopy.reminderSectionDescription}
                </div>
                <div className="form-stack">
                  <div className="inline-fields">
                    <label className="field">
                      <span className="field-label">{detailCopy.reminderTitleLabel}</span>
                      <input
                        className="input"
                        disabled={!canWriteWorkspace}
                        value={reminderForm.title}
                        onChange={(event) =>
                          setReminderForm((prev) => ({
                            ...prev,
                            title: event.target.value,
                          }))
                        }
                        placeholder={detailCopy.reminderTitlePlaceholder}
                      />
                    </label>
                    <label className="field">
                      <span className="field-label">{detailCopy.remindAtLabel}</span>
                      <input
                        className="input"
                        type="datetime-local"
                        disabled={!canWriteWorkspace}
                        value={reminderForm.remind_at}
                        onChange={(event) =>
                          setReminderForm((prev) => ({
                            ...prev,
                            remind_at: event.target.value,
                          }))
                        }
                      />
                    </label>
                    <label className="field">
                      <span className="field-label">{detailCopy.channelLabel}</span>
                      <input className="input" disabled value={detailCopy.channelInApp} />
                    </label>
                  </div>
                  <label className="field">
                    <span className="field-label">{detailCopy.reminderNoteLabel}</span>
                    <textarea
                      className="textarea"
                      disabled={!canWriteWorkspace}
                      value={reminderForm.message}
                      onChange={(event) =>
                        setReminderForm((prev) => ({
                          ...prev,
                          message: event.target.value,
                        }))
                      }
                      placeholder={detailCopy.reminderNotePlaceholder}
                    />
                  </label>
                  <div className="action-row">
                    <button
                      className="button secondary"
                      disabled={savingReminder || !canWriteWorkspace}
                      type="button"
                      onClick={() => void handleCreateReminderSubmit()}
                    >
                      {savingReminder ? detailCopy.savingReminder : detailCopy.createReminder}
                    </button>
                  </div>
                </div>
                <div className="record-list compact-list">
                  {reminders.length ? (
                    reminders.map((reminder) => (
                      <article className="record-card" key={reminder.id}>
                        <div className="eyebrow">{reminder.channel_code}</div>
                        <h4 style={{ margin: "8px 0 6px", fontSize: 18 }}>
                          {reminder.title || selectedRecord.title || detailCopy.untitledReminder}
                        </h4>
                        <div className="muted">{formatReminderTimestampLabel(reminder.remind_at)}</div>
                        {reminder.message ? (
                          <p style={{ margin: "10px 0 0", lineHeight: 1.6 }}>{reminder.message}</p>
                        ) : null}
                        <div className="tag-row">
                          <span className="tag">{formatReminderStatusLabel(reminder.status)}</span>
                          <span className="tag">{formatReminderEnabledLabel(reminder.is_enabled)}</span>
                        </div>
                        <div className="action-row" style={{ marginTop: 12 }}>
                          <button
                            className="button secondary"
                            type="button"
                            disabled={!canWriteWorkspace}
                            onClick={() =>
                              void onUpdateReminder(reminder.id, {
                                is_enabled: !reminder.is_enabled,
                              })
                            }
                          >
                            {reminder.is_enabled ? detailCopy.pauseReminder : detailCopy.enableReminder}
                          </button>
                          {reminder.status !== "completed" ? (
                            <button
                              className="button secondary"
                              type="button"
                              disabled={!canWriteWorkspace}
                              onClick={() =>
                                void onUpdateReminder(reminder.id, {
                                  status: "completed",
                                  is_enabled: false,
                                })
                              }
                            >
                              {detailCopy.markReminderDone}
                            </button>
                          ) : null}
                          <button
                            className="button secondary"
                            type="button"
                            disabled={!canWriteWorkspace}
                            onClick={() => void onDeleteReminder(reminder.id)}
                          >
                            {detailCopy.deleteReminder}
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="notice">{detailCopy.noReminders}</div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </form>

        <div style={{ marginTop: 20 }} className="action-row">
          <button
            className={viewMode === "timeline" ? "button" : "button secondary"}
            type="button"
            onClick={() => setViewMode("timeline")}
          >
            {detailCopy.timelineView}
          </button>
          <button
            className={viewMode === "list" ? "button" : "button secondary"}
            type="button"
            onClick={() => setViewMode("list")}
          >
            {detailCopy.flatListView}
          </button>
        </div>

        {viewMode === "timeline" ? (
          <div style={{ marginTop: 20 }} className="record-list">
            {timelineDays.length ? (
              timelineDays.map((day) => (
                <section className="record-card" key={day.date}>
                  <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div className="eyebrow">{detailCopy.timelineDayLabel}</div>
                      <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{formatTimelineDateLabel(day.date)}</h3>
                      <div className="muted">
                        {formatTimelineCountLabel(day.count)}
                      </div>
                    </div>
                    <div className="tag-row" style={{ marginTop: 0, justifyContent: "flex-end" }}>
                      <span className="tag">{day.date}</span>
                      {day.avoid_count ? <span className="tag">{formatAvoidCountLabel(day.avoid_count)}</span> : null}
                    </div>
                  </div>
                  {day.top_places.length ? (
                    <div className="tag-row" style={{ marginTop: 14 }}>
                      {day.top_places.map((place) => (
                        <span className="tag" key={place}>
                          {place}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="record-list compact-list" style={{ marginTop: 14 }}>
                    {day.items.map((record) => (
                      <RecordSummaryCard
                        avoidLabel={detailCopy.avoidLabel}
                        formatRecordTimestampLabel={formatRecordTimestampLabel}
                        formatReviewStatusLabel={formatReviewStatusLabel}
                        isSelected={record.id === selectedRecordId}
                        key={record.id}
                        mapPrefixLabel={detailCopy.mapPrefix}
                        noContentLabel={detailCopy.noContent}
                        onSelectRecord={onSelectRecord}
                        ratingPrefixLabel={detailCopy.ratingPrefix}
                        record={record}
                        unknownPlaceLabel={detailCopy.unknownPlace}
                        untitledRecordLabel={detailCopy.untitledRecord}
                      />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="notice">
                {detailCopy.noRecords}
              </div>
            )}
          </div>
        ) : (
          <div style={{ marginTop: 20 }} className="record-list">
            {records.length ? (
              records.map((record) => (
                <RecordSummaryCard
                  avoidLabel={detailCopy.avoidLabel}
                  formatRecordTimestampLabel={formatRecordTimestampLabel}
                  formatReviewStatusLabel={formatReviewStatusLabel}
                  isSelected={record.id === selectedRecordId}
                  key={record.id}
                  mapPrefixLabel={detailCopy.mapPrefix}
                  noContentLabel={detailCopy.noContent}
                  onSelectRecord={onSelectRecord}
                  ratingPrefixLabel={detailCopy.ratingPrefix}
                  record={record}
                  unknownPlaceLabel={detailCopy.unknownPlace}
                  untitledRecordLabel={detailCopy.untitledRecord}
                />
              ))
            ) : (
              <div className="notice">
                {detailCopy.noRecords}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

