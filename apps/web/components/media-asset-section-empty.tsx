"use client";

import type { MediaAssetSectionEmptyProps } from "./media-asset-section-empty.types";

export function MediaAssetSectionEmpty({ noMediaLabel }: MediaAssetSectionEmptyProps) {
  return <div className="notice">{noMediaLabel}</div>;
}
