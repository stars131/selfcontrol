"use client";

import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { DeadLetterRecoveryItemCardRetryButtonProps } from "./dead-letter-recovery-item-card-retry-button.types";

export function DeadLetterRecoveryItemCardRetryButton({
  item,
  canWriteWorkspace,
  mediaIssueCopy,
  onRetryMediaProcessing,
  retryingMediaId,
}: DeadLetterRecoveryItemCardRetryButtonProps) {
  const retrying = retryingMediaId === item.media_id;

  return canWriteWorkspace && canRetryMediaIssue(item) ? (
    <button className="button secondary" disabled={retrying} type="button" onClick={() => void onRetryMediaProcessing(item.media_id)}>
      {retrying ? mediaIssueCopy.retrying : mediaIssueCopy.retryNow}
    </button>
  ) : null;
}
