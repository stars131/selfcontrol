"use client";
import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";
import type { BuildRecentMediaIssueCardPropsInput } from "./recent-media-issues-list-item-props.types";
export function buildRecentMediaIssueCardProps({ canWriteWorkspace, formatHistoryTimestampLabel, issue, locale, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, workspaceId }: BuildRecentMediaIssueCardPropsInput): RecentMediaIssueCardProps {
  return {
    canWriteWorkspace,
    formatHistoryTimestampLabel,
    issue,
    locale,
    mediaIssueCopy,
    onRetryMediaProcessing,
    retryingMediaId,
    workspaceId,
  };
}
