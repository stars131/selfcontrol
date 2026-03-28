"use client";
import type { MediaAssetCardTextCharCountDetailProps } from "./media-asset-card-text-char-count-detail.types";
export function MediaAssetCardTextCharCountDetail({ asset, mediaIssueCopy }: MediaAssetCardTextCharCountDetailProps) { return typeof asset.metadata_json.text_char_count === "number" ? <div className="subtle-card"><div className="eyebrow">{mediaIssueCopy.textChars}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{asset.metadata_json.text_char_count}</div></div> : null; }
