"use client";

import { buildMediaAssetCardDeleteButtonProps } from "./media-asset-card-delete-button-props";
import { MediaAssetCardDeleteButton } from "./media-asset-card-delete-button";
import { buildMediaAssetCardDownloadButtonProps } from "./media-asset-card-download-button-props";
import { MediaAssetCardDownloadButton } from "./media-asset-card-download-button";
import { buildMediaAssetCardRefreshButtonProps } from "./media-asset-card-refresh-button-props";
import { MediaAssetCardRefreshButton } from "./media-asset-card-refresh-button";
import { buildMediaAssetCardRetryButtonProps } from "./media-asset-card-retry-button-props";
import { MediaAssetCardRetryButton } from "./media-asset-card-retry-button";
import type { MediaAssetCardActionsProps } from "./media-asset-card-actions.types";

export function MediaAssetCardActions({
  asset,
  canWriteWorkspace,
  mediaIssueCopy,
  downloadingMediaId,
  refreshingMediaId,
  retryingMediaId,
  deletingMediaId,
  onDownloadMedia,
  onRefreshMedia,
  onRetryMediaProcessing,
  onDeleteMediaAsset,
}: MediaAssetCardActionsProps) {
  return (
    <div className="action-row" style={{ marginTop: 12 }}>
      <MediaAssetCardDownloadButton {...buildMediaAssetCardDownloadButtonProps({ asset, canWriteWorkspace, deletingMediaId, downloadingMediaId, mediaIssueCopy, onDeleteMediaAsset, onDownloadMedia, onRefreshMedia, onRetryMediaProcessing, refreshingMediaId, retryingMediaId })} />
      <MediaAssetCardRefreshButton {...buildMediaAssetCardRefreshButtonProps({ asset, canWriteWorkspace, deletingMediaId, downloadingMediaId, mediaIssueCopy, onDeleteMediaAsset, onDownloadMedia, onRefreshMedia, onRetryMediaProcessing, refreshingMediaId, retryingMediaId })} />
      <MediaAssetCardRetryButton {...buildMediaAssetCardRetryButtonProps({ asset, canWriteWorkspace, deletingMediaId, downloadingMediaId, mediaIssueCopy, onDeleteMediaAsset, onDownloadMedia, onRefreshMedia, onRetryMediaProcessing, refreshingMediaId, retryingMediaId })} />
      <MediaAssetCardDeleteButton {...buildMediaAssetCardDeleteButtonProps({ asset, canWriteWorkspace, deletingMediaId, downloadingMediaId, mediaIssueCopy, onDeleteMediaAsset, onDownloadMedia, onRefreshMedia, onRetryMediaProcessing, refreshingMediaId, retryingMediaId })} />
    </div>
  );
}
