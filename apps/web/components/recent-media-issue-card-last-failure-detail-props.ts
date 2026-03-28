"use client";
import type { RecentMediaIssueCardLastFailureDetailProps } from "./recent-media-issue-card-last-failure-detail.types";
import type { BuildRecentMediaIssueCardLastFailureDetailPropsInput } from "./recent-media-issue-card-last-failure-detail-props.types";
export function buildRecentMediaIssueCardLastFailureDetailProps({ formatHistoryTimestampLabel, issue, mediaIssueCopy }: BuildRecentMediaIssueCardLastFailureDetailPropsInput): RecentMediaIssueCardLastFailureDetailProps { return { formatHistoryTimestampLabel, issue, mediaIssueCopy }; }
