"use client";

import Link from "next/link";

import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";

export function RecentMediaIssueCardActions({
  canWriteWorkspace,
  issue,
  mediaIssueCopy,
  onRetryMediaProcessing,
  retryingMediaId,
  settingsHref,
}: Pick<
  RecentMediaIssueCardProps,
  "canWriteWorkspace" | "issue" | "mediaIssueCopy" | "onRetryMediaProcessing" | "retryingMediaId"
> & {
  settingsHref: string | null;
}) {
  const retrying = retryingMediaId === issue.media_id;

  if (!canWriteWorkspace && !settingsHref) {
    return null;
  }

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
