"use client";
import type { RecentMediaIssueCardRetryCountTagProps } from "./recent-media-issue-card-retry-count-tag.types";
export function RecentMediaIssueCardRetryCountTag({ issue, mediaIssueCopy }: RecentMediaIssueCardRetryCountTagProps) {
  return typeof issue.processing_retry_count === "number" ? <span className="tag">{mediaIssueCopy.retries} {issue.processing_retry_count}{typeof issue.processing_retry_max_attempts === "number" ? `/${issue.processing_retry_max_attempts}` : ""}</span> : null;
}
