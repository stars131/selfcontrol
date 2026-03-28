"use client";
import type { RecentMediaIssueCardNextRetryDetailProps } from "./recent-media-issue-card-next-retry-detail.types";
export function RecentMediaIssueCardNextRetryDetail({ formatHistoryTimestampLabel, issue, mediaIssueCopy }: RecentMediaIssueCardNextRetryDetailProps) { return issue.processing_retry_next_attempt_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.nextRetry}: {formatHistoryTimestampLabel(issue.processing_retry_next_attempt_at)}</div> : null; }
