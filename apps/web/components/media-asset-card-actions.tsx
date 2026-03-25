"use client";

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
      <button
        className="button secondary"
        type="button"
        disabled={downloadingMediaId === asset.id}
        onClick={() => void onDownloadMedia(asset)}
      >
        {downloadingMediaId === asset.id ? mediaIssueCopy.downloading : mediaIssueCopy.download}
      </button>
      <button
        className="button secondary"
        type="button"
        disabled={refreshingMediaId === asset.id}
        onClick={() => void onRefreshMedia(asset.id)}
      >
        {refreshingMediaId === asset.id ? mediaIssueCopy.refreshing : mediaIssueCopy.refreshStatus}
      </button>
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
