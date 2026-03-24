"use client";
import type { ControllerProps } from "./record-panel-controller.types";
export function buildRecordPanelControllerHandlerGroupsPropsInput(
  props: Pick<
    ControllerProps,
    | "authToken"
    | "mediaDeadLetterOverview"
    | "onApplyRecordFilter"
    | "onBulkRetryMediaDeadLetter"
    | "onCreateReminder"
    | "onCreateSearchPreset"
    | "onDeleteMedia"
    | "onDeleteRecord"
    | "onDeleteSearchPreset"
    | "onRefreshMediaStatus"
    | "onRetryMedia"
    | "onSaveRecord"
    | "onUploadMedia"
    | "workspaceId"
  >,
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
