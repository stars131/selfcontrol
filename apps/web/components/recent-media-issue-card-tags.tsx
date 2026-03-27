"use client";

import { getProcessingStatusLabel } from "../lib/media-issue-display";
import { getStorageProviderLabel } from "../lib/storage-provider-display";
import { RecentMediaIssueCardIssueLabelTag } from "./recent-media-issue-card-issue-label-tag";
import { RecentMediaIssueCardProcessingSourceTag } from "./recent-media-issue-card-processing-source-tag";
import { RecentMediaIssueCardRemoteFetchTag } from "./recent-media-issue-card-remote-fetch-tag";
import { RecentMediaIssueCardRetryCountTag } from "./recent-media-issue-card-retry-count-tag";
import { RecentMediaIssueCardRetryStateTag } from "./recent-media-issue-card-retry-state-tag";
import type { RecentMediaIssueCardTagsProps } from "./recent-media-issue-card-tags.types";

export function RecentMediaIssueCardTags({
  issue,
  locale,
  mediaIssueCopy,
}: RecentMediaIssueCardTagsProps) {
  return (
    <div className="tag-row">
      <span className="tag">{getProcessingStatusLabel(locale, issue.processing_status)}</span>
      <span className="tag">{getStorageProviderLabel(locale, issue.storage_provider)}</span>
      <RecentMediaIssueCardProcessingSourceTag issue={issue} />
      <RecentMediaIssueCardRemoteFetchTag issue={issue} locale={locale} mediaIssueCopy={mediaIssueCopy} />
      {issue.extraction_mode ? <span className="tag">{issue.extraction_mode}</span> : null}
      <RecentMediaIssueCardRetryStateTag issue={issue} locale={locale} mediaIssueCopy={mediaIssueCopy} />
      <RecentMediaIssueCardIssueLabelTag issue={issue} locale={locale} />
      <RecentMediaIssueCardRetryCountTag issue={issue} mediaIssueCopy={mediaIssueCopy} />
    </div>
  );
}
