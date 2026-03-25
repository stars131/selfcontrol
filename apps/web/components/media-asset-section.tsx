"use client";

import { MediaAssetCard } from "./media-asset-card";
import type { MediaAssetSectionProps } from "./media-asset-section.types";

export function MediaAssetSection({
  authToken,
  canWriteWorkspace,
  workspaceId,
  mediaAssets,
  mediaIssueCopy,
  noMediaLabel,
  largestFilePrefixLabel,
  largestItemName,
  largestItemSizeLabel,
  downloadingMediaId,
  refreshingMediaId,
  retryingMediaId,
  deletingMediaId,
  formatHistoryTimestampLabel,
  onDeleteMediaAsset,
  onDownloadMedia,
  onRefreshMedia,
  onRetryMediaProcessing,
}: MediaAssetSectionProps) {
  return (
    <>
      {largestItemName ? (
        <div className="muted" style={{ marginBottom: 16 }}>
          {largestFilePrefixLabel}: {largestItemName}
          {largestItemSizeLabel ? ` (${largestItemSizeLabel})` : ""}
        </div>
      ) : null}
      <div className="record-list compact-list">
        {mediaAssets.length ? (
          mediaAssets.map((asset) => (
            <MediaAssetCard
              asset={asset}
              authToken={authToken}
              canWriteWorkspace={canWriteWorkspace}
              deletingMediaId={deletingMediaId}
              downloadingMediaId={downloadingMediaId}
              formatHistoryTimestampLabel={formatHistoryTimestampLabel}
              key={asset.id}
              mediaIssueCopy={mediaIssueCopy}
              onDeleteMediaAsset={onDeleteMediaAsset}
              onDownloadMedia={onDownloadMedia}
              onRefreshMedia={onRefreshMedia}
              onRetryMediaProcessing={onRetryMediaProcessing}
              refreshingMediaId={refreshingMediaId}
              retryingMediaId={retryingMediaId}
              workspaceId={workspaceId}
            />
          ))
        ) : (
          <div className="notice">{noMediaLabel}</div>
        )}
      </div>
    </>
  );
}
