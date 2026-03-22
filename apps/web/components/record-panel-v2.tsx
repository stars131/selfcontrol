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
import { RecordEditorWorkspace } from "./record-editor-workspace";
import { RecordSearchPanel } from "./record-search-panel";
import { RecordResultsView } from "./record-results-view";
import { RecordPanelStats } from "./record-panel-stats";
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

        <RecordEditorWorkspace
          authToken={authToken}
          bulkRetryingDeadLetter={bulkRetryingDeadLetter}
          canWriteWorkspace={canWriteWorkspace}
          channelInAppLabel={detailCopy.channelInApp}
          channelLabel={detailCopy.channelLabel}
          createReminderLabel={detailCopy.createReminder}
          deleteReminderLabel={detailCopy.deleteReminder}
          deleting={deleting}
          deletingMediaId={deletingMediaId}
          downloadingMediaId={downloadingMediaId}
          enableReminderLabel={detailCopy.enableReminder}
          error={error}
          form={form}
          formatFileCountLabel={formatFileCountLabel}
          formatHistoryTimestampLabel={formatHistoryTimestampLabel}
          formatReminderEnabledLabel={formatReminderEnabledLabel}
          formatReminderStatusLabel={formatReminderStatusLabel}
          formatReminderTimestampLabel={formatReminderTimestampLabel}
          formatReviewStatusLabel={formatReviewStatusLabel}
          largestFilePrefixLabel={detailCopy.largestFilePrefix}
          locale={locale}
          locationReviewForm={locationReviewForm}
          markReminderDoneLabel={detailCopy.markReminderDone}
          mediaAssets={mediaAssets}
          mediaDeadLetterOverview={mediaDeadLetterOverview}
          mediaIssueCopy={mediaIssueCopy}
          mediaProcessingOverview={mediaProcessingOverview}
          mediaStorageSummary={mediaStorageSummary}
          noMediaLabel={detailCopy.noMedia}
          noRemindersLabel={detailCopy.noReminders}
          onBulkRetryAllDeadLetter={() => handleBulkRetryDeadLetter("all")}
          onBulkRetrySelectedDeadLetter={() => handleBulkRetryDeadLetter("selected")}
          onClearDeadLetterSelection={handleClearDeadLetterSelection}
          onCreateReminder={handleCreateReminderSubmit}
          onDelete={handleDelete}
          onDeleteMediaAsset={handleDeleteMediaAsset}
          onDeleteReminder={onDeleteReminder}
          onDownloadMedia={handleDownloadMedia}
          onRefreshMedia={handleRefreshMedia}
          onRetryMediaProcessing={handleRetryMediaProcessing}
          onSelectAllDeadLetter={handleSelectAllDeadLetter}
          onSubmit={handleSubmit}
          onToggleDeadLetterSelection={handleToggleDeadLetterSelection}
          onUpdateReminder={onUpdateReminder}
          onUpload={handleUpload}
          panelCopy={panelCopy}
          pauseReminderLabel={detailCopy.pauseReminder}
          refreshingMediaId={refreshingMediaId}
          reminderForm={reminderForm}
          reminderNoteLabel={detailCopy.reminderNoteLabel}
          reminderNotePlaceholder={detailCopy.reminderNotePlaceholder}
          reminderSectionDescription={detailCopy.reminderSectionDescription}
          reminderSectionTitle={detailCopy.reminderSectionTitle}
          reminderTitleLabel={detailCopy.reminderTitleLabel}
          reminderTitlePlaceholder={detailCopy.reminderTitlePlaceholder}
          remindAtLabel={detailCopy.remindAtLabel}
          reminders={reminders}
          retryingMediaId={retryingMediaId}
          saving={saving}
          savingReminder={savingReminder}
          savingReminderLabel={detailCopy.savingReminder}
          selectedDeadLetterIds={selectedDeadLetterIds}
          selectedLocationHistory={selectedLocationHistory}
          selectedLocationReview={selectedLocationReview}
          selectedRecord={selectedRecord}
          selectedRecordMediaSizeLabel={formatByteCount(selectedRecordMediaSizeBytes)}
          setForm={setForm}
          setLocationReviewForm={setLocationReviewForm}
          setReminderForm={setReminderForm}
          summarizeHistoryActionLabel={summarizeHistoryActionLabel}
          untitledReminderLabel={detailCopy.untitledReminder}
          uploading={uploading}
          workspaceId={workspaceId}
        />
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

