"use client";

import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";

export function buildRecordEditorWorkspacePropInput({ props }: Pick<RecordPanelShellInput, "props">) {
  return {
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
  };
}
