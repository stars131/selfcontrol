"use client";

import type { MediaAssetCardExtractedTextProps } from "./media-asset-card-extracted-text.types";

export function MediaAssetCardExtractedText({ asset }: MediaAssetCardExtractedTextProps) {
  return asset.extracted_text ? <p style={{ margin: "10px 0 0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{asset.extracted_text.length > 280 ? `${asset.extracted_text.slice(0, 280)}...` : asset.extracted_text}</p> : null;
}
