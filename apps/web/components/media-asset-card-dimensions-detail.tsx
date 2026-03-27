"use client";
import type { MediaAssetCardDimensionsDetailProps } from "./media-asset-card-dimensions-detail.types";
export function MediaAssetCardDimensionsDetail({ asset, mediaIssueCopy }: MediaAssetCardDimensionsDetailProps) { return typeof asset.metadata_json.width === "number" && typeof asset.metadata_json.height === "number" ? <div className="subtle-card"><div className="eyebrow">{mediaIssueCopy.dimensions}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{asset.metadata_json.width} x {asset.metadata_json.height}</div></div> : null; }
