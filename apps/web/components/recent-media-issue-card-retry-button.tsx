"use client";

import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { RecentMediaIssueCardRetryButtonProps } from "./recent-media-issue-card-retry-button.types";

export function RecentMediaIssueCardRetryButton({
  canWriteWorkspace,
  issue,
  mediaIssueCopy,
  onRetryMediaProcessing,
  retryingMediaId,
}: RecentMediaIssueCardRetryButtonProps) {
  const retrying = retryingMediaId === issue.media_id;

  return canWriteWorkspace && canRetryMediaIssue(issue) ? (
    <button className="button secondary" disabled={retrying} type="button" onClick={() => void onRetryMediaProcessing(issue.media_id)}>
      {retrying ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
    </button>
  ) : null;
}
