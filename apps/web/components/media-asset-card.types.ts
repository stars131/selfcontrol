"use client";

import type { MediaIssueCopy } from "../lib/record-panel-ui";
import type { MediaAsset } from "../lib/types";

export type MediaAssetCardProps = {
  asset: MediaAsset;
  authToken: string | null;
  workspaceId: string;
  canWriteWorkspace: boolean;
  mediaIssueCopy: MediaIssueCopy;
  downloadingMediaId: string | null;
  refreshingMediaId: string | null;
  retryingMediaId: string | null;
  deletingMediaId: string | null;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  onDownloadMedia: (asset: MediaAsset) => Promise<void>;
  onRefreshMedia: (mediaId: string) => Promise<void>;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
  onDeleteMediaAsset: (mediaId: string) => Promise<void>;
};
