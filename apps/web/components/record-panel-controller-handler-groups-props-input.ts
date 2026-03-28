"use client";
import type { RecordPanelControllerHandlerGroupPropsInput } from "./record-panel-controller-handler-group-props-input.types";
export function buildRecordPanelControllerHandlerGroupsPropsInput(
  input: RecordPanelControllerHandlerGroupPropsInput,
) {
  return {
    authToken: input.authToken,
    mediaDeadLetterOverview: input.mediaDeadLetterOverview,
    onApplyRecordFilter: input.onApplyRecordFilter,
    onBulkRetryMediaDeadLetter: input.onBulkRetryMediaDeadLetter,
    onCreateReminder: input.onCreateReminder,
    onCreateSearchPreset: input.onCreateSearchPreset,
    onDeleteMedia: input.onDeleteMedia,
    onDeleteRecord: input.onDeleteRecord,
    onDeleteSearchPreset: input.onDeleteSearchPreset,
    onRefreshMediaStatus: input.onRefreshMediaStatus,
    onRetryMedia: input.onRetryMedia,
    onSaveRecord: input.onSaveRecord,
    onUploadMedia: input.onUploadMedia,
    workspaceId: input.workspaceId,
  };
}
