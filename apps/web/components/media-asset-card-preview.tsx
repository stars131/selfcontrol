"use client";
import { buildMediaAssetCardPreviewMediaPreviewProps } from "./media-asset-card-preview-media-preview-props"; import { MediaPreview } from "./media-preview";
import type { MediaAssetCardPreviewProps } from "./media-asset-card-preview.types";
export function MediaAssetCardPreview(props: MediaAssetCardPreviewProps) {
  const authToken = props.authToken;
  return authToken ? <div style={{ marginTop: 12 }}><MediaPreview {...buildMediaAssetCardPreviewMediaPreviewProps({ ...props, authToken })} /></div> : null;
}
