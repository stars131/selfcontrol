"use client";
import type { RecentMediaIssueCardLastFailureDetailProps } from "./recent-media-issue-card-last-failure-detail.types";
export function RecentMediaIssueCardLastFailureDetail({ formatHistoryTimestampLabel, issue, mediaIssueCopy }: RecentMediaIssueCardLastFailureDetailProps) { return issue.processing_last_failure_at ? <div className="muted" style={{ marginTop: 6 }}>{mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(issue.processing_last_failure_at)}</div> : null; }
