"use client";
import { buildMediaAssetCardPreviewMediaPreviewProps } from "./media-asset-card-preview-media-preview-props"; import { MediaPreview } from "./media-preview";
import type { MediaAssetCardPreviewProps } from "./media-asset-card-preview.types";
export function MediaAssetCardPreview({ asset, authToken, workspaceId }: MediaAssetCardPreviewProps) {
  return authToken ? <div style={{ marginTop: 12 }}><MediaPreview {...buildMediaAssetCardPreviewMediaPreviewProps({ asset, authToken, workspaceId })} /></div> : null;
}
