"use client";

import { getMediaIssueLabel, getProcessingStatusLabel, getRemoteFetchStatusLabel, getRetryStateLabel } from "../lib/media-issue-display";
import type { RecentMediaIssueCardTagsProps } from "./recent-media-issue-card-tags.types";

export function RecentMediaIssueCardTags({
  issue,
  locale,
  mediaIssueCopy,
}: RecentMediaIssueCardTagsProps) {
  const issueLabel = getMediaIssueLabel(locale, issue);

  return (
    <div className="tag-row">
      <span className="tag">{getProcessingStatusLabel(locale, issue.processing_status)}</span>
      <span className="tag">{issue.storage_provider}</span>
      {issue.processing_source ? <span className="tag">{issue.processing_source}</span> : null}
      {issue.remote_fetch_status ? (
        <span className="tag">
          {mediaIssueCopy.fetchPrefix} {getRemoteFetchStatusLabel(locale, issue.remote_fetch_status)}
        </span>
      ) : null}
      {issue.extraction_mode ? <span className="tag">{issue.extraction_mode}</span> : null}
      {issue.processing_retry_state ? (
        <span className="tag">
          {mediaIssueCopy.retryStatePrefix} {getRetryStateLabel(locale, issue.processing_retry_state)}
        </span>
      ) : null}
      {issueLabel ? <span className="tag">{issueLabel}</span> : null}
      {typeof issue.processing_retry_count === "number" ? (
        <span className="tag">
          {mediaIssueCopy.retries} {issue.processing_retry_count}
          {typeof issue.processing_retry_max_attempts === "number" ? `/${issue.processing_retry_max_attempts}` : ""}
        </span>
      ) : null}
    </div>
  );
}
