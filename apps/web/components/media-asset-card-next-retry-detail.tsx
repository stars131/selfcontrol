"use client";
import type { MediaAssetCardNextRetryDetailProps } from "./media-asset-card-next-retry-detail.types";
export function MediaAssetCardNextRetryDetail({ formatHistoryTimestampLabel, mediaIssueCopy, nextRetryAt }: MediaAssetCardNextRetryDetailProps) { return nextRetryAt ? <div className="subtle-card"><div className="eyebrow">{mediaIssueCopy.nextRetry}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{formatHistoryTimestampLabel(nextRetryAt)}</div></div> : null; }
