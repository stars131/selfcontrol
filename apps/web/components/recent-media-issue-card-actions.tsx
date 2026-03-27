"use client";

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

  return <RecentMediaIssueCardActionButtons canWriteWorkspace={canWriteWorkspace} issue={issue} mediaIssueCopy={mediaIssueCopy} onRetryMediaProcessing={onRetryMediaProcessing} retryingMediaId={retryingMediaId} settingsHref={settingsHref} />;
}
