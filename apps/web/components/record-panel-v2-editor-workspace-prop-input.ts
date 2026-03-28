"use client";

import type { BuildRecordEditorWorkspacePropInputArgs } from "./record-panel-v2-editor-workspace-prop-input.types";

export function buildRecordEditorWorkspacePropInput(input: BuildRecordEditorWorkspacePropInputArgs) {
  return {
    authToken: input.authToken,
    canWriteWorkspace: input.canWriteWorkspace,
    workspaceId: input.workspaceId,
    mediaAssets: input.mediaAssets,
    mediaDeadLetterOverview: input.mediaDeadLetterOverview,
    mediaProcessingOverview: input.mediaProcessingOverview,
    mediaStorageSummary: input.mediaStorageSummary,
    reminders: input.reminders,
    onDeleteReminder: input.onDeleteReminder,
    onUpdateReminder: input.onUpdateReminder,
  };
}
