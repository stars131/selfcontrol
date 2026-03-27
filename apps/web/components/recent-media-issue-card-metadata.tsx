"use client";

import { RecentMediaIssueCardActionNotice } from "./recent-media-issue-card-action-notice";
import type { RecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-metadata.types";

export function RecentMediaIssueCardMetadata({ action, formatHistoryTimestampLabel, issue, mediaIssueCopy }: RecentMediaIssueCardMetadataProps) {
  return <><div className="muted" style={{ marginTop: 8 }}>{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(issue.processing_last_attempt_at)}</div>{issue.processing_last_failure_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(issue.processing_last_failure_at)}</div> : null}{issue.processing_retry_next_attempt_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.nextRetry}: {formatHistoryTimestampLabel(issue.processing_retry_next_attempt_at)}</div> : null}<RecentMediaIssueCardActionNotice action={action} /></>;
}
