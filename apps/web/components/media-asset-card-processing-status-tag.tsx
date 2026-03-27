"use client";
import { getProcessingStatusLabel } from "../lib/media-issue-display";
import type { MediaAssetCardProcessingStatusTagProps } from "./media-asset-card-processing-status-tag.types";
export function MediaAssetCardProcessingStatusTag({ asset, locale }: MediaAssetCardProcessingStatusTagProps) { return <span className="tag">{getProcessingStatusLabel(locale, asset.processing_status)}</span>; }
