"use client";
import type { RecentMediaIssueCardLastAttemptDetailProps } from "./recent-media-issue-card-last-attempt-detail.types";
export function RecentMediaIssueCardLastAttemptDetail({ formatHistoryTimestampLabel, issue, mediaIssueCopy }: RecentMediaIssueCardLastAttemptDetailProps) { return <div className="muted" style={{ marginTop: 8 }}>{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(issue.processing_last_attempt_at)}</div>; }
