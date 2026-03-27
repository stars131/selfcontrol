"use client";

import Link from "next/link";

import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { DeadLetterRecoveryItemCardActionButtonsProps } from "./dead-letter-recovery-item-card-action-buttons.types";

export function DeadLetterRecoveryItemCardActionButtons({
  item,
  canWriteWorkspace,
  mediaIssueCopy,
  onRetryMediaProcessing,
  retryingMediaId,
  settingsHref,
}: DeadLetterRecoveryItemCardActionButtonsProps) {
  const retrying = retryingMediaId === item.media_id;

  return (
    <div className="action-row" style={{ marginTop: 10 }}>
      {canWriteWorkspace && canRetryMediaIssue(item) ? (
        <button
          className="button secondary"
          disabled={retrying}
          type="button"
          onClick={() => void onRetryMediaProcessing(item.media_id)}
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
