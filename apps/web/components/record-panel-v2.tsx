"use client";

import { RecordBrowseWorkspace } from "./record-browse-workspace";
import { RecordEditorWorkspace } from "./record-editor-workspace";
import { RecordPanelHeader } from "./record-panel-header";
import type { RecordPanelV2Props } from "./record-panel-v2.types";
import {
  buildRecordBrowseWorkspaceProps,
  buildRecordEditorWorkspaceProps,
} from "./record-panel-v2-workspace-props";
import { useRecordPanelController } from "./use-record-panel-controller";

export function RecordPanelV2({
  ...props
}: RecordPanelV2Props) {
  const controller = useRecordPanelController({
    authToken: props.authToken,
    workspaceId: props.workspaceId,
    records: props.records,
    selectedRecordId: props.selectedRecordId,
    mediaAssets: props.mediaAssets,
    mediaDeadLetterOverview: props.mediaDeadLetterOverview,
    onSaveRecord: props.onSaveRecord,
    onCreateReminder: props.onCreateReminder,
    onDeleteMedia: props.onDeleteMedia,
    onDeleteRecord: props.onDeleteRecord,
    onBulkRetryMediaDeadLetter: props.onBulkRetryMediaDeadLetter,
    onRefreshMediaStatus: props.onRefreshMediaStatus,
    onApplyRecordFilter: props.onApplyRecordFilter,
    onCreateSearchPreset: props.onCreateSearchPreset,
    onDeleteSearchPreset: props.onDeleteSearchPreset,
    onRetryMedia: props.onRetryMedia,
    onUploadMedia: props.onUploadMedia,
    recordFilter: props.recordFilter,
  });
  const browseWorkspaceProps = buildRecordBrowseWorkspaceProps({
    canWriteWorkspace: props.canWriteWorkspace,
    records: props.records,
    timelineDays: props.timelineDays,
    selectedRecordId: props.selectedRecordId,
    recordFilter: props.recordFilter,
    searchPresets: props.searchPresets,
    onApplyLocationFilter: props.onApplyLocationFilter,
    onApplyRecordFilter: props.onApplyRecordFilter,
    onResetFilter: props.onResetFilter,
    onSelectRecord: props.onSelectRecord,
    avoidCount: controller.avoidCount,
    detailCopy: controller.detailCopy,
    filterDraft: controller.filterDraft,
    filteringRecords: props.filteringRecords,
    foodCount: controller.foodCount,
    form: controller.form,
    formatAvoidCountLabel: controller.formatAvoidCountLabel,
    formatRecordTimestampLabel: controller.formatRecordTimestampLabel,
    formatReviewStatusLabel: controller.formatReviewStatusLabel,
    formatTimelineCountLabel: controller.formatTimelineCountLabel,
    formatTimelineDateLabel: controller.formatTimelineDateLabel,
    handleApplyFilter: controller.handleApplyFilter,
    handleDeletePreset: controller.handleDeletePreset,
    handleSavePreset: controller.handleSavePreset,
    panelCopy: controller.panelCopy,
    presetName: controller.presetName,
    savingSearchPreset: props.savingSearchPreset,
    setFilterDraft: controller.setFilterDraft,
    setForm: controller.setForm,
    setPresetName: controller.setPresetName,
    setViewMode: controller.setViewMode,
    summarizeRecordFilterLabel: controller.summarizeRecordFilterLabel,
    viewMode: controller.viewMode,
  });
  const editorWorkspaceProps = buildRecordEditorWorkspaceProps({
    authToken: props.authToken,
    canWriteWorkspace: props.canWriteWorkspace,
    workspaceId: props.workspaceId,
    mediaAssets: props.mediaAssets,
    mediaDeadLetterOverview: props.mediaDeadLetterOverview,
    mediaProcessingOverview: props.mediaProcessingOverview,
    mediaStorageSummary: props.mediaStorageSummary,
    reminders: props.reminders,
    onDeleteReminder: props.onDeleteReminder,
    onUpdateReminder: props.onUpdateReminder,
    bulkRetryingDeadLetter: controller.bulkRetryingDeadLetter,
    deleting: controller.deleting,
    deletingMediaId: controller.deletingMediaId,
    detailCopy: controller.detailCopy,
    downloadingMediaId: controller.downloadingMediaId,
    error: controller.error,
    form: controller.form,
    formatFileCountLabel: controller.formatFileCountLabel,
    formatHistoryTimestampLabel: controller.formatHistoryTimestampLabel,
    formatReminderEnabledLabel: controller.formatReminderEnabledLabel,
    formatReminderStatusLabel: controller.formatReminderStatusLabel,
    formatReminderTimestampLabel: controller.formatReminderTimestampLabel,
    formatReviewStatusLabel: controller.formatReviewStatusLabel,
    handleBulkRetryDeadLetter: controller.handleBulkRetryDeadLetter,
    handleClearDeadLetterSelection: controller.handleClearDeadLetterSelection,
    handleCreateReminderSubmit: controller.handleCreateReminderSubmit,
    handleDelete: controller.handleDelete,
    handleDeleteMediaAsset: controller.handleDeleteMediaAsset,
    handleDownloadMedia: controller.handleDownloadMedia,
    handleRefreshMedia: controller.handleRefreshMedia,
    handleRetryMediaProcessing: controller.handleRetryMediaProcessing,
    handleSelectAllDeadLetter: controller.handleSelectAllDeadLetter,
    handleSubmit: controller.handleSubmit,
    handleToggleDeadLetterSelection: controller.handleToggleDeadLetterSelection,
    handleUpload: controller.handleUpload,
    locale: controller.locale,
    locationReviewForm: controller.locationReviewForm,
    mediaIssueCopy: controller.mediaIssueCopy,
    panelCopy: controller.panelCopy,
    refreshingMediaId: controller.refreshingMediaId,
    reminderForm: controller.reminderForm,
    retryingMediaId: controller.retryingMediaId,
    saving: controller.saving,
    savingReminder: controller.savingReminder,
    selectedDeadLetterIds: controller.selectedDeadLetterIds,
    selectedLocationHistory: controller.selectedLocationHistory,
    selectedLocationReview: controller.selectedLocationReview,
    selectedRecord: controller.selectedRecord,
    selectedRecordMediaSizeLabel: controller.selectedRecordMediaSizeLabel,
    setForm: controller.setForm,
    setLocationReviewForm: controller.setLocationReviewForm,
    setReminderForm: controller.setReminderForm,
    summarizeHistoryActionLabel: controller.summarizeHistoryActionLabel,
    uploading: controller.uploading,
  });

  return (
    <section className="panel">
      <RecordPanelHeader
        canWriteWorkspace={props.canWriteWorkspace}
        onCreateRecord={() => props.onSelectRecord(null)}
        panelCopy={controller.panelCopy}
        workspaceId={props.workspaceId}
      />
      <div className="panel-body">
        <RecordBrowseWorkspace {...browseWorkspaceProps} />
        <RecordEditorWorkspace {...editorWorkspaceProps} />
      </div>
    </section>
  );
}
