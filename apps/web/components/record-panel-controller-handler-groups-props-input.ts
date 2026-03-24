"use client";
import type { RecordPanelControllerHandlerGroupPropsInput } from "./record-panel-controller-handler-group-props-input.types";
export function buildRecordPanelControllerHandlerGroupsPropsInput(
  props: RecordPanelControllerHandlerGroupPropsInput,
) {
  return {
    authToken: props.authToken,
    mediaDeadLetterOverview: props.mediaDeadLetterOverview,
    onApplyRecordFilter: props.onApplyRecordFilter,
    onBulkRetryMediaDeadLetter: props.onBulkRetryMediaDeadLetter,
    onCreateReminder: props.onCreateReminder,
    onCreateSearchPreset: props.onCreateSearchPreset,
    onDeleteMedia: props.onDeleteMedia,
    onDeleteRecord: props.onDeleteRecord,
    onDeleteSearchPreset: props.onDeleteSearchPreset,
    onRefreshMediaStatus: props.onRefreshMediaStatus,
    onRetryMedia: props.onRetryMedia,
    onSaveRecord: props.onSaveRecord,
    onUploadMedia: props.onUploadMedia,
    workspaceId: props.workspaceId,
  };
}
