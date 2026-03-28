"use client";

import type { BuildRecordEditorWorkspacePropInputArgs } from "./record-panel-v2-editor-workspace-prop-input.types";

export function buildRecordEditorWorkspacePropInput(props: BuildRecordEditorWorkspacePropInputArgs) {
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
