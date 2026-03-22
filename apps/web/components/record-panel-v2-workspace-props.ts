import type { ComponentProps, Dispatch, SetStateAction } from "react";

import type { RecordFormState } from "../lib/record-panel-forms";
import type { PanelCopy } from "../lib/record-panel-ui";
import type { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordFilterState } from "../lib/types";
import { RecordBrowseWorkspace } from "./record-browse-workspace";
import { RecordEditorWorkspace } from "./record-editor-workspace";
import type { RecordPanelV2Props } from "./record-panel-v2.types";

type RecordBrowseWorkspaceProps = ComponentProps<typeof RecordBrowseWorkspace>;
type RecordEditorWorkspaceProps = ComponentProps<typeof RecordEditorWorkspace>;
type RecordPanelDetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

type BuildRecordBrowseWorkspacePropsInput = Pick<
  RecordPanelV2Props,
  | "canWriteWorkspace"
  | "records"
  | "timelineDays"
  | "selectedRecordId"
  | "recordFilter"
  | "searchPresets"
  | "onApplyLocationFilter"
  | "onApplyRecordFilter"
  | "onResetFilter"
  | "onSelectRecord"
> & {
  avoidCount: number;
  detailCopy: RecordPanelDetailCopy;
  filterDraft: RecordFilterState;
  filteringRecords: boolean;
  foodCount: number;
  form: RecordFormState;
  formatAvoidCountLabel: (count: number) => string;
  formatRecordTimestampLabel: (record: RecordBrowseWorkspaceProps["records"][number]) => string;
  formatReviewStatusLabel: (value?: string | null) => string;
  formatTimelineCountLabel: (count: number) => string;
  formatTimelineDateLabel: (value: string) => string;
  handleApplyFilter: () => Promise<void>;
  handleDeletePreset: (presetId: string) => Promise<void>;
  handleSavePreset: () => Promise<void>;
  panelCopy: PanelCopy;
  presetName: string;
  savingSearchPreset: boolean;
  setFilterDraft: Dispatch<SetStateAction<RecordFilterState>>;
  setForm: Dispatch<SetStateAction<RecordFormState>>;
  setPresetName: Dispatch<SetStateAction<string>>;
  setViewMode: Dispatch<SetStateAction<"timeline" | "list">>;
  summarizeRecordFilterLabel: (filter: RecordFilterState) => string;
  viewMode: "timeline" | "list";
};

type BuildRecordEditorWorkspacePropsInput = Pick<
  RecordPanelV2Props,
  | "authToken"
  | "canWriteWorkspace"
  | "workspaceId"
  | "mediaAssets"
  | "mediaDeadLetterOverview"
  | "mediaProcessingOverview"
  | "mediaStorageSummary"
  | "reminders"
  | "onDeleteReminder"
  | "onUpdateReminder"
> & {
  bulkRetryingDeadLetter: boolean;
  deleting: boolean;
  deletingMediaId: string | null;
  detailCopy: RecordPanelDetailCopy;
  downloadingMediaId: string | null;
  error: string;
  form: RecordEditorWorkspaceProps["form"];
  formatFileCountLabel: RecordEditorWorkspaceProps["formatFileCountLabel"];
  formatHistoryTimestampLabel: RecordEditorWorkspaceProps["formatHistoryTimestampLabel"];
  formatReminderEnabledLabel: RecordEditorWorkspaceProps["formatReminderEnabledLabel"];
  formatReminderStatusLabel: RecordEditorWorkspaceProps["formatReminderStatusLabel"];
  formatReminderTimestampLabel: RecordEditorWorkspaceProps["formatReminderTimestampLabel"];
  formatReviewStatusLabel: RecordEditorWorkspaceProps["formatReviewStatusLabel"];
  handleBulkRetryDeadLetter: (mode: "all" | "selected") => Promise<void>;
  handleClearDeadLetterSelection: () => void;
  handleCreateReminderSubmit: () => Promise<void>;
  handleDelete: () => void;
  handleDeleteMediaAsset: (mediaId: string) => Promise<void>;
  handleDownloadMedia: (asset: RecordEditorWorkspaceProps["mediaAssets"][number]) => Promise<void>;
  handleRefreshMedia: (mediaId: string) => Promise<void>;
  handleRetryMediaProcessing: (mediaId: string) => Promise<void>;
  handleSelectAllDeadLetter: () => void;
  handleSubmit: RecordEditorWorkspaceProps["onSubmit"];
  handleToggleDeadLetterSelection: (mediaId: string, checked: boolean) => void;
  handleUpload: RecordEditorWorkspaceProps["onUpload"];
  locale: RecordEditorWorkspaceProps["locale"];
  locationReviewForm: RecordEditorWorkspaceProps["locationReviewForm"];
  mediaIssueCopy: RecordEditorWorkspaceProps["mediaIssueCopy"];
  panelCopy: RecordEditorWorkspaceProps["panelCopy"];
  refreshingMediaId: string | null;
  reminderForm: RecordEditorWorkspaceProps["reminderForm"];
  retryingMediaId: string | null;
  saving: boolean;
  savingReminder: boolean;
  selectedDeadLetterIds: string[];
  selectedLocationHistory: RecordEditorWorkspaceProps["selectedLocationHistory"];
  selectedLocationReview: RecordEditorWorkspaceProps["selectedLocationReview"];
  selectedRecord: RecordEditorWorkspaceProps["selectedRecord"];
  selectedRecordMediaSizeLabel: string;
  setForm: RecordEditorWorkspaceProps["setForm"];
  setLocationReviewForm: RecordEditorWorkspaceProps["setLocationReviewForm"];
  setReminderForm: RecordEditorWorkspaceProps["setReminderForm"];
  summarizeHistoryActionLabel: RecordEditorWorkspaceProps["summarizeHistoryActionLabel"];
  uploading: boolean;
};

