"use client";

import { MediaAssetCard } from "./media-asset-card";
import type { MediaAsset } from "../lib/types";
import type { MediaIssueCopy } from "../lib/record-panel-ui";

type MediaAssetSectionProps = {
  authToken: string | null;
  canWriteWorkspace: boolean;
  workspaceId: string;
  mediaAssets: MediaAsset[];
  mediaIssueCopy: MediaIssueCopy;
  noMediaLabel: string;
  largestFilePrefixLabel: string;
  largestItemName: string | null;
  largestItemSizeLabel: string | null;
  downloadingMediaId: string | null;
  refreshingMediaId: string | null;
  retryingMediaId: string | null;
  deletingMediaId: string | null;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  onDeleteMediaAsset: (mediaId: string) => Promise<void>;
  onDownloadMedia: (asset: MediaAsset) => Promise<void>;
  onRefreshMedia: (mediaId: string) => Promise<void>;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
};

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
