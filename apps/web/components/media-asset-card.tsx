"use client";

import { MediaAssetCardActions } from "./media-asset-card-actions";
import { buildMediaAssetCardActionsProps } from "./media-asset-card-actions-props";
import { MediaAssetCardError } from "./media-asset-card-error";
import { buildMediaAssetCardErrorProps } from "./media-asset-card-error-props";
import { MediaAssetCardExtractedText } from "./media-asset-card-extracted-text";
import { buildMediaAssetCardExtractedTextProps } from "./media-asset-card-extracted-text-props";
import { buildMediaAssetCardIntroProps } from "./media-asset-card-intro-props";
import { MediaAssetCardIntro } from "./media-asset-card-intro";
import { buildMediaAssetCardMetadataProps } from "./media-asset-card-metadata-props";
import { MediaAssetCardMetadata } from "./media-asset-card-metadata";
import { buildMediaAssetCardPreviewProps } from "./media-asset-card-preview-props";
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
      <MediaAssetCardIntro {...buildMediaAssetCardIntroProps({ asset })} />
      <MediaAssetCardMetadata
        {...buildMediaAssetCardMetadataProps({ asset, formatHistoryTimestampLabel, mediaIssueCopy })}
      />
      <MediaAssetCardPreview {...buildMediaAssetCardPreviewProps({ asset, authToken, workspaceId })} />
      <MediaAssetCardExtractedText {...buildMediaAssetCardExtractedTextProps({ asset })} />
      <MediaAssetCardError {...buildMediaAssetCardErrorProps({ asset })} />
      <MediaAssetCardActions
        {...buildMediaAssetCardActionsProps({
          asset,
          canWriteWorkspace,
          deletingMediaId,
          downloadingMediaId,
          mediaIssueCopy,
          onDeleteMediaAsset,
          onDownloadMedia,
          onRefreshMedia,
          onRetryMediaProcessing,
          refreshingMediaId,
          retryingMediaId,
        })}
      />
    </article>
  );
}