export function buildRecordBrowseWorkspaceProps({
  canWriteWorkspace,
  records,
  timelineDays,
  selectedRecordId,
  recordFilter,
  searchPresets,
  onApplyLocationFilter,
  onApplyRecordFilter,
  onResetFilter,
  onSelectRecord,
  avoidCount,
  detailCopy,
  filterDraft,
  filteringRecords,
  foodCount,
  form,
  formatAvoidCountLabel,
  formatRecordTimestampLabel,
  formatReviewStatusLabel,
  formatTimelineCountLabel,
  formatTimelineDateLabel,
  handleApplyFilter,
  handleDeletePreset,
  handleSavePreset,
  panelCopy,
  presetName,
  savingSearchPreset,
  setFilterDraft,
  setForm,
  setPresetName,
  setViewMode,
  summarizeRecordFilterLabel,
  viewMode,
}: BuildRecordBrowseWorkspacePropsInput): RecordBrowseWorkspaceProps {
  return {
    applyPresetLabel: panelCopy.applyPreset,
    avoidCount,
    avoidRecordLabel: detailCopy.avoidLabel,
    avoidStatsLabel: panelCopy.avoid,
    canWriteWorkspace,
    currentFilterSummary: summarizeRecordFilterLabel(recordFilter),
    deletePresetLabel: panelCopy.deletePreset,
    draftLocation: canWriteWorkspace ? form.location ?? null : null,
    filteringRecords,
    filterDraft,
    flatListViewLabel: detailCopy.flatListView,
    foodCount,
    foodLabel: panelCopy.food,
    formatAvoidCountLabel,
    formatRecordTimestampLabel,
    formatReviewStatusLabel,
    formatTimelineCountLabel,
    formatTimelineDateLabel,
    mapPrefixLabel: detailCopy.mapPrefix,
    noContentLabel: detailCopy.noContent,
    noRecordsLabel: detailCopy.noRecords,
    noSavedFiltersLabel: panelCopy.noSavedFilters,
    onApplyFilter: handleApplyFilter,
    onApplyLocationFilter,
    onApplyPreset: onApplyRecordFilter,
    onDeletePreset: handleDeletePreset,
    onDraftLocationChange: canWriteWorkspace
      ? (nextLocation) =>
          setForm((prev) => ({
            ...prev,
            location: nextLocation,
          }))
      : undefined,
    onResetFilter,
    onSavePreset: handleSavePreset,
    onSelectRecord,
    panelCopy,
    presetName,
    ratingPrefixLabel: detailCopy.ratingPrefix,
    recordFilter,
    records,
    savedPresetLabel: panelCopy.savedPreset,
    savingSearchPreset,
    searchPresets,
    selectedRecordId,
    setFilterDraft,
    setPresetName,
    setViewMode,
    summarizeRecordFilterLabel,
    timelineDayLabel: detailCopy.timelineDayLabel,
    timelineDays,
    timelineViewLabel: detailCopy.timelineView,
    unknownPlaceLabel: detailCopy.unknownPlace,
    untitledRecordLabel: detailCopy.untitledRecord,
    viewMode,
    visibleRecordCount: records.length,
    visibleRecordsLabel: panelCopy.visibleRecords,
  };
}

