"use client";

import { buildRecentMediaIssueCardExtractionModeTagProps } from "./recent-media-issue-card-extraction-mode-tag-props";
import { RecentMediaIssueCardExtractionModeTag } from "./recent-media-issue-card-extraction-mode-tag";
import { RecentMediaIssueCardIssueLabelTag } from "./recent-media-issue-card-issue-label-tag";
import { buildRecentMediaIssueCardProcessingStatusTagProps } from "./recent-media-issue-card-processing-status-tag-props";
import { RecentMediaIssueCardProcessingStatusTag } from "./recent-media-issue-card-processing-status-tag";
import { buildRecentMediaIssueCardProcessingSourceTagProps } from "./recent-media-issue-card-processing-source-tag-props";
import { RecentMediaIssueCardProcessingSourceTag } from "./recent-media-issue-card-processing-source-tag";
import { buildRecentMediaIssueCardRemoteFetchTagProps } from "./recent-media-issue-card-remote-fetch-tag-props";
import { RecentMediaIssueCardRemoteFetchTag } from "./recent-media-issue-card-remote-fetch-tag";
import { RecentMediaIssueCardRetryCountTag } from "./recent-media-issue-card-retry-count-tag";
import { buildRecentMediaIssueCardRetryStateTagProps } from "./recent-media-issue-card-retry-state-tag-props";
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
      <RecentMediaIssueCardRemoteFetchTag {...buildRecentMediaIssueCardRemoteFetchTagProps({ issue, locale, mediaIssueCopy })} />
      <RecentMediaIssueCardExtractionModeTag {...buildRecentMediaIssueCardExtractionModeTagProps({ issue })} />
      <RecentMediaIssueCardRetryStateTag {...buildRecentMediaIssueCardRetryStateTagProps({ issue, locale, mediaIssueCopy })} />
      <RecentMediaIssueCardIssueLabelTag issue={issue} locale={locale} />
      <RecentMediaIssueCardRetryCountTag issue={issue} mediaIssueCopy={mediaIssueCopy} />
    </div>
  );
}
