"use client";

import type { BuildRecordMediaToolsCopyPropsInput } from "./record-editor-support-tools-media-copy-props.types";

export function buildRecordMediaToolsCopyProps({
  deleting,
  panelCopy,
  saving,
  selectedRecord,
}: BuildRecordMediaToolsCopyPropsInput) {
  return {
    allTrackedFilesPresentLabel: panelCopy.allTrackedFilesPresent,
    deleteButtonLabel: deleting ? panelCopy.deleting : panelCopy.deleteRecord,
    hasSelectedRecord: Boolean(selectedRecord),
    localLabel: panelCopy.local,
    missingFilesLabel: panelCopy.missingFiles,
    needsAttentionLabel: panelCopy.needsAttention,
    processingCompletedLabel: panelCopy.processingCompleted,
    queuedLabel: panelCopy.queued,
    queueStateLabel: panelCopy.queueState,
    remoteLabel: panelCopy.remote,
    saveButtonLabel: saving
      ? panelCopy.saving
      : selectedRecord
        ? panelCopy.updateRecord
        : panelCopy.createRecord,
    storageHealthLabel: panelCopy.storageHealth,
    storageMixLabel: panelCopy.storageMix,
    thisRecordMediaLabel: panelCopy.thisRecordMedia,
    uploadAttachmentLabel: panelCopy.uploadAttachment,
    uploadingMediaLabel: panelCopy.uploadingMedia,
    workspaceStorageLabel: panelCopy.workspaceStorage,
  };
}
