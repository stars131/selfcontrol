"use client";

import type { ComponentProps } from "react";

import { MediaAssetSection } from "./media-asset-section";
import { MediaStorageOverview } from "./media-storage-overview";
import { RecordMediaProcessingPanels } from "./record-media-processing-panels";
import type { RecordMediaSelectedContentProps } from "./record-media-selected-content.types";

type MediaStorageOverviewProps = ComponentProps<typeof MediaStorageOverview>;
type RecordMediaProcessingPanelsProps = ComponentProps<typeof RecordMediaProcessingPanels>;
type MediaAssetSectionProps = ComponentProps<typeof MediaAssetSection>;

export function buildMediaStorageOverviewProps(
  props: RecordMediaSelectedContentProps,
): MediaStorageOverviewProps {
  return {
    allTrackedFilesPresentLabel: props.allTrackedFilesPresentLabel,
    formatFileCountLabel: props.formatFileCountLabel,
    localLabel: props.localLabel,
    mediaAssetCount: props.mediaAssets.length,
    mediaProcessingOverview: props.mediaProcessingOverview,
    mediaStorageSummary: props.mediaStorageSummary,
    missingFilesLabel: props.missingFilesLabel,
    needsAttentionLabel: props.needsAttentionLabel,
    processingCompletedLabel: props.processingCompletedLabel,
    queuedLabel: props.queuedLabel,
    queueStateLabel: props.queueStateLabel,
    remoteLabel: props.remoteLabel,
    selectedRecordMediaSizeLabel: props.selectedRecordMediaSizeLabel,
    storageHealthLabel: props.storageHealthLabel,
    storageMixLabel: props.storageMixLabel,
    thisRecordMediaLabel: props.thisRecordMediaLabel,
    workspaceStorageLabel: props.workspaceStorageLabel,
  };
}

export function buildRecordMediaProcessingPanelsProps(
  props: RecordMediaSelectedContentProps,
): RecordMediaProcessingPanelsProps {
  return {
    bulkRetryingDeadLetter: props.bulkRetryingDeadLetter,
    canWriteWorkspace: props.canWriteWorkspace,
    formatHistoryTimestampLabel: props.formatHistoryTimestampLabel,
    locale: props.locale,
    mediaDeadLetterOverview: props.mediaDeadLetterOverview,
    mediaIssueCopy: props.mediaIssueCopy,
    mediaProcessingOverview: props.mediaProcessingOverview,
    onBulkRetryAllDeadLetter: props.onBulkRetryAllDeadLetter,
    onBulkRetrySelectedDeadLetter: props.onBulkRetrySelectedDeadLetter,
    onClearDeadLetterSelection: props.onClearDeadLetterSelection,
    onRetryMediaProcessing: props.onRetryMediaProcessing,
    onSelectAllDeadLetter: props.onSelectAllDeadLetter,
    onToggleDeadLetterSelection: props.onToggleDeadLetterSelection,
    retryingMediaId: props.retryingMediaId,
    selectedDeadLetterIds: props.selectedDeadLetterIds,
    workspaceId: props.workspaceId,
  };
}

export function buildMediaAssetSectionProps(
  props: RecordMediaSelectedContentProps,
): MediaAssetSectionProps {
  return {
    authToken: props.authToken,
    canWriteWorkspace: props.canWriteWorkspace,
    deletingMediaId: props.deletingMediaId,
    downloadingMediaId: props.downloadingMediaId,
    formatHistoryTimestampLabel: props.formatHistoryTimestampLabel,
    largestFilePrefixLabel: props.largestFilePrefixLabel,
    largestItemName: props.mediaStorageSummary?.largest_item_name ?? null,
    largestItemSizeLabel: props.mediaStorageSummary?.largest_item_size_label ?? null,
    mediaAssets: props.mediaAssets,
    mediaIssueCopy: props.mediaIssueCopy,
    noMediaLabel: props.noMediaLabel,
    onDeleteMediaAsset: props.onDeleteMediaAsset,
    onDownloadMedia: props.onDownloadMedia,
    onRefreshMedia: props.onRefreshMedia,
    onRetryMediaProcessing: props.onRetryMediaProcessing,
    refreshingMediaId: props.refreshingMediaId,
    retryingMediaId: props.retryingMediaId,
    workspaceId: props.workspaceId,
  };
}
