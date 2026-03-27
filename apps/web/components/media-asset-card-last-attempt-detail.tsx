"use client";
import type { MediaAssetCardLastAttemptDetailProps } from "./media-asset-card-last-attempt-detail.types";
export function MediaAssetCardLastAttemptDetail({ formatHistoryTimestampLabel, lastAttemptAt, mediaIssueCopy }: MediaAssetCardLastAttemptDetailProps) { return lastAttemptAt ? <div className="subtle-card"><div className="eyebrow">{mediaIssueCopy.lastAttempt}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{formatHistoryTimestampLabel(lastAttemptAt)}</div></div> : null; }
