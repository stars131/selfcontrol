"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { fetchMediaBlob } from "../lib/api";
import { MapPanel, type LocationDraft } from "./map-panel";
import { MediaPreview } from "./media-preview";
import { readLocationHistory, readLocationInfo, readLocationReview } from "../lib/location";
import type {
  LocationHistoryEntry,
  LocationReview,
  MediaAsset,
  MediaDeadLetterOverview,
  MediaProcessingIssue,
  MediaProcessingOverview,
  MediaStorageSummary,
  RecordFilterState,
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  TimelineDay,
} from "../lib/types";

type RecordFormState = {
  title: string;
  content: string;
  type_code: string;
  rating: string;
  occurred_at: string;
  is_avoid: boolean;
  location: LocationDraft;
};

type ReminderFormState = {
  title: string;
  message: string;
  remind_at: string;
};

type LocationReviewFormState = {
  status: string;
  note: string;
};

type ViewMode = "timeline" | "list";

function createEmptyLocation(): LocationDraft {
  return {
    place_name: "",
    address: "",
    latitude: "",
    longitude: "",
    source: "manual",
  };
}

function createEmptyForm(): RecordFormState {
  return {
    title: "",
    content: "",
    type_code: "memo",
    rating: "",
    occurred_at: "",
    is_avoid: false,
    location: createEmptyLocation(),
  };
}

function readLocation(record: RecordItem | null): LocationDraft {
  const location = readLocationInfo(record?.extra_data);
  return {
    place_name: location.place_name,
    address: location.address,
    latitude: location.latitude === null ? "" : String(location.latitude),
    longitude: location.longitude === null ? "" : String(location.longitude),
    source: location.source,
  };
}

function readLocationReviewForm(record: RecordItem | null): LocationReviewFormState {
  const review = readLocationReview(record?.extra_data);
  return {
    status: review?.status || "pending",
    note: review?.note || "",
  };
}

function formatDatetimeInput(value?: string | null): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 16);
}

function formatRecordTimestamp(record: RecordItem): string {
  const rawValue = record.occurred_at || record.created_at;
  const date = new Date(rawValue);
  return Number.isNaN(date.getTime()) ? rawValue : date.toLocaleString();
}

function formatTimelineDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

function formatReviewStatus(value?: string | null): string {
  if (value === "confirmed") {
    return "confirmed";
  }
  if (value === "needs_review") {
    return "needs review";
  }
  return "pending";
}

function createEmptyReminderForm(): ReminderFormState {
  return {
    title: "",
    message: "",
    remind_at: "",
  };
}

