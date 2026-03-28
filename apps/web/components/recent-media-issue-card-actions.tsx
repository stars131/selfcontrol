"use client";

import { buildRecentMediaIssueCardActionButtonsProps } from "./recent-media-issue-card-action-buttons-props";
import { RecentMediaIssueCardActionButtons } from "./recent-media-issue-card-action-buttons";
import type { RecentMediaIssueCardActionsProps } from "./recent-media-issue-card-actions.types";

export function RecentMediaIssueCardActions({
  canWriteWorkspace,
  issue,
  mediaIssueCopy,
  onRetryMediaProcessing,
  retryingMediaId,
  settingsHref,
}: RecentMediaIssueCardActionsProps) {
  if (!canWriteWorkspace && !settingsHref) {
    return null;
  }

  return <RecentMediaIssueCardActionButtons {...buildRecentMediaIssueCardActionButtonsProps({ canWriteWorkspace, issue, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId, settingsHref })} />;
}
