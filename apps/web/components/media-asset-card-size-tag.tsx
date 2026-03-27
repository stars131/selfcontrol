"use client";
import { formatMediaSize } from "../lib/record-panel-format";
import type { MediaAssetCardSizeTagProps } from "./media-asset-card-size-tag.types";
export function MediaAssetCardSizeTag({ asset }: MediaAssetCardSizeTagProps) { return <span className="tag">{formatMediaSize(asset)}</span>; }
