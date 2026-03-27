"use client";
import { getRemoteFetchStatusLabel } from "../lib/media-issue-display";
import type { RecentMediaIssueCardRemoteFetchTagProps } from "./recent-media-issue-card-remote-fetch-tag.types";
export function RecentMediaIssueCardRemoteFetchTag({ issue, locale, mediaIssueCopy }: RecentMediaIssueCardRemoteFetchTagProps) { return issue.remote_fetch_status ? <span className="tag">{mediaIssueCopy.fetchPrefix} {getRemoteFetchStatusLabel(locale, issue.remote_fetch_status)}</span> : null; }
