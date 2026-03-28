"use client";
import { RecentMediaIssueCardLastAttemptDetail } from "./recent-media-issue-card-last-attempt-detail";
import type { RecentMediaIssueCardMetadataDetailsProps } from "./recent-media-issue-card-metadata-details.types";
export function RecentMediaIssueCardMetadataDetails({ formatHistoryTimestampLabel, issue, mediaIssueCopy }: RecentMediaIssueCardMetadataDetailsProps) {
  return <><RecentMediaIssueCardLastAttemptDetail formatHistoryTimestampLabel={formatHistoryTimestampLabel} issue={issue} mediaIssueCopy={mediaIssueCopy} />{issue.processing_last_failure_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(issue.processing_last_failure_at)}</div> : null}{issue.processing_retry_next_attempt_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.nextRetry}: {formatHistoryTimestampLabel(issue.processing_retry_next_attempt_at)}</div> : null}</>;
}
