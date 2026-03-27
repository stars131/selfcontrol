"use client";

import { getMediaIssueLabel, getProcessingStatusLabel, getRemoteFetchStatusLabel, getRetryStateLabel } from "../lib/media-issue-display";
import { getStorageProviderLabel } from "../lib/storage-provider-display";
import { RecentMediaIssueCardRetryCountTag } from "./recent-media-issue-card-retry-count-tag";
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
      <span className="tag">{getStorageProviderLabel(locale, issue.storage_provider)}</span>
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
      <RecentMediaIssueCardRetryCountTag issue={issue} mediaIssueCopy={mediaIssueCopy} />
    </div>
  );
}
