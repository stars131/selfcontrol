"use client";

import { MediaAssetCardDownloadButton } from "./media-asset-card-download-button";
import { MediaAssetCardRefreshButton } from "./media-asset-card-refresh-button";
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
      {asset.processing_status !== "completed" ? (
        <button
          className="button secondary"
          type="button"
          disabled={retryingMediaId === asset.id}
          onClick={() => void onRetryMediaProcessing(asset.id)}
        >
          {retryingMediaId === asset.id ? mediaIssueCopy.retrying : mediaIssueCopy.retry}
        </button>
      ) : null}
      <button
        className="button secondary"
        type="button"
        disabled={deletingMediaId === asset.id || !canWriteWorkspace}
        onClick={() => void onDeleteMediaAsset(asset.id)}
      >
        {deletingMediaId === asset.id ? mediaIssueCopy.deleting : mediaIssueCopy.deleteMedia}
      </button>
    </div>
  );
}
