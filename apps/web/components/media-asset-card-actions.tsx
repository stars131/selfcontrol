"use client";

import { buildMediaAssetCardDeleteButtonProps } from "./media-asset-card-delete-button-props";
import { MediaAssetCardDeleteButton } from "./media-asset-card-delete-button";
import { buildMediaAssetCardDownloadButtonProps } from "./media-asset-card-download-button-props";
import { MediaAssetCardDownloadButton } from "./media-asset-card-download-button";
import { buildMediaAssetCardRefreshButtonProps } from "./media-asset-card-refresh-button-props";
import { MediaAssetCardRefreshButton } from "./media-asset-card-refresh-button";
import { buildMediaAssetCardRetryButtonProps } from "./media-asset-card-retry-button-props";
import { MediaAssetCardRetryButton } from "./media-asset-card-retry-button";
import type { MediaAssetCardActionsProps } from "./media-asset-card-actions.types";

export function MediaAssetCardActions(props: MediaAssetCardActionsProps) {
  return (
    <div className="action-row" style={{ marginTop: 12 }}>
      <MediaAssetCardDownloadButton {...buildMediaAssetCardDownloadButtonProps(props)} />
      <MediaAssetCardRefreshButton {...buildMediaAssetCardRefreshButtonProps(props)} />
      <MediaAssetCardRetryButton {...buildMediaAssetCardRetryButtonProps(props)} />
      <MediaAssetCardDeleteButton {...buildMediaAssetCardDeleteButtonProps(props)} />
    </div>
  );
}
