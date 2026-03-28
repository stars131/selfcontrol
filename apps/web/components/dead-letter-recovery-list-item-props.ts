"use client";
import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";
import type { BuildDeadLetterRecoveryItemCardPropsInput } from "./dead-letter-recovery-list-item-props.types";
export function buildDeadLetterRecoveryItemCardProps({ bulkRetryingDeadLetter, canWriteWorkspace, formatHistoryTimestampLabel, item, locale, mediaIssueCopy, onRetryMediaProcessing, onToggleSelection, retryingMediaId, selectedDeadLetterIds, workspaceId }: BuildDeadLetterRecoveryItemCardPropsInput): DeadLetterRecoveryItemCardProps {
  return {
    bulkRetryingDeadLetter,
    canWriteWorkspace,
    formatHistoryTimestampLabel,
    item,
    locale,
    mediaIssueCopy,
    onRetryMediaProcessing,
    onToggleSelection,
    retryingMediaId,
    selectedDeadLetterIds,
    workspaceId,
  };
}
