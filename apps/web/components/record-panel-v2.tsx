"use client";

import { RecordBrowseWorkspace } from "./record-browse-workspace";
import { RecordEditorWorkspace } from "./record-editor-workspace";
import type { RecordPanelV2Props } from "./record-panel-v2.types";
import { useRecordPanelController } from "./use-record-panel-controller";

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
}: RecordPanelV2Props) {
  const {
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
    selectedRecordMediaSizeLabel,
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
    handleSubmit,
    handleDelete,
    handleUpload,
    handleCreateReminderSubmit,
    handleRefreshMedia,
    handleRetryMediaProcessing,
    handleToggleDeadLetterSelection,
    handleSelectAllDeadLetter,
    handleClearDeadLetterSelection,
    handleBulkRetryDeadLetter,
    handleDownloadMedia,
    handleDeleteMediaAsset,
    handleApplyFilter,
    handleSavePreset,
    handleDeletePreset,
  } = useRecordPanelController({
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
  });

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
        <RecordBrowseWorkspace
          applyPresetLabel={panelCopy.applyPreset}
          avoidCount={avoidCount}
          avoidRecordLabel={detailCopy.avoidLabel}
          avoidStatsLabel={panelCopy.avoid}
          canWriteWorkspace={canWriteWorkspace}
          currentFilterSummary={summarizeRecordFilterLabel(recordFilter)}
          deletePresetLabel={panelCopy.deletePreset}
          draftLocation={canWriteWorkspace ? form.location : null}
          filteringRecords={filteringRecords}
          filterDraft={filterDraft}
          flatListViewLabel={detailCopy.flatListView}
          foodCount={foodCount}
          foodLabel={panelCopy.food}
          formatAvoidCountLabel={formatAvoidCountLabel}
          formatRecordTimestampLabel={formatRecordTimestampLabel}
          formatReviewStatusLabel={formatReviewStatusLabel}
          formatTimelineCountLabel={formatTimelineCountLabel}
          formatTimelineDateLabel={formatTimelineDateLabel}
          mapPrefixLabel={detailCopy.mapPrefix}
          noContentLabel={detailCopy.noContent}
          noRecordsLabel={detailCopy.noRecords}
          noSavedFiltersLabel={panelCopy.noSavedFilters}
          onApplyFilter={handleApplyFilter}
          onApplyLocationFilter={onApplyLocationFilter}
          onApplyPreset={onApplyRecordFilter}
          onDeletePreset={handleDeletePreset}
          onDraftLocationChange={
            canWriteWorkspace
              ? (nextLocation) =>
                  setForm((prev) => ({
                    ...prev,
                    location: nextLocation,
                  }))
              : undefined
          }
          onResetFilter={onResetFilter}
          onSavePreset={handleSavePreset}
          onSelectRecord={onSelectRecord}
          panelCopy={panelCopy}
          presetName={presetName}
          ratingPrefixLabel={detailCopy.ratingPrefix}
          recordFilter={recordFilter}
          records={records}
          savedPresetLabel={panelCopy.savedPreset}
          savingSearchPreset={savingSearchPreset}
          searchPresets={searchPresets}
          selectedRecordId={selectedRecordId}
          setFilterDraft={setFilterDraft}
          setPresetName={setPresetName}
          setViewMode={setViewMode}
          summarizeRecordFilterLabel={summarizeRecordFilterLabel}
          timelineDayLabel={detailCopy.timelineDayLabel}
          timelineDays={timelineDays}
          timelineViewLabel={detailCopy.timelineView}
          unknownPlaceLabel={detailCopy.unknownPlace}
          untitledRecordLabel={detailCopy.untitledRecord}
          viewMode={viewMode}
          visibleRecordCount={records.length}
          visibleRecordsLabel={panelCopy.visibleRecords}
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
          selectedRecordMediaSizeLabel={selectedRecordMediaSizeLabel}
          setForm={setForm}
          setLocationReviewForm={setLocationReviewForm}
          setReminderForm={setReminderForm}
          summarizeHistoryActionLabel={summarizeHistoryActionLabel}
          untitledReminderLabel={detailCopy.untitledReminder}
          uploading={uploading}
          workspaceId={workspaceId}
        />
      </div>
    </section>
  );
}
