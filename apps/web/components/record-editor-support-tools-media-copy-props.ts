"use client";

import type { BuildRecordMediaToolsCopyPropsInput } from "./record-editor-support-tools-media-copy-props.types";

export function buildRecordMediaToolsCopyProps(input: BuildRecordMediaToolsCopyPropsInput) {
  return {
    allTrackedFilesPresentLabel: input.panelCopy.allTrackedFilesPresent,
    deleteButtonLabel: input.deleting ? input.panelCopy.deleting : input.panelCopy.deleteRecord,
    hasSelectedRecord: Boolean(input.selectedRecord),
    localLabel: input.panelCopy.local,
    missingFilesLabel: input.panelCopy.missingFiles,
    needsAttentionLabel: input.panelCopy.needsAttention,
    processingCompletedLabel: input.panelCopy.processingCompleted,
    queuedLabel: input.panelCopy.queued,
    queueStateLabel: input.panelCopy.queueState,
    remoteLabel: input.panelCopy.remote,
    saveButtonLabel: input.saving
      ? input.panelCopy.saving
      : input.selectedRecord
        ? input.panelCopy.updateRecord
        : input.panelCopy.createRecord,
    storageHealthLabel: input.panelCopy.storageHealth,
    storageMixLabel: input.panelCopy.storageMix,
    thisRecordMediaLabel: input.panelCopy.thisRecordMedia,
    uploadAttachmentLabel: input.panelCopy.uploadAttachment,
    uploadingMediaLabel: input.panelCopy.uploadingMedia,
    workspaceStorageLabel: input.panelCopy.workspaceStorage,
  };
}
