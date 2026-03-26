"use client";

import { MediaAssetCardActions } from "./media-asset-card-actions";
import { MediaAssetCardError } from "./media-asset-card-error";
import { MediaAssetCardExtractedText } from "./media-asset-card-extracted-text";
import { MediaAssetCardIntro } from "./media-asset-card-intro";
import { MediaAssetCardMetadata } from "./media-asset-card-metadata";
import { MediaAssetCardPreview } from "./media-asset-card-preview";
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
      <MediaAssetCardPreview asset={asset} authToken={authToken} workspaceId={workspaceId} />
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
