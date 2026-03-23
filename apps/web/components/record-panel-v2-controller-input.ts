"use client";

import type { RecordPanelV2Props } from "./record-panel-v2.types";

export function buildRecordPanelControllerInput(props: RecordPanelV2Props) {
  return {
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
  };
}
