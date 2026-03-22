"use client";

import type { MediaIssueCopy } from "../lib/record-panel-ui";
import type { MediaAsset } from "../lib/types";

type MediaAssetCardActionsProps = {
  asset: MediaAsset;
  canWriteWorkspace: boolean;
  mediaIssueCopy: MediaIssueCopy;
  downloadingMediaId: string | null;
  refreshingMediaId: string | null;
  retryingMediaId: string | null;
  deletingMediaId: string | null;
  onDownloadMedia: (asset: MediaAsset) => Promise<void>;
  onRefreshMedia: (mediaId: string) => Promise<void>;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
  onDeleteMediaAsset: (mediaId: string) => Promise<void>;
};

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