export function buildRecordEditorWorkspaceProps({
  authToken,
  canWriteWorkspace,
  workspaceId,
  mediaAssets,
  mediaDeadLetterOverview,
  mediaProcessingOverview,
  mediaStorageSummary,
  reminders,
  onDeleteReminder,
  onUpdateReminder,
  bulkRetryingDeadLetter,
  deleting,
  deletingMediaId,
  detailCopy,
  downloadingMediaId,
  error,
  form,
  formatFileCountLabel,
  formatHistoryTimestampLabel,
  formatReminderEnabledLabel,
  formatReminderStatusLabel,
  formatReminderTimestampLabel,
  formatReviewStatusLabel,
  handleBulkRetryDeadLetter,
  handleClearDeadLetterSelection,
  handleCreateReminderSubmit,
  handleDelete,
  handleDeleteMediaAsset,
  handleDownloadMedia,
  handleRefreshMedia,
  handleRetryMediaProcessing,
  handleSelectAllDeadLetter,
  handleSubmit,
  handleToggleDeadLetterSelection,
  handleUpload,
  locale,
  locationReviewForm,
  mediaIssueCopy,
  panelCopy,
  refreshingMediaId,
  reminderForm,
  retryingMediaId,
  saving,
  savingReminder,
  selectedDeadLetterIds,
  selectedLocationHistory,
  selectedLocationReview,
  selectedRecord,
  selectedRecordMediaSizeLabel,
  setForm,
  setLocationReviewForm,
  setReminderForm,
  summarizeHistoryActionLabel,
  uploading,
}: BuildRecordEditorWorkspacePropsInput): RecordEditorWorkspaceProps {
  return {
    authToken,
    bulkRetryingDeadLetter,
    canWriteWorkspace,
    channelInAppLabel: detailCopy.channelInApp,
    channelLabel: detailCopy.channelLabel,
    createReminderLabel: detailCopy.createReminder,
    deleteReminderLabel: detailCopy.deleteReminder,
    deleting,
    deletingMediaId,
    downloadingMediaId,
    enableReminderLabel: detailCopy.enableReminder,
    error,
    form,
    formatFileCountLabel,
    formatHistoryTimestampLabel,
    formatReminderEnabledLabel,
    formatReminderStatusLabel,
    formatReminderTimestampLabel,
    formatReviewStatusLabel,
    largestFilePrefixLabel: detailCopy.largestFilePrefix,
    locale,
    locationReviewForm,
    markReminderDoneLabel: detailCopy.markReminderDone,
    mediaAssets,
    mediaDeadLetterOverview,
    mediaIssueCopy,
    mediaProcessingOverview,
    mediaStorageSummary,
    noMediaLabel: detailCopy.noMedia,
    noRemindersLabel: detailCopy.noReminders,
    onBulkRetryAllDeadLetter: () => handleBulkRetryDeadLetter("all"),
    onBulkRetrySelectedDeadLetter: () => handleBulkRetryDeadLetter("selected"),
    onClearDeadLetterSelection: handleClearDeadLetterSelection,
    onCreateReminder: handleCreateReminderSubmit,
    onDelete: handleDelete,
    onDeleteMediaAsset: handleDeleteMediaAsset,
    onDeleteReminder,
    onDownloadMedia: handleDownloadMedia,
    onRefreshMedia: handleRefreshMedia,
    onRetryMediaProcessing: handleRetryMediaProcessing,
    onSelectAllDeadLetter: handleSelectAllDeadLetter,
    onSubmit: handleSubmit,
    onToggleDeadLetterSelection: handleToggleDeadLetterSelection,
    onUpdateReminder,
    onUpload: handleUpload,
    panelCopy,
    pauseReminderLabel: detailCopy.pauseReminder,
    refreshingMediaId,
    reminderForm,
    reminderNoteLabel: detailCopy.reminderNoteLabel,
    reminderNotePlaceholder: detailCopy.reminderNotePlaceholder,
    reminderSectionDescription: detailCopy.reminderSectionDescription,
    reminderSectionTitle: detailCopy.reminderSectionTitle,
    reminderTitleLabel: detailCopy.reminderTitleLabel,
    reminderTitlePlaceholder: detailCopy.reminderTitlePlaceholder,
    remindAtLabel: detailCopy.remindAtLabel,
    reminders,
    retryingMediaId,
    saving,
    savingReminder,
    savingReminderLabel: detailCopy.savingReminder,
    selectedDeadLetterIds,
    selectedLocationHistory,
    selectedLocationReview,
    selectedRecord,
    selectedRecordMediaSizeLabel,
    setForm,
    setLocationReviewForm,
    setReminderForm,
    summarizeHistoryActionLabel,
    untitledReminderLabel: detailCopy.untitledReminder,
    uploading,
    workspaceId,
  };
}
