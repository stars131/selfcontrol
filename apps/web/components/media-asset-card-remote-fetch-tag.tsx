"use client";
import { getRemoteFetchStatusLabel } from "../lib/media-issue-display";
import type { MediaAssetCardRemoteFetchTagProps } from "./media-asset-card-remote-fetch-tag.types";
export function MediaAssetCardRemoteFetchTag({ locale, mediaIssueCopy, remoteFetchStatus }: MediaAssetCardRemoteFetchTagProps) { return remoteFetchStatus ? <span className="tag">{mediaIssueCopy.fetchPrefix} {getRemoteFetchStatusLabel(locale, remoteFetchStatus)}</span> : null; }
