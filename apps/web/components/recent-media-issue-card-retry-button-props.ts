"use client";
import type { RecentMediaIssueCardRetryButtonProps } from "./recent-media-issue-card-retry-button.types";
import type { BuildRecentMediaIssueCardRetryButtonPropsInput } from "./recent-media-issue-card-retry-button-props.types";
export function buildRecentMediaIssueCardRetryButtonProps({ canWriteWorkspace, issue, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId }: BuildRecentMediaIssueCardRetryButtonPropsInput): RecentMediaIssueCardRetryButtonProps { return { canWriteWorkspace, issue, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId }; }
