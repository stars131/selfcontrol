"use client";

import Link from "next/link";

import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { RecentMediaIssueCardActionButtonsProps } from "./recent-media-issue-card-action-buttons.types";

export function RecentMediaIssueCardActionButtons({
  canWriteWorkspace,
  issue,
  mediaIssueCopy,
  onRetryMediaProcessing,
  retryingMediaId,
  settingsHref,
}: RecentMediaIssueCardActionButtonsProps) {
  const retrying = retryingMediaId === issue.media_id;

  return (
    <div className="action-row" style={{ marginTop: 10 }}>
      {canWriteWorkspace && canRetryMediaIssue(issue) ? (
        <button
          className="button secondary"
          disabled={retrying}
          type="button"
          onClick={() => void onRetryMediaProcessing(issue.media_id)}
        >
          {retrying ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
        </button>
      ) : null}
      {settingsHref ? (
        <Link className="button secondary" href={settingsHref}>
          {mediaIssueCopy.openSettings}
        </Link>
      ) : null}
    </div>
  );
}
