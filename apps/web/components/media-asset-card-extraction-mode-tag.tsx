"use client";
import type { MediaAssetCardExtractionModeTagProps } from "./media-asset-card-extraction-mode-tag.types";
export function MediaAssetCardExtractionModeTag({ extractionMode }: MediaAssetCardExtractionModeTagProps) { return extractionMode ? <span className="tag">{extractionMode}</span> : null; }
