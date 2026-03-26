"use client";

import { MediaAssetCardActions } from "./media-asset-card-actions";
import { MediaAssetCardIntro } from "./media-asset-card-intro";
import { MediaAssetCardMetadata } from "./media-asset-card-metadata";
import { MediaPreview } from "./media-preview";
import type { MediaAssetCardProps } from "./media-asset-card.types";

export function MediaAssetCard({
  asset,
  authToken,
  workspaceId,
  canWriteWorkspace,
  mediaIssueCopy,
  downloadingMediaId,
  refreshingMediaId,
  retryingMediaId,
  deletingMediaId,
  formatHistoryTimestampLabel,
  onDownloadMedia,
  onRefreshMedia,
  onRetryMediaProcessing,
  onDeleteMediaAsset,
}: MediaAssetCardProps) {
  return (
    <article className="record-card">
      <MediaAssetCardIntro asset={asset} />
      <MediaAssetCardMetadata
        asset={asset}
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        mediaIssueCopy={mediaIssueCopy}
      />
      {authToken ? (
        <div style={{ marginTop: 12 }}>
          <MediaPreview asset={asset} token={authToken} workspaceId={workspaceId} />
        </div>
      ) : null}
      {asset.extracted_text ? (
        <p style={{ margin: "10px 0 0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
          {asset.extracted_text.length > 280 ? `${asset.extracted_text.slice(0, 280)}...` : asset.extracted_text}
        </p>
      ) : null}
      {asset.processing_error ? (
        <div className="notice error" style={{ marginTop: 10 }}>
          {asset.processing_error}
        </div>
      ) : null}
      <MediaAssetCardActions
        asset={asset}
        canWriteWorkspace={canWriteWorkspace}
        deletingMediaId={deletingMediaId}
        downloadingMediaId={downloadingMediaId}
        mediaIssueCopy={mediaIssueCopy}
        onDeleteMediaAsset={onDeleteMediaAsset}
        onDownloadMedia={onDownloadMedia}
        onRefreshMedia={onRefreshMedia}
        onRetryMediaProcessing={onRetryMediaProcessing}
        refreshingMediaId={refreshingMediaId}
        retryingMediaId={retryingMediaId}
      />
    </article>
  );
}
