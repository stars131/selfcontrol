"use client";
import type { MediaAssetCardProcessingSourceTagProps } from "./media-asset-card-processing-source-tag.types";
export function MediaAssetCardProcessingSourceTag({ processingSource }: MediaAssetCardProcessingSourceTagProps) { return processingSource ? <span className="tag">{processingSource}</span> : null; }
