"use client";

import type { MediaAssetCardErrorProps } from "./media-asset-card-error.types";

export function MediaAssetCardError({ asset }: MediaAssetCardErrorProps) {
  return asset.processing_error ? <div className="notice error" style={{ marginTop: 10 }}>{asset.processing_error}</div> : null;
}
