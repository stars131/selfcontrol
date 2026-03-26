"use client";

import { MediaAssetCardActions } from "./media-asset-card-actions";
import { MediaAssetCardError } from "./media-asset-card-error";
import { MediaAssetCardExtractedText } from "./media-asset-card-extracted-text";
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
      <MediaAssetCardExtractedText asset={asset} />
      <MediaAssetCardError asset={asset} />
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
