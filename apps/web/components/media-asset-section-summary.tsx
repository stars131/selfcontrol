"use client";

import type { MediaAssetSectionSummaryProps } from "./media-asset-section-summary.types";

export function MediaAssetSectionSummary({ largestFilePrefixLabel, largestItemName, largestItemSizeLabel }: MediaAssetSectionSummaryProps) {
  return largestItemName ? <div className="muted" style={{ marginBottom: 16 }}>{largestFilePrefixLabel}: {largestItemName}{largestItemSizeLabel ? ` (${largestItemSizeLabel})` : ""}</div> : null;
}
