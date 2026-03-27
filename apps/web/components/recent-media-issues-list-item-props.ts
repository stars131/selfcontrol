"use client";
import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";
import type { BuildRecentMediaIssueCardPropsInput } from "./recent-media-issues-list-item-props.types";
export function buildRecentMediaIssueCardProps({ issue, props }: BuildRecentMediaIssueCardPropsInput): RecentMediaIssueCardProps {
  return {
    canWriteWorkspace: props.canWriteWorkspace,
    formatHistoryTimestampLabel: props.formatHistoryTimestampLabel,
    issue,
    locale: props.locale,
    mediaIssueCopy: props.mediaIssueCopy,
    onRetryMediaProcessing: props.onRetryMediaProcessing,
    retryingMediaId: props.retryingMediaId,
    workspaceId: props.workspaceId,
  };
}
