"use client";

import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";
import type { RecentMediaIssueCardActionsProps } from "./recent-media-issue-card-actions.types";
import type { BuildRecentMediaIssueCardChildPropsInput } from "./recent-media-issue-card-child-props.types";

export function buildRecentMediaIssueCardActionsProps({ canWriteWorkspace, issue, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, workspaceId }: BuildRecentMediaIssueCardChildPropsInput): RecentMediaIssueCardActionsProps {
  return {
    canWriteWorkspace,
    issue,
    mediaIssueCopy,
    onRetryMediaProcessing,
    retryingMediaId,
    settingsHref: buildMediaIssueSettingsHref(workspaceId, issue),
  };
}
