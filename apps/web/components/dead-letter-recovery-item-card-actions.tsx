"use client";

import { DeadLetterRecoveryItemCardActionButtons } from "./dead-letter-recovery-item-card-action-buttons";
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

  return <DeadLetterRecoveryItemCardActionButtons item={item} canWriteWorkspace={canWriteWorkspace} mediaIssueCopy={mediaIssueCopy} onRetryMediaProcessing={onRetryMediaProcessing} retryingMediaId={retryingMediaId} settingsHref={settingsHref} />;
}
