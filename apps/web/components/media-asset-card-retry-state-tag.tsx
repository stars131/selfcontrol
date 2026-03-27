"use client";
import { getRetryStateLabel } from "../lib/media-issue-display";
import type { MediaAssetCardRetryStateTagProps } from "./media-asset-card-retry-state-tag.types";
export function MediaAssetCardRetryStateTag({ locale, mediaIssueCopy, retryState }: MediaAssetCardRetryStateTagProps) { return retryState && retryState !== "idle" ? <span className="tag">{mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, retryState)}</span> : null; }