function formatReminderTimestamp(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function formatHistoryTimestamp(value?: string | null): string {
  if (!value) {
    return "Unknown time";
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function summarizeHistoryAction(entry: LocationHistoryEntry): string {
  if (entry.action_code === "set") {
    return "Initial location saved";
  }
  if (entry.action_code === "moved") {
    return "Location corrected";
  }
  if (entry.action_code === "removed") {
    return "Location removed";
  }
  if (entry.action_code === "review") {
    return "Review status updated";
  }
  return entry.action_code;
}

function summarizeRecordFilter(filter: RecordFilterState): string {
  const parts: string[] = [];
  if (filter.query) {
    parts.push(`text:${filter.query}`);
  }
  if (filter.typeCode !== "all") {
    parts.push(`type:${filter.typeCode}`);
  }
  if (filter.avoidOnly !== "all") {
    parts.push(filter.avoidOnly === "avoid" ? "avoid only" : "non-avoid");
  }
  if (filter.placeQuery) {
    parts.push(`place:${filter.placeQuery}`);
  }
  if (filter.reviewStatus !== "all") {
    parts.push(`review:${filter.reviewStatus}`);
  }
  if (filter.mappedOnly !== "all") {
    parts.push(filter.mappedOnly === "mapped" ? "mapped" : "unmapped");
  }
  return parts.length ? parts.join(" | ") : "All records";
}

function readMetadataText(metadata: Record<string, unknown>, key: string): string | null {
  const value = metadata[key];
  return typeof value === "string" && value.trim() ? value : null;
}

function readMetadataNumber(metadata: Record<string, unknown>, key: string): number | null {
  const value = metadata[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function canRetryMediaIssue(issue: MediaProcessingIssue): boolean {
  return issue.can_bulk_retry === true;
}

function resolveMediaIssueSettingsAnchor(issue: MediaProcessingIssue): string | null {
  const actionCode = issue.recommended_action_code ?? "";
  const featureCode = issue.recommended_settings_feature_code ?? "";
  if (!featureCode) {
    return null;
  }
  if (
    actionCode === "check_remote_storage_health" ||
    (actionCode === "retry_after_remote_check" && featureCode === "media_storage")
  ) {
    return "provider-media_storage-health";
  }
  return `provider-${featureCode}`;
}

function buildMediaIssueSettingsHref(workspaceId: string, issue: MediaProcessingIssue): string | null {
  const anchor = resolveMediaIssueSettingsAnchor(issue);
  if (!anchor) {
    return null;
  }
  return `/app/workspaces/${workspaceId}/settings#${anchor}`;
}

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
      location: readLocation(selectedRecord),
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
      setError("Content is required");
      return;
    }

    const latitude = form.location.latitude.trim() ? Number(form.location.latitude) : null;
    const longitude = form.location.longitude.trim() ? Number(form.location.longitude) : null;

    if (form.location.latitude.trim() && (latitude === null || Number.isNaN(latitude))) {
      setError("Latitude must be a valid number");
      return;
    }

    if (form.location.longitude.trim() && (longitude === null || Number.isNaN(longitude))) {
      setError("Longitude must be a valid number");
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
      setError(caught instanceof Error ? caught.message : "Failed to save record");
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
      setError(caught instanceof Error ? caught.message : "Failed to delete record");
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
      setError(caught instanceof Error ? caught.message : "Failed to upload media");
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
      setError("Reminder time is required");
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
      setError(caught instanceof Error ? caught.message : "Failed to create reminder");
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
      setError(caught instanceof Error ? caught.message : "Failed to refresh media status");
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
      setError(caught instanceof Error ? caught.message : "Failed to retry media processing");
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
      setError(caught instanceof Error ? caught.message : "Failed to bulk retry dead-letter media");
    } finally {
      setBulkRetryingDeadLetter(false);
    }
  };

  const handleDownloadMedia = async (asset: MediaAsset) => {
    if (!authToken) {
      setError("Not authenticated");
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
      setError(caught instanceof Error ? caught.message : "Failed to download media");
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
      setError(caught instanceof Error ? caught.message : "Failed to delete media");
    } finally {
      setDeletingMediaId(null);
    }
  };

  const handleApplyFilter = async () => {
    setError("");
    try {
      await onApplyRecordFilter(filterDraft);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to apply filter");
    }
  };

  const handleSavePreset = async () => {
    if (!presetName.trim()) {
      setError("Preset name is required");
      return;
    }

    setError("");
    try {
      await onCreateSearchPreset(presetName.trim(), filterDraft);
      setPresetName("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to save preset");
    }
  };

  const handleDeletePreset = async (presetId: string) => {
    setError("");
    try {
      await onDeleteSearchPreset(presetId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to delete preset");
    }
  };

  const formatMediaSize = (asset: MediaAsset): string => {
    const stored = asset.metadata_json.size_label;
    if (typeof stored === "string" && stored.trim()) {
      return stored;
    }

    const units = ["B", "KB", "MB", "GB"];
    let value = asset.size_bytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }
    return unitIndex === 0 ? `${value} ${units[unitIndex]}` : `${value.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatByteCount = (sizeBytes: number): string => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let value = sizeBytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }
    return unitIndex === 0 ? `${value} ${units[unitIndex]}` : `${value.toFixed(1)} ${units[unitIndex]}`;
  };

  const renderRecordCard = (record: RecordItem) => {
    const location = readLocation(record);
    const review = readLocationReview(record.extra_data);

    return (
      <article
        className={`record-card selectable-card ${record.id === selectedRecordId ? "selected" : ""}`}
        key={record.id}
        onClick={() => onSelectRecord(record.id)}
      >
        <div className="eyebrow">{record.type_code}</div>
        <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>
          {record.title || "Untitled"}
        </h3>
        <div className="muted">
          {formatRecordTimestamp(record)} | {record.source_type}
        </div>
        <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>{record.content || "No content"}</p>
        {location.place_name || location.address ? (
          <div className="muted" style={{ marginTop: 10 }}>
            {location.place_name || "Unknown place"}
            {location.address ? ` | ${location.address}` : ""}
          </div>
        ) : null}
        <div className="tag-row">
          <span className="tag">{record.status}</span>
          {record.rating ? <span className="tag">rating {record.rating}</span> : null}
          {record.is_avoid ? <span className="tag">avoid</span> : null}
          {location.latitude && location.longitude ? (
            <span className="tag">map {formatReviewStatus(review?.status)}</span>
          ) : null}
        </div>
      </article>
    );
  };

  const renderMediaAssetCard = (asset: MediaAsset) => {
    const extractionMode = readMetadataText(asset.metadata_json, "extraction_mode");
    const processingSource = readMetadataText(asset.metadata_json, "processing_source");
    const lastAttemptAt = readMetadataText(asset.metadata_json, "processing_last_attempt_at");
    const remoteFetchStatus = readMetadataText(asset.metadata_json, "remote_fetch_status");
    const retryState = readMetadataText(asset.metadata_json, "processing_retry_state");
    const retryCount = readMetadataNumber(asset.metadata_json, "processing_retry_count");
    const retryMaxAttempts = readMetadataNumber(asset.metadata_json, "processing_retry_max_attempts");
    const nextRetryAt = readMetadataText(asset.metadata_json, "processing_retry_next_attempt_at");

    return (
      <article className="record-card" key={asset.id}>
        <div className="eyebrow">{asset.media_type}</div>
        <div>{asset.original_filename}</div>
        <div className="muted">{asset.mime_type}</div>
        <div className="tag-row">
          <span className="tag">{asset.processing_status}</span>
          <span className="tag">{asset.storage_provider}</span>
          <span className="tag">{formatMediaSize(asset)}</span>
          {processingSource ? <span className="tag">{processingSource}</span> : null}
          {extractionMode ? <span className="tag">{extractionMode}</span> : null}
          {remoteFetchStatus ? <span className="tag">fetch {remoteFetchStatus}</span> : null}
          {retryState && retryState !== "idle" ? <span className="tag">retry {retryState}</span> : null}
          {retryCount !== null ? (
            <span className="tag">
              retries {retryCount}
              {retryMaxAttempts !== null ? `/${retryMaxAttempts}` : ""}
            </span>
          ) : null}
          {typeof asset.metadata_json.file_extension === "string" && asset.metadata_json.file_extension ? (
            <span className="tag">{String(asset.metadata_json.file_extension)}</span>
          ) : null}
        </div>
        {authToken ? (
          <div style={{ marginTop: 12 }}>
            <MediaPreview asset={asset} token={authToken} workspaceId={workspaceId} />
          </div>
        ) : null}
        <div className="detail-grid" style={{ marginTop: 12 }}>
          {typeof asset.metadata_json.width === "number" &&
          typeof asset.metadata_json.height === "number" ? (
            <div className="subtle-card">
              <div className="eyebrow">Dimensions</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {asset.metadata_json.width} x {asset.metadata_json.height}
              </div>
            </div>
          ) : null}
          {typeof asset.metadata_json.text_char_count === "number" ? (
            <div className="subtle-card">
              <div className="eyebrow">Text chars</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {asset.metadata_json.text_char_count}
              </div>
            </div>
          ) : null}
          {typeof asset.metadata_json.text_line_count === "number" ? (
            <div className="subtle-card">
              <div className="eyebrow">Text lines</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {asset.metadata_json.text_line_count}
              </div>
            </div>
          ) : null}
          {lastAttemptAt ? (
            <div className="subtle-card">
              <div className="eyebrow">Last attempt</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {formatHistoryTimestamp(lastAttemptAt)}
              </div>
            </div>
          ) : null}
          {nextRetryAt ? (
            <div className="subtle-card">
              <div className="eyebrow">Next retry</div>
              <div style={{ marginTop: 8, fontWeight: 600 }}>
                {formatHistoryTimestamp(nextRetryAt)}
              </div>
            </div>
          ) : null}
        </div>
        {asset.extracted_text ? (
          <p style={{ margin: "10px 0 0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
            {asset.extracted_text.length > 280
              ? `${asset.extracted_text.slice(0, 280)}...`
              : asset.extracted_text}
          </p>
        ) : null}
        {asset.processing_error ? (
          <div className="notice error" style={{ marginTop: 10 }}>
            {asset.processing_error}
          </div>
        ) : null}
        <div className="action-row" style={{ marginTop: 12 }}>
          <button
            className="button secondary"
            type="button"
            disabled={downloadingMediaId === asset.id}
            onClick={() => void handleDownloadMedia(asset)}
          >
            {downloadingMediaId === asset.id ? "Downloading..." : "Download"}
          </button>
          <button
            className="button secondary"
            type="button"
            disabled={refreshingMediaId === asset.id}
            onClick={() => void handleRefreshMedia(asset.id)}
          >
            {refreshingMediaId === asset.id ? "Refreshing..." : "Refresh status"}
          </button>
          {asset.processing_status !== "completed" ? (
            <button
              className="button secondary"
              type="button"
              disabled={retryingMediaId === asset.id}
              onClick={() => void handleRetryMediaProcessing(asset.id)}
            >
              {retryingMediaId === asset.id ? "Retrying..." : "Retry"}
            </button>
          ) : null}
          <button
            className="button secondary"
            type="button"
            disabled={deletingMediaId === asset.id || !canWriteWorkspace}
            onClick={() => void handleDeleteMediaAsset(asset.id)}
          >
            {deletingMediaId === asset.id ? "Deleting..." : "Delete media"}
          </button>
        </div>
      </article>
    );
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Workspace</div>
          <h2 className="title" style={{ fontSize: 22 }}>
            Structured Results
          </h2>
          <div className="muted" style={{ marginTop: 8 }}>
            {workspaceId}
          </div>
        </div>
        <div className="action-row">
          <button className="button secondary" disabled={!canWriteWorkspace} type="button" onClick={() => onSelectRecord(null)}>
            New record
          </button>
        </div>
      </div>
      <div className="panel-body">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="eyebrow">Visible records</div>
            <div className="title" style={{ fontSize: 20 }}>
              {records.length}
            </div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">Food</div>
            <div className="title" style={{ fontSize: 20 }}>
              {foodCount}
            </div>
          </div>
          <div className="stat-card">
            <div className="eyebrow">Avoid</div>
            <div className="title" style={{ fontSize: 20 }}>
              {avoidCount}
            </div>
          </div>
        </div>

        <div className="record-card form-stack" style={{ marginTop: 20 }}>
          <div className="eyebrow">Advanced search</div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">Text query</span>
              <input
                className="input"
                value={filterDraft.query}
                onChange={(event) =>
                  setFilterDraft((current) => ({
                    ...current,
                    query: event.target.value,
                  }))
                }
                placeholder="dish / snack / warning"
              />
            </label>
            <label className="field">
              <span className="field-label">Type</span>
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
                <option value="all">all</option>
                <option value="memo">memo</option>
                <option value="food">food</option>
                <option value="snack">snack</option>
                <option value="bad_experience">bad_experience</option>
              </select>
            </label>
            <label className="field">
              <span className="field-label">Avoid</span>
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
                <option value="all">all records</option>
                <option value="avoid">avoid only</option>
                <option value="normal">non-avoid only</option>
              </select>
            </label>
          </div>
          <div className="action-row">
            <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void handleApplyFilter()}>
              {filteringRecords ? "Filtering..." : "Apply advanced filter"}
            </button>
            <button className="button secondary" disabled={filteringRecords} type="button" onClick={() => void onResetFilter()}>
              Reset list
            </button>
          </div>
          <div className="muted">{summarizeRecordFilter(recordFilter)}</div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">Preset name</span>
              <input
                className="input"
                disabled={!canWriteWorkspace}
                value={presetName}
                onChange={(event) => setPresetName(event.target.value)}
                placeholder="Confirmed food spots"
              />
            </label>
            <div className="field" style={{ alignSelf: "end" }}>
              <button
                className="button secondary"
                disabled={savingSearchPreset || !canWriteWorkspace}
                type="button"
                onClick={() => void handleSavePreset()}
              >
                {savingSearchPreset ? "Saving preset..." : "Save current filter"}
              </button>
            </div>
          </div>
          {searchPresets.length ? (
            <div className="record-list compact-list">
              {searchPresets.map((preset) => (
                <article className="record-card" key={preset.id}>
                  <div className="eyebrow">Saved preset</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>{preset.name}</div>
                  <div className="muted" style={{ marginTop: 8 }}>
                    {summarizeRecordFilter(preset.filters)}
                  </div>
                  <div className="action-row" style={{ marginTop: 12 }}>
                    <button
                      className="button secondary"
                      disabled={filteringRecords}
                      type="button"
                      onClick={() => void onApplyRecordFilter(preset.filters)}
                    >
                      Apply preset
                    </button>
                    {canWriteWorkspace ? (
                      <button className="button secondary" type="button" onClick={() => void handleDeletePreset(preset.id)}>
                        Delete preset
                      </button>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="notice">No saved filters yet. Save your current advanced filter to reuse it.</div>
          )}
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
          <div className="eyebrow">{selectedRecord ? "Edit record" : "New manual record"}</div>
          <label className="field">
            <span className="field-label">Title</span>
            <input
              className="input"
              disabled={!canWriteWorkspace}
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Optional title"
            />
          </label>
          <label className="field">
            <span className="field-label">Content</span>
            <textarea
              className="textarea"
              disabled={!canWriteWorkspace}
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              placeholder="Write a note, food review, or reminder"
            />
          </label>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">Type</span>
              <select
                className="input"
                disabled={!canWriteWorkspace}
                value={form.type_code}
                onChange={(event) => setForm((prev) => ({ ...prev, type_code: event.target.value }))}
              >
                <option value="memo">memo</option>
                <option value="food">food</option>
                <option value="snack">snack</option>
                <option value="bad_experience">bad_experience</option>
              </select>
            </label>
            <label className="field">
              <span className="field-label">Rating</span>
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
              <span className="field-label">Occurred at</span>
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
              <span className="field-label">Place name</span>
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
                placeholder="West Lake Sushi"
              />
            </label>
            <label className="field">
              <span className="field-label">Address</span>
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
                placeholder="Hangzhou, West Lake district"
              />
            </label>
            <label className="checkbox-field">
              <input
                checked={form.is_avoid}
                disabled={!canWriteWorkspace}
                type="checkbox"
                onChange={(event) => setForm((prev) => ({ ...prev, is_avoid: event.target.checked }))}
              />
              <span>Avoid item</span>
            </label>
          </div>
          <div className="inline-fields">
            <label className="field">
              <span className="field-label">Latitude</span>
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
              <span className="field-label">Longitude</span>
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
              <span className="field-label">Location source</span>
              <input className="input" disabled value={form.location.source || "manual"} />
            </label>
          </div>
          <div className="record-card form-stack">
            <div className="eyebrow">Location Review</div>
            <div className="muted">
              Confirm trusted coordinates or flag doubtful places before this record enters long-term memory.
            </div>
            <div className="inline-fields">
              <label className="field">
                <span className="field-label">Review status</span>
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
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                  <option value="needs_review">needs_review</option>
                </select>
              </label>
              <label className="field" style={{ gridColumn: "span 2" }}>
                <span className="field-label">Review note</span>
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
                  placeholder="Why this place is trusted or needs another check"
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
                Mark confirmed
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
                Mark needs review
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
                Reset review
              </button>
            </div>
            {selectedRecord && selectedLocationReview ? (
              <div className="detail-grid">
                <div className="subtle-card">
                  <div className="eyebrow">Stored status</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {formatReviewStatus(selectedLocationReview.status)}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">Last updated</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {formatHistoryTimestamp(selectedLocationReview.updated_at)}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">Confirmed at</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {selectedLocationReview.confirmed_at
                      ? formatHistoryTimestamp(selectedLocationReview.confirmed_at)
                      : "Not confirmed"}
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
                          <div className="eyebrow">{summarizeHistoryAction(entry)}</div>
                          <div style={{ marginTop: 8, fontWeight: 600 }}>
                            {entry.place_name || entry.address || "Unnamed location"}
                          </div>
                        </div>
                        <div className="muted">{formatHistoryTimestamp(entry.changed_at)}</div>
                      </div>
                      <div className="muted" style={{ marginTop: 8 }}>
                        {entry.address || "No address"}
                      </div>
                      {(entry.latitude ?? null) !== null && (entry.longitude ?? null) !== null ? (
                        <div className="muted" style={{ marginTop: 8 }}>
                          {entry.latitude}, {entry.longitude}
                        </div>
                      ) : null}
                      <div className="tag-row">
                        {entry.source ? <span className="tag">{entry.source}</span> : null}
                        {entry.review_status ? <span className="tag">{formatReviewStatus(entry.review_status)}</span> : null}
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
                    No location history yet. Save a mapped point to start review tracking.
                  </div>
                )}
              </div>
            ) : null}
          </div>
          {error ? <div className="notice error">{error}</div> : null}
          <div className="action-row">
            <button className="button" disabled={saving || !canWriteWorkspace} type="submit">
              {saving ? "Saving..." : selectedRecord ? "Update record" : "Create record"}
            </button>
            {selectedRecord ? (
              <button className="button secondary" disabled={deleting || !canWriteWorkspace} onClick={handleDelete} type="button">
                {deleting ? "Deleting..." : "Delete record"}
              </button>
            ) : null}
          </div>
          {selectedRecord ? (
            <>
              <label className="field">
                <span className="field-label">Upload attachment</span>
                <input disabled={!canWriteWorkspace} onChange={handleUpload} type="file" />
              </label>
              {uploading ? <div className="notice">Uploading media...</div> : null}
              <div className="detail-grid" style={{ marginBottom: 16 }}>
                <div className="subtle-card">
                  <div className="eyebrow">This record media</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {mediaAssets.length} file{mediaAssets.length === 1 ? "" : "s"} / {formatByteCount(selectedRecordMediaSizeBytes)}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">Workspace storage</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {mediaStorageSummary
                      ? `${mediaStorageSummary.total_count} file${mediaStorageSummary.total_count === 1 ? "" : "s"} / ${mediaStorageSummary.total_size_label}`
                      : "-"}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">Storage health</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {mediaStorageSummary
                      ? mediaStorageSummary.missing_file_count
                        ? `${mediaStorageSummary.missing_file_count} missing file(s)`
                        : "All tracked files present"
                      : "-"}
                  </div>
                </div>
              </div>
              {mediaProcessingOverview ? (
                <>
                  <div className="detail-grid" style={{ marginBottom: 16 }}>
                    <div className="subtle-card">
                      <div className="eyebrow">Processing completed</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.completed_count}/{mediaProcessingOverview.total_count}
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">Needs attention</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.failed_count + mediaProcessingOverview.deferred_count}
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">Queue state</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.pending_count + mediaProcessingOverview.processing_count} queued
                      </div>
                    </div>
                    <div className="subtle-card">
                      <div className="eyebrow">Storage mix</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>
                        {mediaProcessingOverview.local_item_count} local / {mediaProcessingOverview.remote_item_count} remote
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
                    <div className="eyebrow">Recent media issues</div>
                    <div className="muted">
                      Recent failed or deferred items across the workspace, including remote fetch state.
                    </div>
                    {mediaProcessingOverview.recent_issues.length ? (
                      <div className="record-list compact-list" style={{ marginTop: 16 }}>
                        {mediaProcessingOverview.recent_issues.map((issue) => (
                          <article className="record-card" key={issue.media_id}>
                            <div className="eyebrow">{issue.media_type}</div>
                            <div>{issue.original_filename}</div>
                            <div className="tag-row">
                              <span className="tag">{issue.processing_status}</span>
                              <span className="tag">{issue.storage_provider}</span>
                              {issue.processing_source ? <span className="tag">{issue.processing_source}</span> : null}
                              {issue.remote_fetch_status ? <span className="tag">fetch {issue.remote_fetch_status}</span> : null}
                              {issue.extraction_mode ? <span className="tag">{issue.extraction_mode}</span> : null}
                              {issue.processing_retry_state ? <span className="tag">retry {issue.processing_retry_state}</span> : null}
                              {issue.issue_label ? <span className="tag">{issue.issue_label}</span> : null}
                              {typeof issue.processing_retry_count === "number" ? (
                                <span className="tag">
                                  retries {issue.processing_retry_count}
                                  {typeof issue.processing_retry_max_attempts === "number"
                                    ? `/${issue.processing_retry_max_attempts}`
                                    : ""}
                                </span>
                              ) : null}
                            </div>
                            <div className="muted" style={{ marginTop: 8 }}>
                              Last attempt: {formatHistoryTimestamp(issue.processing_last_attempt_at)}
                            </div>
                            {issue.processing_last_failure_at ? (
                              <div className="muted" style={{ marginTop: 6 }}>
                                Last failure: {formatHistoryTimestamp(issue.processing_last_failure_at)}
                              </div>
                            ) : null}
                            {issue.processing_retry_next_attempt_at ? (
                              <div className="muted" style={{ marginTop: 6 }}>
                                Next retry: {formatHistoryTimestamp(issue.processing_retry_next_attempt_at)}
                              </div>
                            ) : null}
                            {issue.recommended_action_label ? (
                              <div className="notice" style={{ marginTop: 10 }}>
                                {issue.recommended_action_label}
                                {issue.recommended_action_detail ? `: ${issue.recommended_action_detail}` : ""}
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
                                    {retryingMediaId === issue.media_id ? "Retrying..." : "Retry now"}
                                  </button>
                                ) : null}
                                {buildMediaIssueSettingsHref(workspaceId, issue) ? (
                                  <Link
                                    className="button secondary"
                                    href={buildMediaIssueSettingsHref(workspaceId, issue) ?? "#"}
                                  >
                                    Open settings
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
                        No recent media processing issues.
                      </div>
                    )}
                  </div>
                  <div className="record-card form-stack" style={{ marginBottom: 16 }}>
                    <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div className="eyebrow">Dead-letter recovery</div>
                        <div className="muted" style={{ marginTop: 8 }}>
                          Remote media items that need manual recovery after retries stopped or were never eligible for auto-retry.
                        </div>
                      </div>
                      <div className="tag-row">
                        <span className="tag">
                          {mediaDeadLetterOverview?.total_count ?? 0} item(s)
                        </span>
                        {mediaDeadLetterOverview
                          ? Object.entries(mediaDeadLetterOverview.by_retry_state).map(([retryState, count]) => (
                              <span className="tag" key={retryState}>
                                {retryState}: {count}
                              </span>
                            ))
                          : null}
                        {mediaDeadLetterOverview
                          ? Object.entries(mediaDeadLetterOverview.by_issue_category).map(([issueCategory, count]) => (
                              <span className="tag" key={issueCategory}>
                                {issueCategory}: {count}
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
                            Select visible
                          </button>
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length}
                            type="button"
                            onClick={handleClearDeadLetterSelection}
                          >
                            Clear selection
                          </button>
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter || !selectedDeadLetterIds.length}
                            type="button"
                            onClick={() => void handleBulkRetryDeadLetter("selected")}
                          >
                            {bulkRetryingDeadLetter ? "Retrying..." : `Retry selected (${selectedDeadLetterIds.length})`}
                          </button>
                          <button
                            className="button secondary"
                            disabled={bulkRetryingDeadLetter}
                            type="button"
                            onClick={() => void handleBulkRetryDeadLetter("all")}
                          >
                            {bulkRetryingDeadLetter ? "Retrying..." : "Retry all actionable"}
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
                                  <span className="tag">{item.processing_status}</span>
                                  <span className="tag">{item.storage_provider}</span>
                                  {item.processing_retry_state ? <span className="tag">retry {item.processing_retry_state}</span> : null}
                                  {item.issue_label ? <span className="tag">{item.issue_label}</span> : null}
                                </div>
                              </label>
                              <div className="muted" style={{ marginTop: 8 }}>
                                Last attempt: {formatHistoryTimestamp(item.processing_last_attempt_at)}
                              </div>
                              {item.processing_last_failure_at ? (
                                <div className="muted" style={{ marginTop: 6 }}>
                                  Last failure: {formatHistoryTimestamp(item.processing_last_failure_at)}
                                </div>
                              ) : null}
                              {typeof item.processing_retry_count === "number" ? (
                                <div className="muted" style={{ marginTop: 6 }}>
                                  Retry budget used: {item.processing_retry_count}
                                  {typeof item.processing_retry_max_attempts === "number"
                                    ? ` / ${item.processing_retry_max_attempts}`
                                    : ""}
                                </div>
                              ) : null}
                              {item.recommended_action_label ? (
                                <div className="notice" style={{ marginTop: 10 }}>
                                  {item.recommended_action_label}
                                  {item.recommended_action_detail ? `: ${item.recommended_action_detail}` : ""}
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
                                      {retryingMediaId === item.media_id ? "Retrying..." : "Retry now"}
                                    </button>
                                  ) : null}
                                  {buildMediaIssueSettingsHref(workspaceId, item) ? (
                                    <Link
                                      className="button secondary"
                                      href={buildMediaIssueSettingsHref(workspaceId, item) ?? "#"}
                                    >
                                      Open settings
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
                      <div className="notice">No dead-letter media items right now.</div>
                    )}
                  </div>
                </>
              ) : null}
              {mediaStorageSummary?.largest_item_name ? (
                <div className="muted" style={{ marginBottom: 16 }}>
                  Largest file: {mediaStorageSummary.largest_item_name} ({mediaStorageSummary.largest_item_size_label})
                </div>
              ) : null}
              <div className="record-list compact-list">
                {mediaAssets.length ? (
                  mediaAssets.map((asset) => renderMediaAssetCard(asset))
                ) : (
                  <div className="notice">No media uploaded for this record yet.</div>
                )}
              </div>

              <div className="record-card form-stack">
                <div className="eyebrow">Reminder V1</div>
                <div className="muted">
                  Save one-time reminders on this record. Delivery execution will be connected in the next backend step.
                </div>
                <div className="form-stack">
                  <div className="inline-fields">
                    <label className="field">
                      <span className="field-label">Reminder title</span>
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
                        placeholder="Dinner follow-up"
                      />
                    </label>
                    <label className="field">
                      <span className="field-label">Remind at</span>
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
                      <span className="field-label">Channel</span>
                      <input className="input" disabled value="in_app" />
                    </label>
                  </div>
                  <label className="field">
                    <span className="field-label">Reminder note</span>
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
                      placeholder="What should this reminder tell you?"
                    />
                  </label>
                  <div className="action-row">
                    <button
                      className="button secondary"
                      disabled={savingReminder || !canWriteWorkspace}
                      type="button"
                      onClick={() => void handleCreateReminderSubmit()}
                    >
                      {savingReminder ? "Saving reminder..." : "Create reminder"}
                    </button>
                  </div>
                </div>
                <div className="record-list compact-list">
                  {reminders.length ? (
                    reminders.map((reminder) => (
                      <article className="record-card" key={reminder.id}>
                        <div className="eyebrow">{reminder.channel_code}</div>
                        <h4 style={{ margin: "8px 0 6px", fontSize: 18 }}>
                          {reminder.title || selectedRecord.title || "Untitled reminder"}
                        </h4>
                        <div className="muted">{formatReminderTimestamp(reminder.remind_at)}</div>
                        {reminder.message ? (
                          <p style={{ margin: "10px 0 0", lineHeight: 1.6 }}>{reminder.message}</p>
                        ) : null}
                        <div className="tag-row">
                          <span className="tag">{reminder.status}</span>
                          <span className="tag">{reminder.is_enabled ? "enabled" : "paused"}</span>
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
                            {reminder.is_enabled ? "Pause" : "Enable"}
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
                              Mark done
                            </button>
                          ) : null}
                          <button
                            className="button secondary"
                            type="button"
                            disabled={!canWriteWorkspace}
                            onClick={() => void onDeleteReminder(reminder.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="notice">No reminders for this record yet.</div>
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
            Timeline
          </button>
          <button
            className={viewMode === "list" ? "button" : "button secondary"}
            type="button"
            onClick={() => setViewMode("list")}
          >
            Flat list
          </button>
        </div>

        {viewMode === "timeline" ? (
          <div style={{ marginTop: 20 }} className="record-list">
            {timelineDays.length ? (
              timelineDays.map((day) => (
                <section className="record-card" key={day.date}>
                  <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div className="eyebrow">Timeline day</div>
                      <h3 style={{ margin: "8px 0 6px", fontSize: 20 }}>{formatTimelineDate(day.date)}</h3>
                      <div className="muted">
                        {day.count} item{day.count === 1 ? "" : "s"} on this day
                      </div>
                    </div>
                    <div className="tag-row" style={{ marginTop: 0, justifyContent: "flex-end" }}>
                      <span className="tag">{day.date}</span>
                      {day.avoid_count ? <span className="tag">avoid {day.avoid_count}</span> : null}
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
                    {day.items.map((record) => renderRecordCard(record))}
                  </div>
                </section>
              ))
            ) : (
              <div className="notice">
                No records yet. Save one from the chat panel or create one manually above.
              </div>
            )}
          </div>
        ) : (
          <div style={{ marginTop: 20 }} className="record-list">
            {records.length ? (
              records.map((record) => renderRecordCard(record))
            ) : (
              <div className="notice">
                No records yet. Save one from the chat panel or create one manually above.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

