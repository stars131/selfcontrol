"use client";
import { getRetryStateLabel } from "../lib/media-issue-display";
import type { RecentMediaIssueCardRetryStateTagProps } from "./recent-media-issue-card-retry-state-tag.types";
export function RecentMediaIssueCardRetryStateTag({ issue, locale, mediaIssueCopy }: RecentMediaIssueCardRetryStateTagProps) { return issue.processing_retry_state ? <span className="tag">{mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, issue.processing_retry_state)}</span> : null; }
