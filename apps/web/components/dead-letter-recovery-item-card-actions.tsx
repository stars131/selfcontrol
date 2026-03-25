"use client";

import Link from "next/link";

import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { DeadLetterRecoveryItemCardActionsProps } from "./dead-letter-recovery-item-card-actions.types";

export function DeadLetterRecoveryItemCardActions({
  item,
  canWriteWorkspace,
  mediaIssueCopy,
  onRetryMediaProcessing,
  retryingMediaId,
  settingsHref,
}: DeadLetterRecoveryItemCardActionsProps) {
  if (!canWriteWorkspace && !settingsHref) {
    return null;
  }

  return (
    <div className="action-row" style={{ marginTop: 10 }}>
      {canWriteWorkspace && canRetryMediaIssue(item) ? (
        <button
          className="button secondary"
          disabled={retryingMediaId === item.media_id}
          type="button"
          onClick={() => void onRetryMediaProcessing(item.media_id)}
        >
          {retryingMediaId === item.media_id ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
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
