"use client";
import { buildRecentMediaIssueCardLastAttemptDetailProps } from "./recent-media-issue-card-last-attempt-detail-props";
import { RecentMediaIssueCardLastAttemptDetail } from "./recent-media-issue-card-last-attempt-detail";
import { RecentMediaIssueCardLastFailureDetail } from "./recent-media-issue-card-last-failure-detail";
import { RecentMediaIssueCardNextRetryDetail } from "./recent-media-issue-card-next-retry-detail";
import type { RecentMediaIssueCardMetadataDetailsProps } from "./recent-media-issue-card-metadata-details.types";
export function RecentMediaIssueCardMetadataDetails({ formatHistoryTimestampLabel, issue, mediaIssueCopy }: RecentMediaIssueCardMetadataDetailsProps) {
  return <><RecentMediaIssueCardLastAttemptDetail {...buildRecentMediaIssueCardLastAttemptDetailProps({ formatHistoryTimestampLabel, issue, mediaIssueCopy })} /><RecentMediaIssueCardLastFailureDetail formatHistoryTimestampLabel={formatHistoryTimestampLabel} issue={issue} mediaIssueCopy={mediaIssueCopy} /><RecentMediaIssueCardNextRetryDetail formatHistoryTimestampLabel={formatHistoryTimestampLabel} issue={issue} mediaIssueCopy={mediaIssueCopy} /></>;
}
