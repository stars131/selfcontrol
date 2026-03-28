"use client";
import type { MediaAssetCardTextLineCountDetailProps } from "./media-asset-card-text-line-count-detail.types";
export function MediaAssetCardTextLineCountDetail({ asset, mediaIssueCopy }: MediaAssetCardTextLineCountDetailProps) { return typeof asset.metadata_json.text_line_count === "number" ? <div className="subtle-card"><div className="eyebrow">{mediaIssueCopy.textLines}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{asset.metadata_json.text_line_count}</div></div> : null; }
