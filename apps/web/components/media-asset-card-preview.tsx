"use client";

import { MediaPreview } from "./media-preview";
import type { MediaAssetCardPreviewProps } from "./media-asset-card-preview.types";

export function MediaAssetCardPreview({ asset, authToken, workspaceId }: MediaAssetCardPreviewProps) {
  return authToken ? <div style={{ marginTop: 12 }}><MediaPreview asset={asset} token={authToken} workspaceId={workspaceId} /></div> : null;
}
