"use client";

import { MediaAssetCardDownloadButton } from "./media-asset-card-download-button";
import { MediaAssetCardDeleteButton } from "./media-asset-card-delete-button";
import { MediaAssetCardRefreshButton } from "./media-asset-card-refresh-button";
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
      <MediaAssetCardDownloadButton
        asset={asset}
        downloadingMediaId={downloadingMediaId}
        mediaIssueCopy={mediaIssueCopy}
        onDownloadMedia={onDownloadMedia}
      />
      <MediaAssetCardRefreshButton
        asset={asset}
        mediaIssueCopy={mediaIssueCopy}
        onRefreshMedia={onRefreshMedia}
        refreshingMediaId={refreshingMediaId}
      />
      <MediaAssetCardRetryButton
        asset={asset}
        mediaIssueCopy={mediaIssueCopy}
        onRetryMediaProcessing={onRetryMediaProcessing}
        retryingMediaId={retryingMediaId}
      />
      <MediaAssetCardDeleteButton
        asset={asset}
        canWriteWorkspace={canWriteWorkspace}
        deletingMediaId={deletingMediaId}
        mediaIssueCopy={mediaIssueCopy}
        onDeleteMediaAsset={onDeleteMediaAsset}
      />
    </div>
  );
}
