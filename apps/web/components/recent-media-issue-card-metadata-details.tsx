"use client";
import type { RecentMediaIssueCardMetadataDetailsProps } from "./recent-media-issue-card-metadata-details.types";
export function RecentMediaIssueCardMetadataDetails({ formatHistoryTimestampLabel, issue, mediaIssueCopy }: RecentMediaIssueCardMetadataDetailsProps) {
  return <><div className="muted" style={{ marginTop: 8 }}>{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(issue.processing_last_attempt_at)}</div>{issue.processing_last_failure_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(issue.processing_last_failure_at)}</div> : null}{issue.processing_retry_next_attempt_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.nextRetry}: {formatHistoryTimestampLabel(issue.processing_retry_next_attempt_at)}</div> : null}</>;
}
