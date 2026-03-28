"use client";

import { RecentMediaIssueCardExtractionModeTag } from "./recent-media-issue-card-extraction-mode-tag";
import { RecentMediaIssueCardIssueLabelTag } from "./recent-media-issue-card-issue-label-tag";
import { buildRecentMediaIssueCardProcessingStatusTagProps } from "./recent-media-issue-card-processing-status-tag-props";
import { RecentMediaIssueCardProcessingStatusTag } from "./recent-media-issue-card-processing-status-tag";
import { buildRecentMediaIssueCardProcessingSourceTagProps } from "./recent-media-issue-card-processing-source-tag-props";
import { RecentMediaIssueCardProcessingSourceTag } from "./recent-media-issue-card-processing-source-tag";
import { RecentMediaIssueCardRemoteFetchTag } from "./recent-media-issue-card-remote-fetch-tag";
import { RecentMediaIssueCardRetryCountTag } from "./recent-media-issue-card-retry-count-tag";
import { RecentMediaIssueCardRetryStateTag } from "./recent-media-issue-card-retry-state-tag";
import { buildRecentMediaIssueCardStorageProviderTagProps } from "./recent-media-issue-card-storage-provider-tag-props";
import { RecentMediaIssueCardStorageProviderTag } from "./recent-media-issue-card-storage-provider-tag";
import type { RecentMediaIssueCardTagsProps } from "./recent-media-issue-card-tags.types";

export function RecentMediaIssueCardTags({
  issue,
  locale,
  mediaIssueCopy,
}: RecentMediaIssueCardTagsProps) {
  return (
    <div className="tag-row">
      <RecentMediaIssueCardProcessingStatusTag {...buildRecentMediaIssueCardProcessingStatusTagProps({ issue, locale })} />
      <RecentMediaIssueCardStorageProviderTag {...buildRecentMediaIssueCardStorageProviderTagProps({ issue, locale })} />
      <RecentMediaIssueCardProcessingSourceTag {...buildRecentMediaIssueCardProcessingSourceTagProps({ issue })} />
      <RecentMediaIssueCardRemoteFetchTag issue={issue} locale={locale} mediaIssueCopy={mediaIssueCopy} />
      <RecentMediaIssueCardExtractionModeTag issue={issue} />
      <RecentMediaIssueCardRetryStateTag issue={issue} locale={locale} mediaIssueCopy={mediaIssueCopy} />
      <RecentMediaIssueCardIssueLabelTag issue={issue} locale={locale} />
      <RecentMediaIssueCardRetryCountTag issue={issue} mediaIssueCopy={mediaIssueCopy} />
    </div>
  );
}
