"use client";

import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";
import type { BuildDeadLetterRecoveryItemCardPropsInput } from "./dead-letter-recovery-list-item-props.types";

export function buildDeadLetterRecoveryItemCardProps({
  item,
  props,
}: BuildDeadLetterRecoveryItemCardPropsInput): DeadLetterRecoveryItemCardProps {
  return {
    bulkRetryingDeadLetter: props.bulkRetryingDeadLetter,
    canWriteWorkspace: props.canWriteWorkspace,
    formatHistoryTimestampLabel: props.formatHistoryTimestampLabel,
    item,
    locale: props.locale,
    mediaIssueCopy: props.mediaIssueCopy,
    onRetryMediaProcessing: props.onRetryMediaProcessing,
    onToggleSelection: props.onToggleSelection,
    retryingMediaId: props.retryingMediaId,
    selectedDeadLetterIds: props.selectedDeadLetterIds,
    workspaceId: props.workspaceId,
  };
}
